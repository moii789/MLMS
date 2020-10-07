from django.contrib import admin
from .models import Item
from .models import RegisteredUser
from .models import InUseMachine
from .models import EntryExit
from .models import Supervisor

# Register your models here.
class ItemAdmin(admin.ModelAdmin):
    list_display= ('item_name', 'quantity')

class RegisteredUserAdmin(admin.ModelAdmin):
    list_display= ('user_id', 'first_name', 'last_name', 'date_of_birth', 'email','visitor_type','student_id')

class InUseMachineAdmin(admin.ModelAdmin):
    list_display= ('user', 'item_id')

class EntryExitAdmin(admin.ModelAdmin):
    list_display= ('user', 'entry_time', 'exit_time')

class SupervisorAdmin(admin.ModelAdmin):
    list_display= ('user', 'access_level')

admin.site.register(Item,ItemAdmin)
admin.site.register(RegisteredUser,RegisteredUserAdmin)
admin.site.register(InUseMachine,InUseMachineAdmin)
admin.site.register(EntryExit,EntryExitAdmin)
admin.site.register(Supervisor,SupervisorAdmin)
