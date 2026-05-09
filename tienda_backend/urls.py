from django.contrib import admin
from django.urls import path, include, re_path
from apps.inventario.urls import urlpatternsInv
from apps.tienda.urls import urlpatternsProd
from apps.usuarios.urls import urlpatternsUsuarios 
from django.shortcuts import redirect
from drf_spectacular.views import SpectacularSwaggerView




urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('api/', include(urlpatternsInv)),
    path('api/', include(urlpatternsProd)),
    path('api/usuarios/', include(urlpatternsUsuarios)),
    path('api/', SpectacularSwaggerView.as_view(url_name='schema'), name='api-root'),
    
    
]
#documentar la app

