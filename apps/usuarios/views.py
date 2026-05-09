from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import UserAuthSerializers
from rest_framework.viewsets import ReadOnlyModelViewSet


class UsuarioViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserAuthSerializers
    
    
class AuthViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar registro y login de usuarios con token
    """

    @action(detail=False, methods=['post'])
    def register(self, request):
        serial = UserAuthSerializers(data=request.data)

        if serial.is_valid():
            user = User(
                username=serial.validated_data['username'],
                email=serial.validated_data.get('email', '')
            )
            user.set_password(serial.validated_data['password'])
            user.save()

            # Crear token automáticamente al registrar
            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                'new_user': serial.data,
                'token': token.key
            }, status=status.HTTP_201_CREATED)

        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener o crear token
        token, _ = Token.objects.get_or_create(user=user)

        serial = UserAuthSerializers(instance=user)
        return Response({
            "user": serial.data,
            "token": token.key
        }, status=status.HTTP_200_OK)
