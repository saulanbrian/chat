from django.shortcuts import render

from rest_framework.generics import ListAPIView,RetrieveAPIView

from rest_framework.permissions import IsAuthenticated,AllowAny

from .serializers import ConversationSerializer,ConversationDataSerializer
from chat.serializers import ChatSerializer

from .models import Conversation
from chat.models import Chat

class ConversationListView(ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = ConversationSerializer
  
  def get_queryset(self):
    user_id = self.request.user.id
    return Conversation.objects.prefetch_related('users').filter(users__id=user_id)

class ConversationDataView(RetrieveAPIView):
  serializer_class = ConversationDataSerializer
  permission_classes = [IsAuthenticated]
  
  def get_serializer_context(self):
    context = super().get_serializer_context()
    context.update({'request':self.request})
    return context
    
  def get_queryset(self):
    user_id = self.request.user.id
    return Conversation.objects.prefetch_related('users').filter(users__id=user_id)