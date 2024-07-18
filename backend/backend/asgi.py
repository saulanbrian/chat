import os
import django

from django.core.asgi import get_asgi_application
from channels.security.websocket import AllowedHostsOriginValidator
from channels.routing import URLRouter, ProtocolTypeRouter

from chat.urls import websocket_urlpatterns as chat_websocket_urls
from conversation.urls import websocket_urlpatterns as conversation_websocket_urls

from .middleware import JwtAuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

websocket_urlpatterns = conversation_websocket_urls + chat_websocket_urls

print(websocket_urlpatterns)

application = ProtocolTypeRouter({
  "http":get_asgi_application(),
  "websocket":JwtAuthMiddlewareStack(
      URLRouter(websocket_urlpatterns)
    )
})
