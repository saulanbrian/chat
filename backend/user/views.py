from rest_framework.generics import CreateAPIView, ListAPIView

from .serializers import UserSerializer

from .models import CustomUser 

import json

class UserCreationView(CreateAPIView):
    serializer_class = UserSerializer

class UserListView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        username = self.kwargs.get('username','')
        return CustomUser.objects.filter(username__icontains=username).all()