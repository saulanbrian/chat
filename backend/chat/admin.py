from django.contrib import admin

from .models import Chat, Conversation

admin.site.register(Conversation)
admin.site.register(Chat)
