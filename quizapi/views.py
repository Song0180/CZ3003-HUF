from rest_framework import viewsets



from .serializers import HufQuizSerializer
from .models import HufQuiz



class HufQuizViewSet(viewsets.ModelViewSet):
    queryset = HufQuiz.objects.all().order_by('gameid')
    serializer_class = HufQuizSerializer

