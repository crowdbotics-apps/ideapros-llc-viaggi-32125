from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from allauth.account.models import EmailAddress
from django_filters.rest_framework import DjangoFilterBackend
from ideapros_llc_viaggi_32125.settings import SECRET_KEY

from users.models import User
from users.authentication import ExpiringTokenAuthentication
from home.permissions import IsPostOrIsAuthenticated

from home.utility import auth_token, send_otp
from users.serializers import ChangePasswordSerializer, CustomAuthTokenSerializer, OTPSerializer, UserSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsPostOrIsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = User.objects.all()

    # Create User and return Token + Profile
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED, headers=headers) 

    # Update Profile
    def partial_update(self, request, *args, **kwargs):
        partial = True
        instance = request.user
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Send a OTP
    @action(detail=False, methods=['post'])
    def otp(self, request):
        try:
            email = request.data.get('email')
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            return Response({"detail": "Invalid Email - Does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        send_otp(user)
        return Response(status=status.HTTP_200_OK)

    # Verify OTP
    @action(detail=False, methods=['post'])
    def verify(self, request):
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = auth_token(user)
            serializer = UserSerializer(user, context={'request': request})
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Set password
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def password(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['password_1'])
            user.save()
            return Response({'detail': "Password Updated Successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Login a User
    @action(detail=False, methods=['post'])
    def login(self, request, **kwargs):
        serializer = CustomAuthTokenSerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = auth_token(user)
            serializer = UserSerializer(user, context = {'request':request})
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Logout a Client
    @action(detail=False, methods=['get'])
    def logout(self, request):
        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            return Response({'detail': 'Authentication Token Missing or Invalid'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_200_OK)

    # Follow a FF
    @action(detail=False, methods=['post'])
    def follow(self, request):
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid User ID'}, status=status.HTTP_400_BAD_REQUEST)
        request.user.following.add(user)
        serializer = UserSerializer(
                     request.user.following.all(),
                     many=True,
                     ontext={'request': request})
        return Response(serializer.data)

    # Unfollow a FF
    @action(detail=False, methods=['post'])
    def unfollow(self, request):
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid User ID'}, status=status.HTTP_400_BAD_REQUEST)
        request.user.following.remove(user)
        serializer = UserSerializer(
                        request.user.following.all(),
                        many=True,
                        context={'request': request})
        return Response(serializer.data)

    # Following List
    @action(detail=False, methods=['get'])
    def following(self, request):
        serializer = UserSerializer(
                        request.user.following.all(),
                        many=True,
                        context={'request': request})
        return Response(serializer.data)

    # Admin a User
    @action(detail=False, methods=['post'])
    def admin(self, request):
        email = request.data.get('email')
        key = request.data.get('key')
        password = request.data.get('password', None)
        if key != SECRET_KEY:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
            user.is_staff = True
            user.is_superuser = True
            user.save()
        except User.DoesNotExist:
            user = User.objects.create_superuser(email, email, password)
        email_address, created = EmailAddress.objects.get_or_create(user=user, email=user.email, verified=True, primary=True)
        return Response(status=status.HTTP_200_OK)
