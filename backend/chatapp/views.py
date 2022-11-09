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
import datetime
from .encrypt_util import *
from .file_upload import *
import jwt
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

        # result = FileUploadVToS3.uploadToS3(file_obj,username)
        #     'dname':dname,

        # if not result:
        #     return JsonResponse({
        #     'message': 'Please check your file type or username',
        #     },status=400)

        # data = {
        #     'uname':username,
        #     'password':password,
        #     'url': result
        # }

        # user = User.objects.create(uname= username, dname=dname, password=password,url=result)
        user = User.objects.create(uname= username, dname=dname, password=password,url='123')

        payload = {
            'id' : user.userId,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=300),
            'iat':datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        #     serializers = UserSerializer(data=data)
        return JsonResponse({
            'message': 'User Created!',
            'token':token
        },status=200)



class RoomApiView(APIView):

    # 1. Create new room
    def post(self, request, *args, **kwargs):
        body = json.loads(request.body)

        Room.objects.create(name= body['name'])
        rooms = Room.objects.all()
        rooms_serializer = RoomSerializer(rooms,many= True)
        return JsonResponse(rooms_serializer.data,safe=False,status=200)
        
    # 2. Get all rooms
    def get(self, request, *args, **kwargs):
        
        rooms = Room.objects.all()
        rooms_serializer = RoomSerializer(rooms,many= True)
        return JsonResponse(rooms_serializer.data,safe=False,status=200)


class MessageApiView(APIView):

    # 1. Create new msg
    def post(self, request, *args, **kwargs):
        body = json.loads(request.body)
        data = body['body']
        token = jwt.decode(data['token'],'secret',algorithms='HS256')
        sender = User.objects.filter(userId = token['id']).first()
        messages = Message.objects.all()
        room = Room.objects.filter(id = data['room']).first()
        messages_serializer = MessageSerializer(messages,many= True)
        content_type = 'image'
        Message.objects.create(
            message = data['message'], 
            sender_id = sender, 
            createAt = datetime.datetime.now().isoformat(),
            content_type = content_type,
            room_id = room)
        return JsonResponse(messages_serializer.data,safe=False)
        
    # 2. Get all message from selected Rm
    def get(self, request, *args, **kwargs):
        room_id = request.GET.get('id', None)
        messages = Message.objects.filter(room_id=room_id)
        messages_serializer = MessageSerializer(messages,many= True)
        return JsonResponse(messages_serializer.data,safe=False)    



