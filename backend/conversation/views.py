from django.shortcuts import render

from rest_framework.generics import ListAPIView

from rest_framework.permissions import IsAuthenticated

from .serializers import ConversationSerializer

from .models import Conversation

class ConversationListView(ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = ConversationSerializer
  
  def get_queryset(self):
    user_id = self.request.user.id
    return Conversation.objects.filter(users__id=user_id)
