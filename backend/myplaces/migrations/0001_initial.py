# Generated by Django 2.2.28 on 2022-05-13 11:19

from django.conf import settings
import django.contrib.gis.db.models.fields
import django.contrib.postgres.fields
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('place_id', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('opening_hours', django.contrib.postgres.fields.jsonb.JSONField()),
                ('price_level', models.DecimalField(decimal_places=1, max_digits=2)),
                ('types', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=255), blank=True, default=list, size=None)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('user_ratings_total', models.PositiveIntegerField()),
                ('vicinity', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Visited',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('experience', models.CharField(blank=True, choices=[('Thumbs up', 'Thumbs up'), ('Neutral', 'Neutral'), ('Thumbs down', 'Thumbs down')], max_length=64)),
                ('would_return', models.BooleanField(blank=True, null=True)),
                ('visited_on', models.DateField()),
                ('description', models.TextField(blank=True)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visited', to='myplaces.Place')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visited', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='BucketList',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('To Explore', 'To Explore'), ('Wanna Visit', 'Wanna Visit')], default='To Explore', max_length=64)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bucketlist', to='myplaces.Place')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bucketlist', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]