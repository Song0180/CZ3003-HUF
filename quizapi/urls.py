from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'hufquiz', views.HufQuizViewSet) # TODO ISSUE "Field 'total_no_qn' doesn't have a default value"
router.register(r'hufquizoptions', views.HufQuizOptionViewSet) # TODO ISSUE "Unknown column 'huf_quiz_option.id' in 'field list'"
router.register(r'hufquizqn', views.HufQuizQnViewSet)
router.register(r'hufquizresult', views.HufQuizResultViewSet) # TODO ISSUE "Unknown column 'huf_quiz_result.id' in 'field list'"
router.register(r'hufuseransquiz', views.HufUserAnsViewSet) # TODO ISSUE  "Table 'project_huf.huf_user_ans' doesn't exist"
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
