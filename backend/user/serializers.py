from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = User
    fields = ('username',)
    extra_kwargs = {
      'username':{
        'read_only':True
      }
    }
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  
  @classmethod
  def get_token(cls,user):
    token = super().get_token(user)
    
    token['username'] = user.username
    
    return token