from django.contrib import admin
from django.urls import path
from ML import views

urlpatterns = [
    path("", views.index, name='homepage'),
   # path("about", views.about, name='about'),
   # path("services", views.services, name='services'),
   # path("contact", views.contact, name='contact'),
   # path('login',views.loginUser, name="login"),
   # path('logout',views.logoutUser, name="logout"),
   # path('admin/', admin.site.urls),
  #  path("", include("ML.urls"))
]
