from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from .chat_services import get_admin_chat_group_name, get_chat_group_name
from .models import ChatSession, Message
from .serializers import ChatMessageSerializer


@receiver(post_save, sender=Message)
def broadcast_message_to_chat_group(sender, instance, created, **kwargs):
    if not created:
        return

    ChatSession.objects.filter(pk=instance.chat_session_id).update(
        updated_at=timezone.now(),
        is_active=True,
    )

    channel_layer = get_channel_layer()
    if channel_layer is None:
        return

    payload = ChatMessageSerializer(instance).data
    group_name = get_chat_group_name(instance.chat_session.session_key)
    admin_group_name = get_admin_chat_group_name()

    # Deliver only after commit so clients never receive rolled-back messages.
    transaction.on_commit(
        lambda: (
            async_to_sync(channel_layer.group_send)(
                group_name,
                {
                    'type': 'chat.message',
                    'message': payload,
                },
            ),
            async_to_sync(channel_layer.group_send)(
                admin_group_name,
                {
                    'type': 'admin_chat_message',
                    'chat_session_id': str(instance.chat_session_id),
                    'message': payload,
                },
            ),
        )
    )
