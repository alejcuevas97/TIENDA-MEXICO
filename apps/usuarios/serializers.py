from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

#lo utilizo para convertir a json
class UserAuthSerializers(ModelSerializer):
    class Meta:
        model= User
        fields=['id','username','email','password']