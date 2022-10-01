from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('dname', 'uname')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('roomName',)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('message', 'createAt','sender')
