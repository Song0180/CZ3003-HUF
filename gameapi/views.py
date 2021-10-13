from rest_framework import viewsets

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .serializers import HufGameSerializer
from .models import HufGame


class HufGameViewSet(viewsets.ModelViewSet):
    queryset = HufGame.objects.all().order_by('game_id')
    serializer_class = HufGameSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['game_name', 'game_tag', 'username']

# Create your views here.
