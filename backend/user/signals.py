from django.db.models.signals import pre_save
from django.dispatch import receiver

from django.contrib.auth.hashers import make_password

from .models import CustomUser

@receiver(pre_save,sender=CustomUser)
def hash_password(sender,instance,**kwargs):
  instance.password = make_password(instance.password)
  