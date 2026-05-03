from django.urls import path
from .views import TiendaApiViews, TiendaApiViewsDetail
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView



urlpatternsTienda = [
    #ruta para consultar y agregar 
    path('v1/tienda/', TiendaApiViews.as_view()),
    
    #ruta para trabajr con todo  por lo relacionado con id
    path('v1/tienda/<int:id>', TiendaApiViewsDetail.as_view()),
    


    # Endpoint para obtener el esquema OpenAPI
    path('schema/', SpectacularAPIView.as_view(), name='schema'),

    # Documentación interactiva con Swagger UI
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # Documentación interactiva con Redoc
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
    
    
    
    
    
    




