from rest_framework import viewsets

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .serializers import HufGameSerializer
from .models import HufGame

# from .serializers import HufUserSerializer
# from .models import HufUser


class HufGameViewSet(viewsets.ModelViewSet):
    queryset = HufGame.objects.all().order_by('gameid')
    serializer_class = HufGameSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['game_name', 'game_tag', 'username']

# class HufUserViewSet(viewsets.ModelViewSet):
#     queryset = HufUser.objects.all().order_by('userid')
#     serializer_class = HufUserSerializer


# Create your views here.
