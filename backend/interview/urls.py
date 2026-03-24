from django.urls import path
from . import views

urlpatterns = [
    path('generate-question/', views.generate_question),
    path('check-answer/', views.check_answer),
]
