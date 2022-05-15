# Generated by Django 2.2.28 on 2022-05-15 11:38

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myplaces', '0008_auto_20220515_0926'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='users_have_visited',
            field=models.ManyToManyField(related_name='visited_places', through='myplaces.Visited', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='place',
            name='users_in_bucketlist',
            field=models.ManyToManyField(related_name='bucketlist_places', through='myplaces.BucketList', to=settings.AUTH_USER_MODEL),
        ),
    ]
