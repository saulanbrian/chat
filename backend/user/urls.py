from django.urls  import path
from . import views

urlpatterns = [
    path('signup',views.UserCreationView.as_view()),
    path('<username>/',views.UserListView.as_view()),
]
