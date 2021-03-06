from rest_framework import status as rf_status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D


from django_filters.rest_framework import DjangoFilterBackend


from home.utility import get_photo, get_photos
from ideapros_llc_viaggi_32125.settings import PLACES_API_KEY
from myplaces.filters import PlaceFilter

from .models import BucketList, Place, Visited, Photo
from .serializers import BucketListSerializer, FollowerSerializer, NewPlaceSerializer, PlaceSerializer, VisitedSerializer

from users.authentication import ExpiringTokenAuthentication

import googlemaps

gmaps = googlemaps.Client(key=PLACES_API_KEY)


User = get_user_model()


class FollowerViewSet(ModelViewSet):
    serializer_class = FollowerSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = User.objects.all()

    def get_queryset(self):
        return self.request.user.following.all()

    @action(detail=False, methods=['get'])
    def myself(self, request):
        serializer = FollowerSerializer(request.user, context={'request': request})
        return Response(serializer.data)


class PlacesViewSet(ModelViewSet):
    serializer_class = PlaceSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Place.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_class = PlaceFilter

    def get_queryset(self):
        qs = super().get_queryset()
        lat = self.request.query_params.get('latitude', None)
        lng = self.request.query_params.get('longitude', None)
        if lat is not None and lng is not None:
            location = Point(float(lat), float(lng))
            sort_distance = self.request.query_params.get('distance', None)
            qs = qs.filter(location__dwithin=(location, 1))
            if sort_distance == "low":
                qs = qs.annotate(distance=Distance('location', location)) \
                    .order_by('distance')
            elif sort_distance == "high":
                qs = qs.annotate(distance=Distance('location', location)) \
                    .order_by('-distance')
            return qs.distinct()
        return qs

    # Get Nearby Places
    @action(detail=False, methods=['post'])
    def nearby_places(self, request):
        lat = request.data.get('latitude')
        lng = request.data.get('longitude')
        location = (lat, lng)
        response = gmaps.places_nearby(
            location=location,
            rank_by="prominence", 
            radius=500
        )
        results = response.get('results')
        places = []
        for result in results:
            photo = get_photo(result)
            place = {
                "place_id": result.get('place_id', None),
                "name": result.get('name', None),
                "location": result.get('geometry', {}).get('location'),
                "opening_hours": result.get('opening_hours', None),
                "price_level": result.get('price_level', None),
                "types": result.get('types', None),
                "rating": result.get('rating', None),
                "user_ratings_total": result.get('user_ratings_total', None),
                "vicinity": result.get('vicinity', None),
                'formatted_phone_number': result.get('formatted_phone_number', None),
                'international_phone_number': result.get('international_phone_number', None),
                'formatted_address': result.get('formatted_address', None),
                'url': result.get('url', None),
                'website': result.get('website', None),
                "photo": photo
            }
            places.append(place)
        return Response({'places': places}, status=rf_status.HTTP_200_OK)

    # Get Textual Search Results
    @action(detail=False, methods=['post'])
    def search_places(self, request):
        lat = request.data.get('latitude')
        lng = request.data.get('longitude')
        search = request.data.get('search')
        location = (lat, lng)
        response = gmaps.places(
            query=search,
            location=location,
            radius=500
        )
        results = response.get('results')
        places = []
        for result in results:
            photo = get_photo(result)
            place = {
                "place_id": result.get('place_id', None),
                "name": result.get('name', None),
                "location": result.get('geometry', {}).get('location'),
                "opening_hours": result.get('opening_hours', None),
                "price_level": result.get('price_level', None),
                "types": result.get('types', None),
                "rating": result.get('rating', None),
                "user_ratings_total": result.get('user_ratings_total', None),
                "vicinity": result.get('vicinity', None),
                'formatted_phone_number': result.get('formatted_phone_number', None),
                'international_phone_number': result.get('international_phone_number', None),
                'formatted_address': result.get('formatted_address', None),
                'url': result.get('url', None),
                'website': result.get('website', None),
                "photo": photo
            }
            places.append(place)
        return Response({'places': places}, status=rf_status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def place_details(self, request):
        place_id = request.data.get('place_id')
        response = gmaps.place(
            place_id
        )
        results = response.get('result')
        photos = get_photos(results)
        location = results.get('geometry', {}).get('location')
        location = Point(location['lat'], location['lng'])
        address_components = results.get('address_components')
        country = None
        state = None
        city = None
        street_number = None
        street_name = None
        postal_code = None
        for address in address_components:
            types = address.get('types')
            if 'country' in types:
                country = address.get('long_name')
            elif 'administrative_area_level_1' in types:
                state = address.get('long_name')
            elif 'administrative_area_level_2' in types:
                city = address.get('long_name')
            elif 'route' in types:
                street_name = address.get('long_name')
            elif 'street_number' in types:
                street_number = address.get('long_name')
            elif 'postal_code' in types:
                postal_code = address.get('long_name')

        return Response(
            {
                'place_id': place_id,
                'name': results.get('name', None),
                'location': location.coords,
                'opening_hours': results.get('opening_hours', None),
                'price_level': results.get('price_level', None),
                'types': results.get('types', None),
                'rating': results.get('rating', None),
                'user_ratings_total': results.get('user_ratings_total', None),
                'vicinity': results.get('vicinity', None),
                'country': country,
                'state': state,
                'city': city,
                'street_name': street_name,
                'street_number': street_number,
                'postal_code': postal_code,
                'formatted_phone_number': results.get('formatted_phone_number', None),
                'international_phone_number': results.get('international_phone_number', None),
                'formatted_address': results.get('formatted_address', None),
                'url': results.get('url', None),
                'website': results.get('website', None),
                'photos': photos
            }
        )


    # Get Textual Search Results
    @action(detail=False, methods=['post'])
    def add_place(self, request):
        serializer = NewPlaceSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            place_id = serializer.validated_data['place_id']
            try:
                place = Place.objects.get(place_id=place_id)
                if serializer.validated_data['category'] == "Bucket List":
                    if BucketList.objects.filter(user=request.user, place=place).exists():
                        return Response({'detail': 'This place is already in your bucket list'},
                                         status=rf_status.HTTP_400_BAD_REQUEST)
                else:
                    if Visited.objects.filter(user=request.user, place=place).exists():
                        return Response({'detail': 'This place is already in your visited locations'},
                                         status=rf_status.HTTP_400_BAD_REQUEST)
            except Place.DoesNotExist:
                response = gmaps.place(
                    place_id
                )
                results = response.get('result')
                photos = get_photos(results)
                location = results.get('geometry', {}).get('location')
                location = Point(location['lat'], location['lng'])
                address_components = results.get('address_components')
                country = None
                state = None
                city = None
                street_number = None
                street_name = None
                postal_code = None
                for address in address_components:
                    types = address.get('types')
                    if 'country' in types:
                        country = address.get('long_name')
                    elif 'administrative_area_level_1' in types:
                        state = address.get('long_name')
                    elif 'administrative_area_level_2' in types:
                        city = address.get('long_name')
                    elif 'route' in types:
                        street_name = address.get('long_name')
                    elif 'street_number' in types:
                        street_number = address.get('long_name')
                    elif 'postal_code' in types:
                        postal_code = address.get('long_name')
                place = Place.objects.create(
                    place_id=place_id,
                    name=results.get('name'),
                    location=location,
                    opening_hours=results.get('opening_hours'),
                    price_level=results.get('price_level'),
                    types=results.get('types'),
                    rating=results.get('rating'),
                    user_ratings_total=results.get('user_ratings_total'),
                    vicinity=results.get('vicinity'),
                    country=country,
                    state=state,
                    city=city,
                    street_name=street_name,
                    street_number=street_number,
                    postal_code=postal_code,
                    formatted_phone_number=results.get('formatted_phone_number', None),
                    international_phone_number=results.get('international_phone_number', None),
                    formatted_address=results.get('formatted_address', None),
                    url=results.get('url', None),
                    website=results.get('website', None),
                )
                for photo in photos:
                    Photo.objects.create(
                        place=place,
                        photo=photo
                    )
            description = serializer.validated_data['description']
            if serializer.validated_data['category'] == "Bucket List":
                status = serializer.validated_data['bucket_list_status']
                BucketList.objects.create(
                    user=request.user,
                    place=place,
                    status=status
                )
                serializer = BucketListSerializer(
                    request.user.bucketlist.all(),
                    many=True,
                    context={'request': request}
                )
                return Response(serializer.data)
            elif serializer.validated_data['category'] == "Visited":
                experience = serializer.validated_data['experience']
                would_return = serializer.validated_data['would_return']
                try:
                    visited_on = serializer.validated_data['visited_on']
                except KeyError:
                    visited_on = None
                Visited.objects.create(
                    user=request.user,
                    place=place,
                    experience=experience,
                    would_return=would_return,
                    visited_on=visited_on,
                    description=description
                )
                serializer = VisitedSerializer(
                    request.user.visited.all(),
                    many=True,
                    context={'request': request}
                )
                return Response(serializer.data)
        return Response(serializer.errors, status=rf_status.HTTP_400_BAD_REQUEST)
