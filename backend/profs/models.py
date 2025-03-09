from django.db import models

class Professeur(models.Model):
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    specialite = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.prenom} {self.nom}"