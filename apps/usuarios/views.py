from django.shortcuts import render

from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .serializers import UserAuthSerializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView


#Se crea para introducir los datos de usuario y contrasena
@api_view(['POST'])
def register(request):
    serial= UserAuthSerializers(data=request.data)
    
    if serial.is_valid():
        serial.save()
        
        new_user= User.objects.get(username=serial.data['username'])
        new_user.set_password(serial.data['password'])
        new_user.save()
        
        
        
        return Response({  'new_user': serial.data} ,
                        status=status.HTTP_201_CREATED)
    
    return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    user= get_object_or_404(User, username=request.data['username'])
    
    if not user.check_password(request.data['password']):
        return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    serial= UserAuthSerializers(instance=user)
    
    
    return Response({"user":serial.data}, status=status.HTTP_200_OK)
    


