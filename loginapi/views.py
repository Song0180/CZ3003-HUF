from django.shortcuts import render
from datetime import datetime
from django.urls import reverse
from urllib.parse import urlencode
from django.conf import settings
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.models import User
from .serializers import UserSerializer
from allauth.socialaccount.models import SocialToken
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, viewsets


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def home_page(request):
    if request.method == 'POST':
        request.POST.get("user.socialaccount_set.all.0.get_profile_url()")
    return render(request, "login.html")


@csrf_exempt
def login_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponse("successful log in")
        # return redirect('/')

    else:
        messages.success(request, ("there was an error logging in"))
        return HttpResponse("login unsuccessful")
        # return redirect('/login')


@csrf_exempt
def logout_user(request):
    logout(request)
    return HttpResponse("successful logout")


@csrf_exempt
def get_social_login_auth(request, email):
    user = User.objects.get(email=email)
    social_token = SocialToken.objects.filter(account__user=user, account__provider='facebook')
    Token.objects.create(user=user)


# Create your views here.
