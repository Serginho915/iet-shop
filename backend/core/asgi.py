import os

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.sessions import SessionMiddlewareStack
from django.core.asgi import get_asgi_application

from api.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django_asgi_application = get_asgi_application()

application = ProtocolTypeRouter(
	{
		'http': django_asgi_application,
		'websocket': AllowedHostsOriginValidator(
			SessionMiddlewareStack(URLRouter(websocket_urlpatterns))
		),
	}
)
