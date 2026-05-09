from rest_framework.serializers import ModelSerializer
from .models import Inventario

#creando las serializacion de registro
class UserSerializersInv(ModelSerializer):
    class Meta:
        model= Inventario
        fields='__all__'
        
