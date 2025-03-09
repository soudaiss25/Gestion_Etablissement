from django.test import TestCase
from .models import Cours

class CoursModelTest(TestCase):

    def setUp(self):
        """Créer un cours pour les tests"""
        self.cours = Cours.objects.create(
            nom="Programmation Python",
            description="Un cours avancé sur Python.",
            credits=3
        )

    def test_cours_creation(self):
        """Test si un cours est correctement créé"""
        self.assertEqual(self.cours.nom, "Programmation Python")
        self.assertEqual(self.cours.description, "Un cours avancé sur Python.")
        self.assertEqual(self.cours.credits, 3)

    def test_cours_str(self):
        """Test si __str__ renvoie bien le nom"""
        self.assertEqual(str(self.cours), "Programmation Python")
