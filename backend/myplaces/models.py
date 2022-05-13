from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.gis.db.models import PointField
from django.contrib.postgres.fields import JSONField, ArrayField
from home.constants import BUCKETLIST_TYPES, EXPERIENCE_TYPES

from home.models import UUIDModel


User = get_user_model()


class Place(UUIDModel):
    """
    A data representation of a saved Place from the 
    Google Places API
    """
    place_id = models.CharField(
        max_length=255
    )
    name = models.CharField(
        max_length=255
    )
    location = PointField()
    opening_hours = JSONField()
    price_level = models.DecimalField(
        max_digits=2,
        decimal_places=1
    )
    types = ArrayField(
        models.CharField(
            max_length=255,
            blank=True
        ),
        blank=True,
        default=list
    )
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1
    )
    user_ratings_total = models.PositiveIntegerField()
    vicinity = models.CharField(
        max_length=255
    )


class BucketList(UUIDModel):
    """
    A through model representing a bucket list item of a User
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='bucketlist'
    )
    place = models.ForeignKey(
        Place,
        on_delete=models.CASCADE,
        related_name='bucketlist'
    )
    status = models.CharField(
        choices=BUCKETLIST_TYPES,
        max_length=64,
        default='To Explore'
    )


class Visited(UUIDModel):
    """
    A through model representing a list of visited places of a User
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='visited'
    )
    place = models.ForeignKey(
        Place,
        on_delete=models.CASCADE,
        related_name='visited'
    )
    experience = models.CharField(
        choices=EXPERIENCE_TYPES,
        max_length=64,
        blank=True
    )
    would_return = models.BooleanField(
        blank=True,
        null=True
    )
    visited_on = models.DateField()
    description = models.TextField(
        blank=True
    )
