from django.db import models
from user.models import CustomUser

import uuid

class Conversation(models.Model):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)
  users = models.ManyToManyField(CustomUser)
  