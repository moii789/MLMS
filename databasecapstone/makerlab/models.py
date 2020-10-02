from django.db import models

# Create your models here.

class Inventory(models.Model):
    item_name = models.CharField(max_length = 250)
    quantity = models.IntegerField()

class RegisteredUsers(models.Model):
    #passed in from frontend
    user_id = models.IntegerField() #primary key
    first_name = models.CharField(max_length = 200)
    last_name = models.CharField(max_length = 200)
    date_of_birth = models.DateField()
    email = models.EmailField()
    visitor_type = models.CharField(max_length = 100)
    student_id = models.IntegerField()

class MachinesInUse(models.Model):
    #passed in from frontend
    user = models.ForeignKey('RegisteredUsers', on_delete = models.CASCADE) #foreign key of RegisteredUsers table
    item_id = models.ForeignKey('Inventory', on_delete = models.CASCADE) #foreign key of Inventory table

class EntryExit(models.Model):
    #passed in from frontend
    user = models.ForeignKey('RegisteredUsers', on_delete = models.CASCADE) #foreign key of RegisteredUsers table
    entry_time = models.DateTimeField()
    exit_time = models.DateTimeField()

class Supervisors(models.Model):
    user = models.ForeignKey('RegisteredUsers', on_delete = models.CASCADE) #foreign key of RegisteredUsers table
    access_level = models.CharField(max_length = 200)

