from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

'''
    HELPFUL DOCUMENTATION: 
        - https://www.django-rest-framework.org/api-guide/serializers/
        
'''

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()           # select data from database
    serializer_class = UserSerializers      # convert python object to json object to use for response  
    permission_classes = [AllowAny]         