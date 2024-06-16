import json
from channels.generic.websocket import WebsocketConsumer

class ChatConsumer(WebsocketConsumer):
  
  def connect(self):
    user = self.scope.get('user',None)
    if not user:
      self.close(code=4000)
    self.accept()
    self.send(json.dumps({'message':'connected'}))
    
  def disconnect(self,close_code):
    pass
  
  def receive(self,text_data):
    pass