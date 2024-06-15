from django.shortcuts import render

from rest_framework.generics import ListCreateAPIView

from .models import Chat

from .serializers import ChatSerializer

class ChatListCreateView(ListCreateAPIView):
  queryset = Chat.objects.all()
  serializer_class = ChatSerializer
  

def room(request):
  return render(request,'chat/index.html')