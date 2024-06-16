from django.db import models
import uuid

from django.contrib.auth.models import User


class Conversation(models.Model):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)
  users = models.ManyToManyField(User)
  
  def __str__(self):
    return f'{self.users.first().username} - {self.users.last().username}'

class Chat(models.Model):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)
  message = models.TextField(max_length=200)
  conversation = models.ForeignKey(Conversation,on_delete=models.CASCADE,related_name='messages',null=False)
  sender = models.ForeignKey(User,on_delete=models.CASCADE)
  is_read = models.BooleanField(default=False)
  
  def __str__(self):
    return f'{self.sender.username}: {self.message}'