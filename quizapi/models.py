# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.conf import settings
from gameapi.models import HufGame


class HufQuiz(models.Model):
    quizid = models.IntegerField(primary_key=True)
    gameid = models.ForeignKey(HufGame, on_delete=models.CASCADE, db_column='gameid')
    quiz_duration = models.CharField(max_length=50, blank=True, null=True)
    quiz_max_score = models.IntegerField()
    quiz_description = models.CharField(max_length=50, blank=True, null=True)
    no_of_qn = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'huf_quiz'


class HufQuizQn(models.Model):
    quiz_qn_id = models.AutoField(primary_key=True)
    quizid = models.ForeignKey(HufQuiz, on_delete=models.CASCADE, db_column='quizid')
    correct_ans = models.IntegerField()
    question_name = models.CharField(max_length=30)
    score_per_qn = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'huf_quiz_qn'


# class HufQuizOption(models.Model):
#     quizid = models.OneToOneField(HufQuiz, on_delete=models.CASCADE, db_column='quizid', primary_key=True)
#     optionid = models.IntegerField()
#     option_description = models.CharField(max_length=50, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'huf_quiz_option'
#         unique_together = (('quizid', 'optionid'),)

class HufQuizOption(models.Model):
    quiz_qn = models.OneToOneField('HufQuizQn', models.DO_NOTHING, primary_key=True)
    option_id = models.IntegerField()
    option_description = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'huf_quiz_option'
        unique_together = (('quiz_qn', 'option_id'),)


class HufQuizResult(models.Model):
    quizid = models.OneToOneField(HufQuiz, on_delete=models.CASCADE, db_column='quizid', primary_key=True)
    username = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='username')
    score_earned = models.IntegerField()
    duration_taken = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'huf_quiz_result'
        unique_together = (('quizid', 'username'),)


# class HufQuizResult(models.Model):
#     quizid = models.OneToOneField(HufQuiz, on_delete=models.CASCADE, db_column='quizid')
#     username = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='username')
#     score_earned = models.IntegerField()
#     duration_taken = models.IntegerField()

#     class Meta:
#         managed = False
#         db_table = 'huf_quiz_result'
#         unique_together = (('quizid', 'username'),)


# class HufUserAns(models.Model):
#     quiz_qn_id = models.AutoField(primary_key=True)
#     username = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='username')
#     user_ans = models.IntegerField()

#     class Meta:
#         managed = False
#         db_table = 'huf_user_ans'
#         unique_together = (('quiz_qn_id', 'username'),)


class HufUserAns(models.Model):
    username = models.OneToOneField(settings.AUTH_USER_MODEL, models.DO_NOTHING, db_column='username', primary_key=True)
    quiz_qn = models.ForeignKey(HufQuiz, models.DO_NOTHING)
    user_ans = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'huf_user_ans'
        unique_together = (('username', 'quiz_qn'),)
