from channels.middleware import BaseMiddleware
from urllib.parse import parse_qs

from channels.db import database_sync_to_async

from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from user.models import CustomUser

class JwtAuthMiddleware(BaseMiddleware):
  async def __call__(self,scope,receive,send):
    print('jwt middleware runnng')
    query_string = scope['query_string'].decode()
    query_params = parse_qs(query_string)
    token = query_params.get('token',None)
    
    if token:
      try:
        UntypedToken(token[0])
        #we're using this to validate token
        decoded_token = UntypedToken(token[0]).payload
        user_id = decoded_token['user_id']
        user = await database_sync_to_async(CustomUser.objects.get)(id=user_id)
        
        scope['user'] = user
        
      except(TokenError,InvalidToken,CustomUser.DoesNotExist) as e:
        print(e)
        scope['user'] = None
    else:
      scope['user'] = None
    
    return await super().__call__(scope,receive,send)

def JwtAuthMiddlewareStack(inner):
  return JwtAuthMiddleware(inner)