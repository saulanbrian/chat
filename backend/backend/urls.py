from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/token/',TokenObtainPairView.as_view()),
    path('auth/token/refresh/',TokenRefreshView.as_view()),
    path('chat/',include('chat.urls')),
    path('conversations/',include('conversation.urls'))
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
