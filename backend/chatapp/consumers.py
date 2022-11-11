# app/consumers.py
import json
from asgiref.sync import async_to_sync, sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import *
import jwt
from datetime import datetime

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        room = await self.get_room(text_data_json['room'])
        message = text_data_json['message']
        token = jwt.decode(text_data_json['token'],'secret',algorithms='HS256')
        sender = await self.get_user(token['id'])

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender.dname,
                'room':room.name,
                'createAt':datetime.now().isoformat()
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        print(event)
        message = event['message']
        sender =  event['sender']
        room = event['room']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender' : sender,
            'room':room,
            'createAt':datetime.now().isoformat()
        }))

    @sync_to_async
    def get_user(self,id):
        return User.objects.get(userId = id)
    @sync_to_async
    def get_room(self,id):
        return Room.objects.get(id = id)