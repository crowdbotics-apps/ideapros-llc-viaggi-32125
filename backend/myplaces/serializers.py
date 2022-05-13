from rest_framework import serializers

from .models import Place


class PlaceSerializer(serializers.ModelSerializer):
    """
    A data representation of the place data returned
    by the Google Places API
    """
    class Meta:
        model = Place
        fields = '__all__'
