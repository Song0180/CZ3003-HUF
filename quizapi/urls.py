from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'quiz', views.HufQuizViewSet) # TODO ISSUE "Field 'total_no_qn' doesn't have a default value"
router.register(r'quizoptions', views.HufQuizOptionViewSet) # TODO ISSUE "Unknown column 'huf_quiz_option.id' in 'field list'"
router.register(r'quizqn', views.HufQuizQnViewSet)
router.register(r'quizresult', views.HufQuizResultViewSet) # TODO ISSUE "Unknown column 'huf_quiz_result.id' in 'field list'"
router.register(r'useransquiz', views.HufUserAnsViewSet) # TODO ISSUE  "Table 'project_huf.huf_user_ans' doesn't exist"
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('quiztopfive/<id>',views.getQuizTopFive,name='quiztopfive'),

]
