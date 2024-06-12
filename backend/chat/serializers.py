from rest_framework import serializers

from .models import Chat

from user.serializers import UserSerializer

class ChatSerializer(serializers.ModelSerializer):
  
  sender = UserSerializer()
  
  class Meta:
    model = Chat
    fields = ('message','sender','is_read')
    extra_kwrags = {
      'sender':{'read_only':True}
    }