from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from ideapros_llc_viaggi_32125.settings import PLACES_API_KEY

import requests
from .models import Place
from .serializers import PlaceSerializer

from users.authentication import ExpiringTokenAuthentication

# import googlemaps

# gmaps = googlemaps.Client(key=PLACES_API_KEY)


class PlacesViewSet(ModelViewSet):
    serializer_class = PlaceSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Place.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['place_id', 'name']

    # Get Nearby Places
    @action(detail=False, methods=['post'])
    def nearby_places(self, request):
        lat = request.data.get('latitude')
        lng = request.data.get('longitude')
        location = (lat, lng)
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat}%2C{lng}&radius=1500&key={PLACES_API_KEY}"
        response = requests.get(url)
        # response = gmaps.places_nearby(location=location, rank_by="prominence", radius=1500)
        results = response.json()
        results = results.get('results')
        places = []
        for result in results:
            place = {
                "place_id": result.get('place_id'),
                "name": result.get('name'),
                "location": result.get('geometry', {}).get('location'),
                "opening_hours": result.get('opening_hours'),
                "price_level": result.get('price_level'),
                "types": result.get('types'),
                "rating": result.get('rating'),
                "user_ratings_total": result.get('user_ratings_total'),
                "vicinity": result.get('vicinity')
            }
            places.append(place)
        return Response({'places': places}, status=status.HTTP_200_OK)
