from rest_framework import serializers
from .models import HufQuiz
# from .models import HufUser


class HufQuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HufQuiz
        fields = ('quizid','gameid','quiz_duration','quiz_max_score','quiz_description','no_of_qn','total_no_qn')
