from django.test import TestCase
from profs.models import Professeur

class ProfesseurModelTest(TestCase):
    def setUp(self):
        """Création d'un professeur pour les tests"""
        self.professeur = Professeur.objects.create(
            prenom="Jean",
            nom="Dupont",
            email="jean.dupont@example.com",
            specialite="Mathématiques"
        )

    def test_creation_professeur(self):
        """Test de la création d'un professeur"""
        prof = Professeur.objects.get(id=self.professeur.id)
        self.assertEqual(prof.prenom, "Jean")
        self.assertEqual(prof.nom, "Dupont")
        self.assertEqual(prof.email, "jean.dupont@example.com")
        self.assertEqual(prof.specialite, "Mathématiques")

    def test_str_method(self):
        """Test de la méthode __str__"""
        self.assertEqual(str(self.professeur), "Jean Dupont")

    def test_email_unique(self):
        """Test que l'email est bien unique"""
        with self.assertRaises(Exception):  # Vérifie qu'une exception est levée
            Professeur.objects.create(
                prenom="Paul",
                nom="Martin",
                email="jean.dupont@example.com",  # Même email
                specialite="Physique"
            )
