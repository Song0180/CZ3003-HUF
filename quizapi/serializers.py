from rest_framework import serializers
from .models import HufQuiz, HufQuizOption, HufQuizQn, HufQuizResult, HufUserAns
# from .models import HufUser


class HufQuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HufQuiz
        fields = ('quizid','gameid','quiz_duration','quiz_max_score','quiz_description','no_of_qn')

class HufQuizOptionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HufQuizOption
        fields = ('quizid', 'optionid', 'option_description')

class HufQuizQnSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HufQuizQn
        fields = ('quiz_qn_id', 'quizid', 'correct_ans', 'question_name', 'score_per_qn')

class HufQuizResultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HufQuizResult
        fields = ('quizid', 'userid', 'score_earned', 'duration_taken')



class HufUserAnsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HufUserAns
        fields = ('userid', 'quiz_qn', 'user_ans')
