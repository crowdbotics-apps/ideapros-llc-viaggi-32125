from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.core.validators import RegexValidator
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.contrib.gis.db.models import PointField
import uuid
from home.constants import GENDER_TYPES, INTEREST_TYPES

from home.models import UUIDModel


class User(AbstractUser):
    """
    The base user model that holds any fields related to authentication
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    email = models.EmailField(unique=True)
    activation_key = models.CharField(max_length=255, blank=True, null=True)
    otp = models.CharField(max_length=6, blank=True, null=True)
    location = PointField(blank=True, null=True)
    following = models.ManyToManyField("self", blank=True, symmetrical=False)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def __str__(self):
        return self.email or '--empty--'


class Profile(UUIDModel):
    """
    A user profile model that holds any fields irrelavant to authentcation
    """
    # Validators
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,14}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 14 digits allowed."
        )
    # Fields
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    photo = models.ImageField(
        upload_to='user/photos',
        blank=True, null=True
    )
    phone = models.CharField(
        validators=[phone_regex],
        max_length=17,
        blank=True
    )
    bio = models.TextField(
        blank=True
    )
    address = models.CharField(
        max_length=255,
        blank=True
    )
    city = models.CharField(
        max_length=255,
        blank=True
    )
    zip_code = models.CharField(
        max_length=8,
        blank=True
    )
    state = models.CharField(
        max_length=150,
        blank=True
    )
    country = models.CharField(
        max_length=150,
        blank=True
    )
    dob = models.DateField(
        blank=True,
        null=True
    )
    gender = models.CharField(
        choices=GENDER_TYPES,
        max_length=16,
        blank=True
    )
    interests = ArrayField(
        models.CharField(
            choices=INTEREST_TYPES,
            max_length=32,
            blank=True
        ),
        blank=True,
        default=list
    )

    def __str__(self):
        return self.user.email or '--empty--'
