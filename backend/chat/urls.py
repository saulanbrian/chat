from django.urls import path, re_path

from . import views
from . import consumers

urlpatterns = [
  path('', views.ChatListCreateView.as_view()),
  ]
  
websocket_urlpatterns = [
  re_path(r'ws/chat',consumers.ChatConsumer.as_asgi()),
  ]