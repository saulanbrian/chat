from django.shortcuts import render

from rest_framework.generics import ListAPIView,RetrieveAPIView,CreateAPIView,RetrieveUpdateDestroyAPIView

from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.request import Request

from .serializers import ConversationSerializer,ConversationDataSerializer,ConversationCreateSerializer
from chat.serializers import ChatSerializer

from .models import Conversation
from chat.models import Chat
from user.models import CustomUser

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
  

@api_view(['GET'])
def get_conversation_id(request:Request): 
  user_id = request.user.id
  other_party = int(request.query_params.get('user',None))
  if other_party:
    try:
      conversation = Conversation.objects.filter(users__id=user_id).get(users__id=other_party)
    except Conversation.DoesNotExist:
      user1 = CustomUser.objects.get(pk=user_id)
      user2 = CustomUser.objects.get(pk=other_party)
      conversation = Conversation.objects.create()
      conversation.users.add(user1,user2)

    return Response({'id':conversation.id})
    