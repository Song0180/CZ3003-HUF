from rest_framework import serializers
from .models import HufGame
# from .models import HufUser


class HufGameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HufGame
        fields = ('gameid', 'username', 'game_name', 'game_tag', 'no_of_quiz', 'game_description', 'total_no_qn')


# class HufUserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = HufUser
#         fields = ('userid', 'username', 'email', 'user_password')
