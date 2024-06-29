from rest_framework.generics import CreateAPIView, ListAPIView

from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser 

import json

class UserCreationView(CreateAPIView):
    serializer_class = UserSerializer

class UserListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs.get('username','')
        return CustomUser.objects.filter(username__icontains=username).exclude(pk=self.request.user.id)