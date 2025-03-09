from django.db import models
from classe.models import Classe
class Etudiant(models.Model):
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=15)
  
    date_naissance = models.DateField()
    date_creation = models.DateTimeField(auto_now_add=True)
    classEtudiant = models.ForeignKey(
        Classe, 
        on_delete=models.CASCADE, 
        related_name="etudiants",
        null=True, blank=True
    )
    def __str__(self):
        return f"{self.prenom} {self.nom}"
    def getClasseEtudiant(self):
        """Retourne le nom de la classe de l'étudiant ou 'Non assigné' si aucune classe."""
        return self.classEtudiant.nom if self.classEtudiant else "Non assigné"