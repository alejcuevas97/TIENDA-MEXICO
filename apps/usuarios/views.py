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
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserAuthSerializers

#Se crea para introducir los datos de usuario y contrasena
@api_view(['POST'])
def register(request):
    serial = UserAuthSerializers(data=request.data)

    if serial.is_valid():
        # Crear usuario pero sin guardar aún
        user = User(
            username=serial.validated_data['username'],
            email=serial.validated_data.get('email', '')
        )
        user.set_password(serial.validated_data['password'])  # Encripta la contraseña
        user.save()

        return Response({'new_user': serial.data}, status=status.HTTP_201_CREATED)

    return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    serial = UserAuthSerializers(instance=user)
    return Response({"user": serial.data}, status=status.HTTP_200_OK)

    
@api_view(['GET'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

