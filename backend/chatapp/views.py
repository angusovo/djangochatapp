from time import clock_getres
from django.http import HttpResponse
from rest_framework import viewsets
from .serializer import *
from .models import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import parser_classes
import json
from datetime import datetime

def index(request):
    return render(request, 'chatapp/index.html')

def room(request, room_name):
    return render(request, 'chatapp/room.html', {
        'room_name': room_name
    })

@csrf_exempt
def userApi(request, id =0):
    # serializer_class = UserSerializer
    # queryset = User.objects.all()
    if request.method == 'GET':
        users = User.objects.all()
        users_serializer = UserSerializer(users,many= True)
        return JsonResponse(users_serializer.data,safe=False)

@csrf_exempt
def roomApi(request, id =0):
    # serializer_class = UserSerializer
    # queryset = User.objects.all()
    if request.method == 'GET':
        rooms = Room.objects.all()
        rooms_serializer = RoomSerializer(rooms,many= True)
        return JsonResponse(rooms_serializer.data,safe=False)


@csrf_exempt
@parser_classes((JSONParser,)) 

def messageApi(request, format=None):
    # serializer_class = UserSerializer
    # queryset = User.objects.all()
    if request.method == 'GET':
        messages = Message.objects.all()
        messages_serializer = MessageSerializer(messages,many= True)
        return JsonResponse(messages_serializer.data,safe=False)
    if request.method == 'POST':
        data = json.loads(request.body)
        messages = Message.objects.all()
        messages_serializer = MessageSerializer(messages,many= True)
        Message.objects.create(message = data['message'], sender = data['sender'], createAt = datetime.now().isoformat())
        return JsonResponse(messages_serializer.data,safe=False)



