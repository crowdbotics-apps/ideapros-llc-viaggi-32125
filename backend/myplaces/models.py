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
        max_length=255,
        null=True,
        blank=True
    )
    location = PointField()
    opening_hours = JSONField(
        blank=True,
        null=True
    )
    price_level = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        blank=True,
        null=True
    )
    types = ArrayField(
        models.CharField(
            max_length=255,
            blank=True,
            null=True
        ),
        blank=True,
        null=True,
        default=list
    )
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        blank=True,
        null=True
    )
    user_ratings_total = models.PositiveIntegerField(
        null=True,
        blank=True
    )
    vicinity = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )
    country = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    state = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    city = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    postal_code = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    street_number = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    street_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    users_in_bucketlist = models.ManyToManyField(
        User,
        through='Bucketlist',
        related_name='bucketlist_places'
    )
    users_have_visited = models.ManyToManyField(
        User,
        through='Visited',
        related_name='visited_places'
    )
    formatted_phone_number = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    international_phone_number = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    formatted_address = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    url = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    website = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )


class Photo(UUIDModel):
    """
    A data representation of the Place Photos from the
    Google Places API
    """
    place = models.ForeignKey(
        Place, 
        on_delete=models.CASCADE,
        related_name='photos'
    )
    photo = models.URLField()


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
    visited_on = models.DateField(
        blank=True,
        null=True
    )
    description = models.TextField(
        blank=True
    )

    class Meta:
        verbose_name_plural = "Visited"
