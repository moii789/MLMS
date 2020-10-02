from django.contrib import admin
from .models import Inventory
from .models import RegisteredUsers
from .models import MachinesInUse
from .models import EntryExit
from .models import Supervisors

# Register your models here.
class InventoryAdmin(admin.ModelAdmin):
    list_display= ('item_name', 'quantity')

class RegisteredUsersyAdmin(admin.ModelAdmin):
    list_display= ('user_id', 'first_name', 'last_name', 'date_of_birth', 'email','visitor_type','student_id')

class MachinesInUseAdmin(admin.ModelAdmin):
    list_display= ('user', 'item_id')

class EntryExitAdmin(admin.ModelAdmin):
    list_display= ('user', 'entry_time', 'exit_time')

class SupervisorsAdmin(admin.ModelAdmin):
    list_display= ('user', 'access_level')

admin.site.register(Inventory,InventoryAdmin)
admin.site.register(RegisteredUsers,RegisteredUsersyAdmin)
admin.site.register(MachinesInUse,MachinesInUseAdmin)
admin.site.register(EntryExit,EntryExitAdmin)
admin.site.register(Supervisors,SupervisorsAdmin)
