from rest_framework import viewsets
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

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


@api_view(["POST"])
def postUserAns(request):

    # respone.data needs to linked to fontend response
    userId = request.data.get('userId', None)
    quiz_qz_id = request.data.get('quizQnId', None)
    answer = request.data.get('answer', None)

    if request.method == 'POST':

        # Add user snwers to the table
        saveSerializer = HufUserAnsSerializer(data=request.data)
        if saveSerializer.is_valid():
            saveSerializer.save()

        quiz_question = HufQuizQn.objects.get(quiz_qn_id=quizQnId)
        quiz_result = HufQuizResult.objects.get(username=userId)

        # Check if answer is correct
        if int(answer) == quiz_question.correct_ans:

            # Increase the score
            if quiz_result.score_earned == NULL:
                quiz_result.score_earned = 1
                quiz_result.save()
            else:
                quiz_result.score_earned += 1
                quiz_result.save()

    return JsonResponse({"UserAnswer": request.data})


def getQuizTopFive(request, id):
    queryset = HufQuizResult.objects.filter(
        quizid=id).order_by('-score_earned')[:5].values()
    return JsonResponse({"models_to_return": list(queryset)})
