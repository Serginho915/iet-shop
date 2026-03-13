import json

from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from django.test import Client, TestCase, TransactionTestCase, override_settings
from django.urls import reverse

from .models import ChatSession, Message


IN_MEMORY_CHANNEL_LAYERS = {
	'default': {
		'BACKEND': 'channels.layers.InMemoryChannelLayer',
	}
}


@override_settings(CHANNEL_LAYERS=IN_MEMORY_CHANNEL_LAYERS)
class ChatApiTests(TestCase):
	def setUp(self):
		self.client = Client(enforce_csrf_checks=True)

	def init_chat(self):
		response = self.client.post(reverse('chat-init'))
		self.assertEqual(response.status_code, 200)
		self.assertIn('sessionid', self.client.cookies)
		self.assertIn('csrftoken', response.cookies)
		return response

	def auth_headers(self):
		return {'HTTP_X_CSRFTOKEN': self.client.cookies['csrftoken'].value}

	def test_get_messages_bootstraps_anonymous_chat_session(self):
		response = self.client.get(reverse('chat-messages'))

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json(), [])
		self.assertEqual(ChatSession.objects.count(), 1)
		self.assertIn('sessionid', self.client.cookies)
		self.assertIn('csrftoken', response.cookies)

	def test_init_returns_existing_history_for_current_session(self):
		self.init_chat()
		create_response = self.client.post(
			reverse('chat-messages'),
			data=json.dumps({'text': 'Hello from REST'}),
			content_type='application/json',
			**self.auth_headers(),
		)
		self.assertEqual(create_response.status_code, 201)

		init_response = self.client.post(reverse('chat-init'))
		payload = init_response.json()

		self.assertEqual(init_response.status_code, 200)
		self.assertEqual(len(payload['messages']), 1)
		self.assertEqual(payload['messages'][0]['text'], 'Hello from REST')

	def test_post_message_requires_csrf_header(self):
		self.init_chat()

		response = self.client.post(
			reverse('chat-messages'),
			data=json.dumps({'text': 'Blocked'}),
			content_type='application/json',
		)

		self.assertEqual(response.status_code, 403)

	def test_post_message_persists_history_for_same_browser_session(self):
		self.init_chat()

		create_response = self.client.post(
			reverse('chat-messages'),
			data=json.dumps({'text': '  Persistent hello  '}),
			content_type='application/json',
			**self.auth_headers(),
		)
		self.assertEqual(create_response.status_code, 201)
		created_message = create_response.json()

		reload_client = Client(enforce_csrf_checks=True)
		reload_client.cookies = self.client.cookies
		history_response = reload_client.get(reverse('chat-messages'))
		history = history_response.json()

		self.assertEqual(history_response.status_code, 200)
		self.assertEqual(len(history), 1)
		self.assertEqual(history[0]['id'], created_message['id'])
		self.assertEqual(history[0]['text'], 'Persistent hello')

	@override_settings(CHAT_RATE_LIMIT_COUNT=2, CHAT_RATE_LIMIT_WINDOW_SECONDS=60)
	def test_post_message_is_rate_limited(self):
		self.init_chat()

		for text in ('First', 'Second'):
			response = self.client.post(
				reverse('chat-messages'),
				data=json.dumps({'text': text}),
				content_type='application/json',
				**self.auth_headers(),
			)
			self.assertEqual(response.status_code, 201)

		limited_response = self.client.post(
			reverse('chat-messages'),
			data=json.dumps({'text': 'Third'}),
			content_type='application/json',
			**self.auth_headers(),
		)

		self.assertEqual(limited_response.status_code, 429)


@override_settings(CHANNEL_LAYERS=IN_MEMORY_CHANNEL_LAYERS)
class ChatWebSocketTests(TransactionTestCase):
	def setUp(self):
		self.client = Client(enforce_csrf_checks=True)

	def init_chat(self):
		response = self.client.post(reverse('chat-init'))
		self.assertEqual(response.status_code, 200)
		return self.client.cookies['sessionid'].value

	def socket_headers(self):
		session_id = self.client.cookies['sessionid'].value
		csrf_token = self.client.cookies['csrftoken'].value
		return [
			(b'host', b'testserver'),
			(b'cookie', f'sessionid={session_id}; csrftoken={csrf_token}'.encode()),
		]

	def create_operator_message(self, session_key, text):
		chat_session = ChatSession.objects.get(session_key=session_key)
		Message.objects.create(
			chat_session=chat_session,
			text=text,
			sender_type=Message.SenderType.OPERATOR,
		)

	def test_websocket_reports_missing_session(self):
		async_to_sync(self._test_websocket_reports_missing_session)()

	async def _test_websocket_reports_missing_session(self):
		from channels.testing import WebsocketCommunicator
		from core.asgi import application

		communicator = WebsocketCommunicator(
			application,
			'/ws/chat/',
			headers=[(b'host', b'testserver')],
		)
		connected, _ = await communicator.connect()

		self.assertTrue(connected)
		payload = await communicator.receive_json_from()
		self.assertEqual(payload['type'], 'chat.error')
		self.assertEqual(payload['code'], 'session_missing')

	def test_websocket_delivers_user_and_operator_messages(self):
		session_key = self.init_chat()
		async_to_sync(self._test_websocket_delivers_user_and_operator_messages)(session_key)

	async def _test_websocket_delivers_user_and_operator_messages(self, session_key):
		from channels.testing import WebsocketCommunicator
		from core.asgi import application

		communicator = WebsocketCommunicator(
			application,
			'/ws/chat/',
			headers=self.socket_headers(),
		)
		connected, _ = await communicator.connect()

		self.assertTrue(connected)
		ready_payload = await communicator.receive_json_from()
		self.assertEqual(ready_payload['type'], 'chat.ready')

		await communicator.send_json_to({'type': 'message', 'text': 'Hello from websocket'})
		first_message = await communicator.receive_json_from()

		self.assertEqual(first_message['type'], 'chat.message')
		self.assertEqual(first_message['message']['sender_type'], 'user')
		self.assertEqual(first_message['message']['text'], 'Hello from websocket')

		await database_sync_to_async(self.create_operator_message)(session_key, 'Operator reply')
		second_message = await communicator.receive_json_from()

		self.assertEqual(second_message['type'], 'chat.message')
		self.assertEqual(second_message['message']['sender_type'], 'operator')
		self.assertEqual(second_message['message']['text'], 'Operator reply')

		await communicator.disconnect()
