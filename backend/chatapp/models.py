from djongo import models
from django.db import models

class User(models.Model):
    uname = models.CharField(max_length=32)
    dname = models.CharField(max_length=32)
    password = models.CharField(max_length=16)
    url = models.CharField(max_length=100)
    userId = models.BigAutoField(primary_key=True)

    def __str__(self):
        return self.dname

class Room(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=30, default="channel")
    url = models.CharField(max_length=100, default="")

class Message(models.Model):
    message = models.CharField(max_length=500)
    createAt = models.DateTimeField()
    sender_id = models.ForeignKey(User, on_delete=models.CASCADE,related_name='sender')
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    content_type = models.CharField(max_length=30,default='text')
    url = models.CharField(max_length=100,default='')
    # @property
    # def uname(self):
    #     return self.sender_id.uname
    @property
    def sender_dname(self):
        return self.sender_id.dname
    @property
    def sender_url(self):
        return self.sender_id.url
        

