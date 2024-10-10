from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from recipes.views import RecipeViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,)
from recipes.views import main_page
router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_page, name='main_page'),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
