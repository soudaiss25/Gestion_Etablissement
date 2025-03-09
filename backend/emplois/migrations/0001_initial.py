# Generated by Django 5.1.6 on 2025-03-04 15:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('classe', '0001_initial'),
        ('cours', '0001_initial'),
        ('profs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Emploi',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jour', models.CharField(max_length=10)),
                ('heure_debut', models.TimeField()),
                ('heure_fin', models.TimeField()),
                ('classe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classe.classe')),
                ('cours', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cours.cours')),
                ('professeur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profs.professeur')),
            ],
        ),
    ]
