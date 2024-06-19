from rest_framework import serializers

from .models import Chat

from user.serializers import UserSerializer

class ChatSerializer(serializers.ModelSerializer):
  
  sender = UserSerializer()
  
  class Meta:
    model = Chat
    fields = ('id','message','is_read','sender')
  
  def to_representation(self,obj):
    representation = super().to_representation(obj)
    request = self.context.get('request',{})
    
    if request:
      exclude_user = request.query_params.get('exclude_user',None)
      if exclude_user and exclude_user == 'true':
        representation.pop('sender')
      representation['sent_by_user'] = obj.sender.id == request.user.id
      
    
    return representation