from django.contrib.auth import get_user_model, authenticate

from rest_framework import serializers
from allauth.account.models import EmailAddress

from users.models import Profile, User
from home.utility import verifyOTP





class ProfileSerializer(serializers.ModelSerializer):
    """
    A data representation of the User model's Profile
    """
    class Meta:
        model = Profile
        exclude = ('user',)


class UserSerializer(serializers.ModelSerializer):
    """
    Custom serializer for creating a User
    """
    profile = ProfileSerializer(required=False)
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'name', 'email', 'password', 'location', 'profile',
                  'is_following')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5},
                        'email': {'required': True},
                        'name': {'required': True},
                        }

    def get_is_following(self, obj):
        user =  self.context['request'].user
        if obj in user.following.all():
            return True
        return False

    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data.get('email')
        validated_data['username'] = email
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        email_address, created = EmailAddress.objects.get_or_create(user=user, email=user.email, verified=True, primary=True)
        Profile.objects.create(user=user)
        return user

    def update(self, instance, validated_data):
        if 'profile' in validated_data:
            nested_serializer = self.fields['profile']
            nested_instance = instance.profile
            nested_data = validated_data.pop('profile')
            nested_serializer.update(nested_instance, nested_data)
        return super(UserSerializer, self).update(instance, validated_data)


class OTPSerializer(serializers.Serializer):
    """
    Custom serializer to verify an OTP and Activate a User
    """
    otp = serializers.CharField(max_length=4, required=True)
    email = serializers.CharField(required=True)

    def validate(self, attrs):
        email = attrs.get('email')
        otp = attrs.get('otp')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({'detail': 'Invalid Email'})
        else:
            if verifyOTP(otp=otp, activation_key=user.activation_key, user=user):
                user.is_active = True
                user.activation_key = ''
                user.otp = ''
                user.save()
                attrs['user'] = user
                return attrs
            else:
                raise serializers.ValidationError({'detail': 'Invalid or Expired OTP, please try again'})


class ChangePasswordSerializer(serializers.Serializer):
    """
    Custom serializer used to set the password for a User
    """
    password_1 = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    password_2 = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    def validate(self, attrs):
        pass1 = attrs.get('password_1')
        pass2 = attrs.get('password_2')
        if pass1 != pass2:
            raise serializers.ValidationError({'detail': 'Passwords do not match'})
        return super().validate(attrs)


class CustomAuthTokenSerializer(serializers.Serializer):
    """
    Serializer for returning an authenticated User and Token
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False, required=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            email=email,
            password=password
        )
        if not user:
            raise serializers.ValidationError({'detail': 'Unable to authenticate with provided credentials'})
        attrs['user'] = user
        return attrs
