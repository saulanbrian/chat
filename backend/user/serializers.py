from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from user.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = CustomUser
    fields = ('username','profile')
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  
  @classmethod
  def get_token(cls,user):
    token = super().get_token(user)
    
    token['profile'] = user.profile.url
    token['username'] = user.username
    
    return token