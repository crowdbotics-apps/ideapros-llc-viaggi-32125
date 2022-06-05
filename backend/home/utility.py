from django.core.mail import EmailMessage
from rest_framework.authtoken.models import Token

from ideapros_llc_viaggi_32125.settings import FCM_SERVER_KEY, PLACES_API_KEY
from notifications.models import Notification

import pyotp
import requests
from requests.structures import CaseInsensitiveDict


url = "https://fcm.googleapis.com/fcm/send"

headers = CaseInsensitiveDict()
headers["Accept"] = "application/json"
headers["Authorization"] = "key={}".format(FCM_SERVER_KEY)
headers["Content-Type"] = "application/json"


def send_notification(user, title, content, data=None, data_type=None):
    notif = Notification.objects.create(
            user=user,
            title=title,
            content=content,
            data=data,
            data_type=data_type
    )
    notif_id = str(notif)
    if user.registration_id:
        if data is None:
            payload = {
                    'to': user.registration_id,
                    'notification': {
                        "title": title,
                        "text": content
                    },
                    'data': {
                        "notif_id": notif_id,
                    }
                }
        elif data and data_type:
            data = str(data)
            data_type = str(data_type)
            payload = {
                    'to': user.registration_id,
                    'notification': {
                        "title": title,
                        "text": content
                    },
                    'data': {
                        "type": data_type,
                        "redirect_user_id": data,
                        "notif_id": notif_id,
                    }
                }
        resp = requests.post(url, headers=headers, json=payload)


def generateOTP(email=None, user=None):
    if email and user:
        secret = pyotp.random_base32()
        totp = pyotp.TOTP(secret)
        otp = totp.now()
        user.activation_key = secret
        user.otp = otp
        user.save()
        sliced_otp = str(otp)[:4]
        email = EmailMessage('OTP Verification', 'Your OTP is {}'.format(sliced_otp), from_email='sallar.rezaie@crowdbotics.com', to=[email])
        email.send()
        return user

def verifyOTP(otp=None, activation_key=None, user=None):
    if otp and activation_key and user:
        totp = pyotp.TOTP(activation_key)
        sliced_otp = user.otp[:4]
        if otp == sliced_otp:
            return totp.verify(user.otp, valid_window=6)
        return False
    else:
        return False

def send_otp(user):
    email = user.email
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret)
    otp = totp.now()
    user.activation_key = secret
    user.otp = otp
    user.save()
    sliced_otp = str(otp)[:4]
    email_body = """\
            <html>
            <head></head>
            <body>
            <p>
            Hi,<br>
            Your OTP is %s<br>
            Regards,<br>
            Team Viaggio
            </p>
            </body>
            </html>
            """ % (sliced_otp)
    email_msg = EmailMessage("Password Reset - Viaggio", email_body, from_email='sallar.rezaie@crowdbotics.com', to=[email])
    email_msg.content_subtype = "html"
    email_msg.send()

def auth_token(user):
    token, created = Token.objects.get_or_create(user=user)
    return token

def get_photo(result):
    try:
        reference = result["photos"][0]["photo_reference"]
        width = result["photos"][0]["width"]
    except KeyError:
        photo_response=None
    else:
        url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth={}&photo_reference={}&key={}" \
            .format(width, reference, PLACES_API_KEY)
        retrieved_image_header = requests.head(url)
        try:
            photo_response = retrieved_image_header.headers['location']
        except Exception as e:
            photo_response = None
    return photo_response


def get_photos(result):
    photos = result["photos"]
    photo_response = []
    for photo in photos:
        try:
            reference = photo["photo_reference"]
            width = photo["width"]
        except KeyError:
            pass
        else:
            url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth={}&photo_reference={}&key={}" \
                .format(width, reference, PLACES_API_KEY)
            retrieved_image_header = requests.head(url)
            try:
                photo_response.append(retrieved_image_header.headers['location'])
            except Exception as e:
                pass
    return photo_response
