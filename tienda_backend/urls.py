from django.contrib import admin
from django.urls import path, include, re_path
from apps.inventario.urls import urlpatternsTienda 
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from apps.usuarios import views
from django.shortcuts import redirect

def redirect_to_products(request):
    return redirect('Productos/docs/')



urlpatterns = [
    path('', redirect_to_products),
    path('admin/', admin.site.urls),
    path('Productos/', include(urlpatternsTienda)),
    path ('register/', views.register), #ruta para registrar
    path('login/', views.login), #ruta para hacer login
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),#ruta para crear token
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'), #ruta para refresh token
    
]
#documentar la app

