from django.forms import ValidationError
from rest_framework import serializers

from home.constants import BUCKETLIST_TYPES, EXPERIENCE_TYPES, STATUS_TYPES

from .models import BucketList, Place, Visited

from users.models import User
from users.serializers import ProfileSerializer


class NestedVisitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visited
        fields = '__all__'


class NestedBucketlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketList
        fields = '__all__'


class PlaceSerializer(serializers.ModelSerializer):
    """
    A data representation of the place data returned
    by the Google Places API
    """

    class Meta:
        model = Place
        fields = '__all__'

    def to_representation(self, instance):
        # request_user =  self.context['request'].user
        rep = super().to_representation(instance)
        users_have_visited = rep.pop('users_have_visited', None)
        visited_users = []
        if users_have_visited is not None:
            for user in users_have_visited:
                # Removed as they should be able to see everyone's tags?
                # if user in request_user.following.values_list('id', flat=True):
                visited = Visited.objects.get(
                    user__id=user,
                    place=instance
                )
                visited_users.append(NestedVisitedSerializer(visited).data)
        rep['users_have_visited'] = visited_users
        users_in_bucketlist = rep.pop('users_in_bucketlist', None)
        bucketlist_users = []
        if users_in_bucketlist is not None:
            for user in users_in_bucketlist:
                # if user in request_user.following.values_list('id', flat=True):
                bucketlist = BucketList.objects.get(
                    user__id=user,
                    place=instance
                )
                bucketlist_users.append(NestedBucketlistSerializer(bucketlist).data)
        rep['users_in_bucketlist'] = bucketlist_users
        return rep
                

class BucketListSerializer(serializers.ModelSerializer):
    """
    A data representation of a bucketlist location
    """
    place = PlaceSerializer(required=False)

    class Meta:
        model = BucketList
        fields = '__all__'


class VisitedSerializer(serializers.ModelSerializer):
    """
    A data representation of visited location
    """
    place = PlaceSerializer(required=False)

    class Meta:
        model = Visited
        fields = '__all__'


class FollowerSerializer(serializers.ModelSerializer):
    """
    A data representation of a Follower Profile
    """
    profile = ProfileSerializer(required=False)
    bucketlist = BucketListSerializer(many=True)
    visited = VisitedSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'name', 'profile', 'bucketlist', 'visited')


class NewPlaceSerializer(serializers.Serializer):
    """
    A data representation of the required information
    to add a place to one of the User lists
    """
    place_id = serializers.CharField(
        max_length=255
    )
    category = serializers.ChoiceField(
        choices=STATUS_TYPES,
    )
    experience = serializers.ChoiceField(
        choices=EXPERIENCE_TYPES,
        required=False
    )
    bucket_list_status = serializers.ChoiceField(
        choices=BUCKETLIST_TYPES,
        required=False
    )
    visited_on = serializers.DateField(
        required=False
    )
    would_return = serializers.BooleanField(
        required=False
    )
    description = serializers.CharField(
        max_length=255
    )
