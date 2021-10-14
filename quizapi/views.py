from rest_framework import viewsets
from django.http import HttpResponse, JsonResponse

from .serializers import HufQuizSerializer, HufQuizOptionSerializer, HufQuizQnSerializer, HufQuizResultSerializer, HufUserAnsSerializer
from .models import HufQuiz, HufQuizOption, HufQuizQn, HufQuizResult,  HufUserAns


class HufQuizViewSet(viewsets.ModelViewSet):
    queryset = HufQuiz.objects.all().order_by('game_id')
    serializer_class = HufQuizSerializer


class HufQuizOptionViewSet(viewsets.ModelViewSet):
    queryset = HufQuizOption.objects.all()
    serializer_class = HufQuizOptionSerializer


class HufQuizQnViewSet(viewsets.ModelViewSet):
    queryset = HufQuizQn.objects.all()
    serializer_class = HufQuizQnSerializer


class HufQuizResultViewSet(viewsets.ModelViewSet):
    queryset = HufQuizResult.objects.all()
    serializer_class = HufQuizResultSerializer


class HufUserAnsViewSet(viewsets.ModelViewSet):
    queryset = HufUserAns.objects.all()
    serializer_class = HufUserAnsSerializer


def getQuizTopFive(request,id):
    queryset = HufQuizResult.objects.filter(quizid=id).order_by('-score_earned')[:5].values()
    return JsonResponse({"models_to_return": list(queryset)})

