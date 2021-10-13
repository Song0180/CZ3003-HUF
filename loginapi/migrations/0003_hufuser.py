# Generated by Django 3.2.7 on 2021-10-13 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('loginapi', '0002_auto_20211012_1414'),
    ]

    operations = [
        migrations.CreateModel(
            name='HufUser',
            fields=[
                ('userid', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=12, unique=True)),
                ('email', models.CharField(max_length=50, unique=True)),
                ('user_password', models.CharField(max_length=16)),
            ],
        ),
    ]