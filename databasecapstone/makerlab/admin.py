from django.contrib import admin
from .models import Item, RegisteredUser, InUseMachine, EntryExit, Supervisor, Vendor, SavedQuery

# Register your models here.
class ItemAdmin(admin.ModelAdmin):
    list_display= ('item_name', 'quantity', 'vendor_name', 'warranty')

class RegisteredUserAdmin(admin.ModelAdmin):
    list_display= ('user_id', 'first_name', 'last_name', 'date_of_birth', 'email','visitor_type','student_id')

class InUseMachineAdmin(admin.ModelAdmin):
    list_display= ('user', 'item_id', 'time_used_id')

class EntryExitAdmin(admin.ModelAdmin):
    list_display= ('user', 'entry_time', 'exit_time')

class SupervisorAdmin(admin.ModelAdmin):
    list_display= ('user', 'access_level')

class VendorAdmin(admin.ModelAdmin):
    list_display= ('vendor_name', 'city', 'state', 'zip')

class SavedQueryAdmin(admin.ModelAdmin):
    list_display= ('query_name','query_sql')

admin.site.register(Item,ItemAdmin)
admin.site.register(RegisteredUser,RegisteredUserAdmin)
admin.site.register(InUseMachine,InUseMachineAdmin)
admin.site.register(EntryExit,EntryExitAdmin)
admin.site.register(Supervisor,SupervisorAdmin)
admin.site.register(Vendor,VendorAdmin)
admin.site.register(SavedQuery,SavedQueryAdmin)