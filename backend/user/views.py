from rest_framework.generics import CreateAPIView

from .serializers import UserSerializer

class UserCreationView(CreateAPIView):
    serializer_class = UserSerializer
    