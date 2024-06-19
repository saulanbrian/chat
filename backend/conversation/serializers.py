from rest_framework import serializers 

from .models import Conversation

from chat.serializers import ChatSerializer
from user.serializers import UserSerializer

class ConversationSerializer(serializers.ModelSerializer):
  
  conversation_with = serializers.SerializerMethodField()
  latest_message = serializers.SerializerMethodField()
  
  class Meta:
    model = Conversation
    fields = ('id','latest_message','conversation_with')
    
  def get_conversation_with(self,obj):
    request = self.context.get('request',None)
    if request:
      other_party = obj.users.exclude(pk=request.user.id).first()
      return UserSerializer(other_party).data

  def get_latest_message(self,obj):
    message = obj.messages.last()
    return ChatSerializer(message).data