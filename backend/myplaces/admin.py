from django.contrib import admin

from myplaces.models import BucketList, Photo, Place, Visited

# Register your models here.
admin.site.register(Place)
admin.site.register(BucketList)
admin.site.register(Photo)
admin.site.register(Visited)