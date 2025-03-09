from rest_framework import serializers
from .models import Etudiant
from classe.models import Classe
class EtudiantSerializer(serializers.ModelSerializer):
    classEtudiant = serializers.PrimaryKeyRelatedField(queryset=Classe.objects.all(), allow_null=True)

    class Meta:
        model = Etudiant
        fields = '__all__'