from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.home),
    path(r'^$', views.home),
    path(r'^test/', views.test, name='test')
]
