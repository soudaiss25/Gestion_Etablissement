from django.test import TestCase
from .models import Etudiant
from classe.models import Classe

class EtudiantModelTest(TestCase):

    def setUp(self):
        """Créer une classe et un étudiant pour les tests"""
        self.classe = Classe.objects.create(nom="Informatique L3")
        self.etudiant = Etudiant.objects.create(
            prenom="Ali",
            nom="Dieng",
            email="ali.dieng@example.com",
            telephone="778889900",
            date_naissance="2001-05-15",
            classEtudiant=self.classe
        )

    def test_etudiant_creation(self):
        """Test si un étudiant est correctement créé"""
        self.assertEqual(self.etudiant.prenom, "Ali")
        self.assertEqual(self.etudiant.nom, "Dieng")
        self.assertEqual(self.etudiant.email, "ali.dieng@example.com")
        self.assertEqual(self.etudiant.telephone, "778889900")
        self.assertEqual(self.etudiant.classEtudiant.nom, "Informatique L3")

    def test_etudiant_str(self):
        """Test si __str__ renvoie bien 'prenom nom'"""
        self.assertEqual(str(self.etudiant), "Ali Dieng")

    def test_getClasseEtudiant(self):
        """Test si la méthode getClasseEtudiant retourne la bonne classe"""
        self.assertEqual(self.etudiant.getClasseEtudiant(), "Informatique L3")

        # Tester un étudiant sans classe
        etudiant_sans_classe = Etudiant.objects.create(
            prenom="Fatou",
            nom="Sow",
            email="fatou.sow@example.com",
            telephone="7766554433",
            date_naissance="2002-07-10"
        )
        self.assertEqual(etudiant_sans_classe.getClasseEtudiant(), "Non assigné")
