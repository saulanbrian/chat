from django.db import models

from django.contrib.auth.models import User

class Chat(models.Model):
  message = models.TextField(max_length=200)
  sender = models.ForeignKey(User,on_delete=models.CASCADE)
  is_read = models.BooleanField(default=False)
