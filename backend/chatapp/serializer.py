from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    sender_dname = serializers.ReadOnlyField()
    sender_url = serializers.ReadOnlyField()
    class Meta:
        model = Message
        fields = '__all__'
