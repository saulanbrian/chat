from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from user.models import CustomUser

from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = CustomUser
    fields = ('username','profile','password')
    extra_kwargs = {
      'password':{'write_only':True},
      'profile':{'required':True,'read_only':True}
    }

  def validate_password(self,value):
    validate_password(value)
    return value


    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  
  @classmethod
  def get_token(cls,user):
    token = super().get_token(user)
    
    if user.profile:
      token['profile'] = user.profile.url
    token['username'] = user.username
    
    return token