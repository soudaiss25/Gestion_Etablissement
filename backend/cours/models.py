from django.db import models

class Cours(models.Model):
    nom = models.CharField(max_length=200)
    description = models.TextField()
    credits = models.IntegerField()

    def __str__(self):
        return self.nom