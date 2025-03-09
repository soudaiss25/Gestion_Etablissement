from django.test import TestCase
from datetime import time
from cours.models import Cours
from profs.models import Professeur
from classe.models import Classe
from .models import Emploi

class EmploiModelTest(TestCase):

    def setUp(self):
        """Créer des objets nécessaires pour les tests"""
        self.cours = Cours.objects.create(nom="Mathématiques", description="Cours avancé", credits=3)
        self.professeur = Professeur.objects.create(nom="Doe", prenom="John", email="john.doe@example.com", specialite="Mathématiques")
        self.classe = Classe.objects.create(nom="Classe A")
        
        self.emploi = Emploi.objects.create(
            cours=self.cours,
            professeur=self.professeur,
            classe=self.classe,
            jour="Lundi",
            heure_debut=time(8, 0),
            heure_fin=time(10, 0)
        )

    def test_emploi_creation(self):
        """Test si un emploi du temps est correctement créé"""
        self.assertEqual(self.emploi.cours.nom, "Mathématiques")
        self.assertEqual(self.emploi.professeur.nom, "Doe")
        self.assertEqual(self.emploi.classe.nom, "Classe A")
        self.assertEqual(self.emploi.jour, "Lundi")
        self.assertEqual(self.emploi.heure_debut, time(8, 0))
        self.assertEqual(self.emploi.heure_fin, time(10, 0))

    def test_emploi_str(self):
        """Test si __str__ renvoie bien le bon format"""
        self.assertEqual(str(self.emploi), "Mathématiques - Lundi")
