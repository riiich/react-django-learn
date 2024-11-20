from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializers, NoteSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

'''
    HELPFUL DOCUMENTATION: 
        - https://www.django-rest-framework.org/api-guide/serializers/
    
    - querysets are a collection of data from a database

'''

# ListCreateAPIView - used for read-write endpoints to represent a collection of model instances (provides GET and POST method handlers)
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializers      # used for validating and deserializing input, and for serializing output
    permission_classes = [IsAuthenticated]

    # overriding the queryset in order to 
    def get_queryset(self):
        user = self.request.user    
        
        return Note.objects.filter(author=user)     # get notes that are only from this authenticated user

    # overriding the create method that gets automatically created for a custom create method
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# DestoryAPIView - used for delete-only endpoints for a single model instance (provides a DELETE method handler)
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self, serializer):
        user = self.request.user

        return Note.objects.filter(author=user)

# CreateAPIView - used for create-only endpoints 
# THIS IS DEFAULT, unlike the NoteListCreate class above where the methods are being overridden (queryset, create method)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()           # select data from database
    serializer_class = UserSerializers      # convert python object to json object to use for response  
    permission_classes = [AllowAny]         
