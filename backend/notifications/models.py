from django.db import models
from home.models import UUIDModel

from users.models import User


class Notification(UUIDModel):
    """
    A model for representing notifications of a User
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)
    title = models.CharField(blank=True, null=True, max_length=255)
    content = models.CharField(blank=True, null=True, max_length=255)
    data_type = models.CharField(blank=True, null=True, max_length=255)
    data = models.CharField(blank=True, null=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.title
