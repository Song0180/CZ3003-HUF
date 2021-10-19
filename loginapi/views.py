from django.shortcuts import render
from datetime import datetime
from django.urls import reverse
from urllib.parse import urlencode
from django.conf import settings
from django.contrib import messages
from django.shortcuts import redirect
from .serializers import UserSerializer
from allauth.socialaccount.models import SocialToken
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth.models import User
from django.core.mail import send_mail


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@csrf_exempt
def login_user(request):
    """Logs user into app
     
    Args:
        request: the http request 
    Returns:
        HttpResponse

    """
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({'message':'successful log in'})

    else:
        return JsonResponse({'message':"unsuccessful log in"})


@csrf_exempt
def logout_user(request):
    """Logs user out of app 
     
    Args:
        request: the http request 
    Returns:
        HttpResponse

    """
    logout(request)
    return JsonResponse({'message':'successful logout'})
    # return HttpResponse("successful logout")


def forgot_password(request, email):
     """Sends new password to user email 
     
    Args:
        request: the http request 
        email: email of user 
    Returns:
        HttpResponse

    """
    usr = User.objects.get(email=email)
    new_password = usr.date_joined.strftime("%d-%m-%Y")
    usr.set_password(new_password)
    usr.save()
    send_mail("your new password", new_password, from_email="cz3003huf@gmail.com", recipient_list=[usr.email])
    # return HttpResponse('your new password has been sent to your email')
    return JsonResponse({'message':'your new password has been sent to your email'})


def home_page(request):
    if request.method == 'POST':
        request.POST.get("user.socialaccount_set.all.0.get_profile_url()")
    return render(request, "login.html")


@csrf_exempt
def get_social_login_auth(request, email):
    user = User.objects.get(email=email)
    social_token = SocialToken.objects.filter(account__user=user, account__provider='facebook')
    Token.objects.create(user=user)



def get_authenticated_user(request):
    if request.user.is_authenticated:
        return JsonResponse({'message':request.user.username})
    else:
        return JsonResponse({'message':"not authenticated"})

# # Create your views here.
