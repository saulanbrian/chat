from rest_framework.generics import CreateAPIView, ListAPIView

from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser 
from django.shortcuts import get_object_or_404
from django.db.models import Q

import json

class UserCreationView(CreateAPIView):
    serializer_class = UserSerializer

class UserListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs.get('username','').strip()
        return CustomUser.objects.filter( Q(username=username) | Q(username__icontains=username) ).exclude(pk=self.request.user.id)