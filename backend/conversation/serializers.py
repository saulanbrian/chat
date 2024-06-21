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
    

class ConversationDataSerializer(serializers.ModelSerializer):
  
  conversation_with = serializers.SerializerMethodField()
  messages = serializers.SerializerMethodField()
  
  class Meta:
    model = Conversation
    fields = ('id','conversation_with','messages')
      
  def get_conversation_with(self,obj):
    request = self.context.get('request',None)
    if request:
      user_id = request.user.id
      other_party = obj.users.exclude(id=user_id).first()
      return UserSerializer(other_party).data
      
  def get_messages(self,obj):
    request = self.context.get('request')
    print(request.query_params)
    if request:
      user_id = request.user.id
      messages = obj.messages.all()
      return ChatSerializer(messages,many=True,context={
        'request':request
      }).data