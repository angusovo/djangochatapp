from .serializer import *
from .models import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.views import APIView
from django.http.response import JsonResponse
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.decorators import parser_classes
import json
from datetime import datetime
from .encrypt_util import *
from .file_upload import *
import os
from .file_upload import *
from .file_s3 import MediaStorage
def index(request):
    return render(request, 'chatapp/index.html')

def room(request, room_name):
    return render(request, 'chatapp/room.html', {
        'room_name': room_name
    })

class AuthApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def post(self, request, *args, **kwargs):
        '''
        
        '''
        body = json.loads(request.body)
        user = User.objects.get(uname = body['username'])
        print(user.uname)
        # serializer = TodoSerializer(todos, many=True)
        return Response('123', status=status.HTTP_200_OK)

class UserApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def post(self, request, *args, **kwargs):
        # Create User    
        username = request.POST.get('usernmae')
        password = request.POST.get('password')
        dname = request.POST.get('dname')
        file_obj = request.FILES.get('file', '')

        
        user = User.objects.filter(uname = username).first()
        if user:
            # username alreay exist
            return JsonResponse({
                'message': 'Error: username already exists'
            }, status=400)

        result = FileUploadVToS3.uploadToS3(file_obj,username)

        if not result:
            return JsonResponse({
            'message': 'Please check your file type or username',
            },status=400)

        data = {
            'dname':dname,
            'uname':username,
            'password':password,
            'url': result
        }

        User.objects.create(uname= username, dname=dname, password=password,url=result)
        #     serializers = UserSerializer(data=data)
        return JsonResponse({
            'message': 'User Created!',
            'user':'123'
        },status=200)


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
        body = json.loads(request.body)
        data = body['body']
        messages = Message.objects.all()
        messages_serializer = MessageSerializer(messages,many= True)
        Message.objects.create(message = data['message'], sender = data['sender'], createAt = datetime.now().isoformat())
        return JsonResponse(messages_serializer.data,safe=False)



