import os

from django.core.asgi import get_asgi_application
from channels.security.websocket import AllowedHostsOriginValidator
from channels.routing import URLRouter, ProtocolTypeRouter

from chat.urls import websocket_urlpatterns

from .middleware import JwtAuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = ProtocolTypeRouter({
  "http":get_asgi_application(),
  "websocket":JwtAuthMiddlewareStack(
      URLRouter(websocket_urlpatterns)
    )
})
