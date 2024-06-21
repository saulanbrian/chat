from django.urls import path, re_path
from . import views
from . import consumers

urlpatterns = [
  path('',views.ConversationListView.as_view()),
  path('<pk>/',views.ConversationDataView.as_view())
  ]
  
  
websocket_urlpatterns = [
  re_path(r'ws/conversation/(?P<conversation_id>[0-9a-fA-F-]+)/$',consumers.ConversationConsumer.as_asgi())
  ]