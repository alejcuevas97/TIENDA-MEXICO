from django.contrib import admin
from django.urls import path, include, re_path
from apps.inventario.urls import urlpatternsTienda 
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from apps.usuarios import views


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', include(urlpatternsTienda)),
    #ruta para registrar
    re_path ('register/', views.register),
    #ruta para hacer login
    re_path('login/', views.login),
    #ruta para crear token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #ruta para refresh token
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    
]
#documentar la app

