from django.test import TestCase
from .models import Classe

class ClasseModelTest(TestCase):

    def setUp(self):
        """Créer une classe pour les tests"""
        self.classe = Classe.objects.create(nom="Mathématiques")

    def test_classe_creation(self):
        """Test si une classe est correctement créée"""
        self.assertEqual(self.classe.nom, "Mathématiques")

    def test_classe_str(self):
        """Test si __str__ renvoie bien le nom de la classe"""
        self.assertEqual(str(self.classe), "Mathématiques")

    def test_classe_nom_unique(self):
        """Test si une classe avec un nom dupliqué ne peut pas être créée"""
        with self.assertRaises(Exception):  
            Classe.objects.create(nom="Mathématiques")
