from pyexpat import model
from unittest.util import _MAX_LENGTH
from django.db import models
# Create your models here.

class User(models.Model):
    uname = models.CharField(max_length=32)
    dname = models.CharField(max_length=32)

class Message(models.Model):
    message = models.CharField(max_length=500)
    createAt = models.DateTimeField()
    sender = models.CharField(max_length=32)
    _id = models.AutoField(primary_key=True)

class Room(models.Model):
    roomName = models.CharField(max_length=32)
        

