# Generated by Django 3.1.1 on 2020-10-11 19:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('makerlab', '0009_vendor_warranty'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vendor',
            name='warranty',
        ),
    ]
