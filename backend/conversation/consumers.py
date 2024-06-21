from channels.generic.websocket import AsyncWebsocketConsumer

import json

from channels.db import database_sync_to_async
from chat.models import Chat
from .models import Conversation
from user.models import CustomUser


@database_sync_to_async
def add_message(conversation,message,user):
  new_message = Chat.objects.create(message=message,sender=user)
  conversation.messages.add(new_message)
  return new_message
  
@database_sync_to_async
def get_conversation(conversation_id):
  return Conversation.objects.prefetch_related('messages').get(pk=conversation_id)

class ConversationConsumer(AsyncWebsocketConsumer):
  
  async def connect(self):
    user = self.scope['user']
    self.user = user
    
    if not user:
      await self.close(code=40001)
    else:
      conversation_id = self.scope['url_route']['kwargs']['conversation_id']
      self.conversation = await get_conversation(conversation_id)
      self.group_name = f'conversation_{conversation_id}'
      
      await self.channel_layer.group_add(
          self.group_name,
          self.channel_name
        )
        
      await self.accept()
    
  async def receive(self,text_data):
    data = json.loads(text_data)
    message = data['message']
    
    created = await add_message(
      conversation=self.conversation,
      message=message,
      user=self.user)
    
    await self.channel_layer.group_send(
      self.group_name,
      {
        'type':'send.message',
        'message':created.message,
        'id':str(created.id),
        'sender_id':self.user.id
      }
    )
    
  async def send_message(self,event):
    message = event['message']
    id_ = event['id']
    sender_id = event['sender_id']
    await self.send(json.dumps({
      'id':id_,
      'message':message,
      'sent_by_user':self.user.id == sender_id
    }))