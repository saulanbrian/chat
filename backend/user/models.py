from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid 

def get_user_path(instance,filename):
  return 'user_{0}/profile/{1}'.format(instance.username,filename)

class CustomUser(AbstractUser):
  profile = models.ImageField(upload_to=get_user_path,null=True)