# Generated by Django 5.1.6 on 2025-03-08 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classe', '0002_remove_classe_niveau'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classe',
            name='nom',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
