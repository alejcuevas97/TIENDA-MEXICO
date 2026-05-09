from django.urls import path
from .views import ProdApiViews
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView



urlpatternsProd = [
    #ruta para consultar y agregar 
    path('productos/', ProdApiViews.as_view()),
    
   # Endpoint para obtener el esquema OpenAPI
    path('schema/', SpectacularAPIView.as_view(), name='schema'),

    # Documentación interactiva con Swagger UI
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # Documentación interactiva con Redoc
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
    
    
    
    
    
    




