from django.http import HttpResponse
import pymongo
from rest_framework import viewsets
from .serializer import *
from .models import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

# Create your views here.

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
def messageApi(request, id =0):
    # serializer_class = UserSerializer
    # queryset = User.objects.all()

    print('11')
    if request.method == 'GET':
        messages = Message.objects.all()
        messages_serializer = MessageSerializer(messages,many= True)
        return JsonResponse(messages_serializer.data,safe=False)

