from django.urls import path
from .views import TiendaApiViews, TiendaApiViewsDetail



urlpatternsTienda = [
    #ruta para consultar y agregar 
    path('v1/tienda/', TiendaApiViews.as_view()),
    
    #ruta para trabajr con todo  por lo relacionado con id
    path('v1/tienda/<int:id>', TiendaApiViewsDetail.as_view()),
    
    
    
    
    
    
    
]



