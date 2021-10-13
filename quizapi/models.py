from django.db import models
from django.conf import settings
from gameapi.models import HufGame


class HufQuiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    game_id = models.ForeignKey(HufGame, models.DO_NOTHING)
    quiz_duration = models.CharField(max_length=50, blank=True, null=True)
    quiz_max_score = models.IntegerField()
    quiz_description = models.CharField(max_length=50, blank=True, null=True)
    no_of_qn = models.IntegerField()
    total_no_qn = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'hufquiz'


class HufQuizQn(models.Model):
    quiz_qn_id = models.AutoField(primary_key=True)
    quiz_id = models.ForeignKey(HufQuiz, models.DO_NOTHING)
    correct_ans = models.IntegerField()
    question_name = models.CharField(max_length=30)
    score_per_qn = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'hufquizqn'


class HufQuizOption(models.Model):
    quiz_qn_id = models.OneToOneField(HufQuizQn, models.DO_NOTHING, primary_key=True)
    option_id = models.IntegerField()
    option_description = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hufquizoption'
        unique_together = (('quiz_qn_id', 'option_id'),)


class HufQuizResult(models.Model):
    quiz_id = models.OneToOneField(HufQuiz, models.DO_NOTHING, primary_key=True)
    username = models.ForeignKey(settings.AUTH_USER_MODEL, models.DO_NOTHING, db_column='username')
    score_earned = models.IntegerField()
    duration_taken = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'hufquizresult'
        unique_together = (('quiz_id', 'username'),)


class HufUserAns(models.Model):
    username = models.OneToOneField(settings.AUTH_USER_MODEL, models.DO_NOTHING, db_column='username', primary_key=True)
    quiz_qn_id = models.ForeignKey(HufQuizQn, models.DO_NOTHING)
    user_ans = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'hufuserans'
        unique_together = (('username', 'quiz_qn_id'),)
