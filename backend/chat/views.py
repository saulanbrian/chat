from django.shortcuts import render

from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from .models import Chat

from .serializers import ChatSerializer

from rest_framework.permissions import IsAuthenticated

class ChatListCreateView(ListCreateAPIView):
  serializer_class = ChatSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user_id = self.request.user.id
    return Chat.objects.select_related('sender').filter(sender__id=user_id)
  

  def get_serializer_context(self):
    context = super().get_serializer_context()
    context.update({'request':self.request})
    return context
  

def room(request):
  return render(request,'chat/index.html')