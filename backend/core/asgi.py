import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

from django.conf import settings
from django.core.asgi import get_asgi_application
from django.contrib.staticfiles.handlers import ASGIStaticFilesHandler

django_asgi_application = get_asgi_application()

if settings.DEBUG:
	django_asgi_application = ASGIStaticFilesHandler(django_asgi_application)

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

from api.routing import websocket_urlpatterns

application = ProtocolTypeRouter(
	{
		'http': django_asgi_application,
		'websocket': AllowedHostsOriginValidator(
			AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
		),
	}
)
