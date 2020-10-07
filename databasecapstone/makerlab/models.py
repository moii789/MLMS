from django.db import models

# Create your models here.



class Item(models.Model):
    item_name = models.CharField(max_length = 250)
    quantity = models.IntegerField()


class RegisteredUser(models.Model):
    #passed in from frontend
    user_id = models.CharField(max_length = 250, unique = True) #primary key
    first_name = models.CharField(max_length = 200)
    last_name = models.CharField(max_length = 200)
    date_of_birth = models.DateField()
    email = models.EmailField()
    visitor_type = models.CharField(max_length = 100)
    student_id = models.IntegerField()

    def __str__(self):
        return self.user_id

class InUseMachine(models.Model):
    #passed in from frontend
    user = models.ForeignKey('RegisteredUser', on_delete = models.CASCADE, to_field = "user_id") #foreign key of RegisteredUsers table
    item = models.ForeignKey('Item', on_delete = models.CASCADE) #foreign key of Inventory table

class EntryExit(models.Model):
    #passed in from frontend
    user = models.ForeignKey('RegisteredUser', on_delete = models.CASCADE, to_field = "user_id") #foreign key of RegisteredUsers table
    entry_time = models.DateTimeField()
    exit_time = models.DateTimeField()

class Supervisor(models.Model):
    user = models.ForeignKey('RegisteredUser', on_delete = models.CASCADE, to_field = "user_id") #foreign key of RegisteredUsers table
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    access_level = models.CharField(max_length = 200)

