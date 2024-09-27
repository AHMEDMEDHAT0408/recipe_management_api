from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from .models import Recipe
from .serializers import RecipeSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['category', 'ingredients']
    ordering_fields = ['preparation_time', 'cooking_time', 'servings']

    def get_queryset(self):
        queryset = Recipe.objects.filter(user=self.request.user)
        ingredients = self.request.query_params.get('ingredients')
        if ingredients:
            ingredients_list = ingredients.split(',')
            for ingredient in ingredients_list:
                queryset = queryset.filter(ingredients__icontains=ingredient)
        return queryset
