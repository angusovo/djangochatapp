# djangochatapp

V1

This is a demo real-time chat app that use Django as the backend framework and react as the frontend framework

The socket that is using in backend is Channels and the database is MongoDB

Currently the database only stores the messages and no users or room is stored.

This may keep continue to develop as a more comprehensive real-time chat app

<br/>
<br/>

V2

Adding User and Room models for the app, user now can have login/sign up function with the use of JWT

Adding room function, users can now select their own channel and chat

Adding media message, users can send a message with media

All the images are store in the S3 bucket

Adding notification for handling errors as well as incoming messages 

<br/>
<br/>
<img width="500" src="https://django-chat-app-angus.s3.us-east-2.amazonaws.com/Screenshot+2022-11-10+at+11.45.01+PM.png"></img>
<img width="500" src="https://django-chat-app-angus.s3.us-east-2.amazonaws.com/Screenshot+2022-11-10+at+11.46.01+PM.png"></img>
<br/>
Deployed both front end and backend on Heroku for demo:

https://rocky-refuge-88943.herokuapp.com/


Enjoy!
