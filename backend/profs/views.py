from rest_framework import viewsets
from .models import Professeur
from .serializers import ProfesseurSerializer
from rest_framework import  status
from rest_framework.response import Response
from rest_framework.decorators import action

class ProfesseurViewSet(viewsets.ModelViewSet):
    queryset = Professeur.objects.all()
    serializer_class = ProfesseurSerializer

    @action(detail=True, methods=['get'])
    def lire_un(self, request, pk=None):
        prof = self.get_object()
        serializer = self.get_serializer(prof)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def ajouter(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'])
    def modifier(self, request, pk=None):
        professeur = self.get_object()
        serializer = self.get_serializer(professeur, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def supprimer(self, request, pk=None):
        professeur = self.get_object()
        professeur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)