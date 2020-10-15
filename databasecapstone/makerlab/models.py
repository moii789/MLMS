from django.db import models

# Create your models here.

class Item(models.Model):
    item_name = models.CharField(max_length = 250, unique = True)
    quantity = models.IntegerField()
    vendor = models.ForeignKey('Vendor', on_delete = models.CASCADE, to_field = "vendor_name")
    warranty = models.IntegerField()

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

class InUseItem(models.Model):
    #passed in from frontend
    user = models.ForeignKey('RegisteredUser', on_delete = models.CASCADE, to_field = "user_id") #foreign key of RegisteredUsers table
    item = models.ForeignKey('Item', on_delete = models.CASCADE, to_field = "id") #foreign key of Inventory table
    time_used_id = models.ForeignKey('EntryExit', on_delete = models.CASCADE, to_field = "id")


class EntryExit(models.Model):
    #passed in from frontend
    user = models.ForeignKey('RegisteredUser', on_delete = models.CASCADE, to_field = "user_id") #foreign key of RegisteredUsers table
    entry_time = models.DateTimeField()
    exit_time = models.DateTimeField()

    def __str__(self):
        return str(self.id)

class Supervisor(models.Model):
    #admin entry
    user = models.ForeignKey('RegisteredUser', on_delete = models.CASCADE, to_field = "user_id") #foreign key of RegisteredUsers table
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    access_level = models.CharField(max_length = 200)

class Vendor(models.Model):
    #admin entry
    vendor_name = models.CharField(max_length=200, unique = True)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    zip = models.CharField(max_length=200)

    def __str__(self):
        return self.vendor_name

class SavedQuery(models.Model):
    query_name=models.CharField(max_length=200,unique=True)
    query_sql=models.TextField(unique=True)
