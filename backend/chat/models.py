from django.db import models
import uuid

from user.models import CustomUser
from conversation.models import Conversation

class Chat(models.Model):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)
  message = models.TextField(max_length=200)
  conversation = models.ForeignKey(Conversation,on_delete=models.CASCADE,related_name='messages',null=True)
  sender = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
  is_read = models.BooleanField(default=False)
  date_sent = models.DateTimeField(null=True,auto_now_add=True)

  def __str__(self):
    return f'{self.sender.username}: {self.message}'