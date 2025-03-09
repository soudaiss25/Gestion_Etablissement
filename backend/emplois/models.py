from django.db import models
from cours.models import Cours
from profs.models import Professeur
from classe.models import Classe

class Emploi(models.Model):
    cours = models.ForeignKey(Cours, on_delete=models.CASCADE)
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)
    classe = models.ForeignKey(Classe, on_delete=models.CASCADE)
    jour = models.CharField(max_length=10)
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()

    def __str__(self):
        return f"{self.cours.nom} - {self.jour}"
