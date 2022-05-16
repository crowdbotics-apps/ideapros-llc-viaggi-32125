from django_filters import NumberFilter, FilterSet, BooleanFilter, ChoiceFilter, CharFilter

from django.db.models import Q
from django.contrib.auth import get_user_model

from .models import Place


User = get_user_model()


class PlaceFilter(FilterSet):
    types = CharFilter(method='types_filter')
    city = CharFilter(method='city_filter')
    postal_code = CharFilter(method='postal_code_filter')
    country = CharFilter(method='country_filter')
    f_and_f = CharFilter(method='f_and_f_filter')
    experience = CharFilter(method='experience_filter')
    listing = CharFilter(method='listing_filter')

    class Meta:
        model = Place
        fields = ['types', 'city', 'postal_code', 'country',
                  'f_and_f', 'experience', 'listing'
        ]

    def listing_filter(self, queryset, name, value):
        users = self.request.user.following.all()
        if value == 'Visited':
            return queryset.filter(
                Q(users_have_visited__in=users)
            )
        return queryset

    def experience_filter(self, queryset, name, value):
        query = Q()
        for experience in value.split(','):
            query |= (Q(bucketlist__status=experience) |
                      Q(visited__experience=experience))
        return queryset.filter(query)

    def f_and_f_filter(self, queryset, name, value):
        users = []
        if value == "ALL":
            followers = self.request.user.following.values_list('id', flat=True)
            return queryset.filter(
                Q(users_in_bucketlist__id__in=followers) |
                Q(users_have_visited__id__in=followers)
            )
        for user_id in value.split(','):
            users.append(user_id)
        return queryset.filter(
            Q(users_in_bucketlist__in=users) |
            Q(users_have_visited__in=users)
        )

    def types_filter(self, queryset, name, value):
        query = Q()
        for type in value.split(','):
            query |= Q(types__icontains=type)
        return queryset.filter(query)

    def city_filter(self, queryset, name, value):
        query = Q()
        for city in value.split(','):
            query |= Q(city__icontains=city)
        return queryset.filter(query)

    def postal_code_filter(self, queryset, name, value):
        query = Q()
        for postal_code in value.split(','):
            query |= Q(postal_code__icontains=postal_code)
        return queryset.filter(query)

    def country_filter(self, queryset, name, value):
        query = Q()
        for country in value.split(','):
            query |= Q(country__icontains=country)
        return queryset.filter(query)
