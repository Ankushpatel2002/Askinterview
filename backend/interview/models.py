from django.db import models

class Question(models.Model):
    field = models.CharField(max_length=100)
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return self.question