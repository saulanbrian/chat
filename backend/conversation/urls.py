from django.urls import path
from . import views

urlpatterns = [
  path('',views.ConversationListView.as_view()),
  ]