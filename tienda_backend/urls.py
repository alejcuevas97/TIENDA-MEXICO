from django.contrib import admin
from django.urls import path, include
from apps.inventario.urls import urlpatternsInv
from apps.tienda.urls import urlpatternsProd

from drf_spectacular.views import SpectacularSwaggerView
from rest_framework.routers import DefaultRouter

from apps.tienda.views import ProdApiViews
from apps.inventario.views import InvApiViews
from apps.usuarios.views import AuthViewSet, UsuarioViewSet  # 👈 importa ambos

router = DefaultRouter()
router.register(r'productos', ProdApiViews, basename='productos')
router.register(r'inventario', InvApiViews, basename='inventario')

router.register(r'auth', AuthViewSet, basename='auth')  # 👈 login/register con token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(urlpatternsInv)),
    path('api/', include(urlpatternsProd)),
    path('api/', SpectacularSwaggerView.as_view(url_name='schema'), name='api-root'),
    path('api/', include(router.urls)),
]
