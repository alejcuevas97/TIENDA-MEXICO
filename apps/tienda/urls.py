from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.tienda.views import ProdApiViews 
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)



urlpatternsProd = [
    # Endpoints para documentación y esquema OpenAPI
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    
]


    
    
    
    
    
    




