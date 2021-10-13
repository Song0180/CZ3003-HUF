from rest_framework import viewsets


from .serializers import HufQuizSerializer, HufQuizOptionSerializer, HufQuizQnSerializer, HufQuizResultSerializer, HufUserAnsSerializer
from .models import HufQuiz, HufQuizOption, HufQuizQn, HufQuizResult,  HufUserAns



class HufQuizViewSet(viewsets.ModelViewSet):
    queryset = HufQuiz.objects.all().order_by('gameid')
    serializer_class = HufQuizSerializer

class HufQuizOptionViewSet(viewsets.ModelViewSet):
    queryset = HufQuizOption.objects.all()
    serializer_class = HufQuizOptionSerializer

class HufQuizQnViewSet(viewsets.ModelViewSet):
    queryset = HufQuizQn.objects.all()#.order_by('quizid')
    serializer_class = HufQuizQnSerializer

class HufQuizResultViewSet(viewsets.ModelViewSet):
    queryset = HufQuizResult.objects.all()#.order_by('quizid')
    serializer_class = HufQuizResultSerializer



class HufUserAnsViewSet(viewsets.ModelViewSet):
    queryset = HufUserAns.objects.all()#.order_by('quizid')
    serializer_class = HufUserAnsSerializer
