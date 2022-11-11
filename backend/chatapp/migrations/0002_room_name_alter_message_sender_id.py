# Generated by Django 4.1 on 2022-11-08 22:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chatapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='name',
            field=models.CharField(default='channel', max_length=30),
        ),
        migrations.AlterField(
            model_name='message',
            name='sender_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='chatapp.user'),
        ),
    ]