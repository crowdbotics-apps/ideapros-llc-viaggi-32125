from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
)
from myplaces.views import FollowerViewSet, PlacesViewSet
from users.viewsets import UserViewSet

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("users", UserViewSet, basename="users")
router.register("places", PlacesViewSet, basename="places")
router.register("followers", FollowerViewSet, basename="followers")

urlpatterns = [
    path("", include(router.urls)),
]
