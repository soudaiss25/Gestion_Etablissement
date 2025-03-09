from django.shortcuts import render
from rest_framework import viewsets
from .models import Classe
from .serializers import ClasseSerializer
from rest_framework import  status
from rest_framework.response import Response
from rest_framework.decorators import action

class ClasseViewSet(viewsets.ModelViewSet):
    queryset = Classe.objects.all()
    serializer_class = ClasseSerializer

    @action(detail=True, methods=['get'])
    def lire_un(self, request, pk=None):
        classe = self.get_object()
        serializer = self.get_serializer(classe)
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
        classe = self.get_object()
        serializer = self.get_serializer(classe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def supprimer(self, request, pk=None):
        classe = self.get_object()
        classe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)