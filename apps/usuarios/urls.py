from django.urls import path
from apps.usuarios import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView



urlpatternsUsuarios = [
    path ('register/', views.register), #ruta para registrar
    path('login/', views.login), #ruta para hacer login
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),#ruta para crear token
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'), #ruta para refresh token
]
    
    
    
    
    
    




