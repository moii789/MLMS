from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
from . models import RegisteredUser, EntryExit, Item, InUseMachine
from . import functions as functions

import json
import datetime

existing_qr_codes = []
currently_logged_in_qr_codes = []
user_entrytime_mapping = {}

for userObj in RegisteredUser.objects.raw('SELECT id,user_id FROM makerlab_registereduser'):
    existing_qr_codes.append(userObj.user_id)

# Create your views here.

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def register(request):
    print(request.body)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    user_id = functions.make_qr_code()
    first_name = body["firstName"]
    last_name = body["lastName"]
    date_of_birth = body["DateOfBirth"]
    email = body["email"]
    visitor_type = body["VisitorType"]
    student_id = -1

    if visitor_type == "student":
        student_id = body["StudentID"]

    new_user = RegisteredUser.objects.create(user_id = user_id, first_name = first_name, last_name = last_name, date_of_birth = date_of_birth, email = email, visitor_type = visitor_type, student_id = student_id )
    new_user.save()
    functions.send_qr_email(user_id, email)
    return JsonResponse({ 'success': True, 'data': 'Nothing'})


@csrf_exempt
def login(request):

    incoming_qr_code = request.GET.get("id")
    print(existing_qr_codes)
    if incoming_qr_code not in existing_qr_codes:
        return JsonResponse({ 'success': False, 'data': 'Nothing', 'message' : 'user not registered'})

    else:

        if incoming_qr_code not in currently_logged_in_qr_codes:#entering makerlab

            entry_time = datetime.datetime.utcnow()
            user_entrytime_mapping[incoming_qr_code] = entry_time
            currently_logged_in_qr_codes.append(incoming_qr_code)
            print("entering")
            return JsonResponse({'success': True, 'data': 'Nothing', 'message': 'user logged in'})

        else: #exiting makerlab

            exit_time = datetime.datetime.utcnow()
            currently_logged_in_qr_codes.remove(incoming_qr_code)
            user = functions.get_current_user(incoming_qr_code)
            new_entry_exit = EntryExit.objects.create(user = user, entry_time = user_entrytime_mapping[incoming_qr_code], exit_time = exit_time)
            new_entry_exit.save()
            del user_entrytime_mapping[incoming_qr_code]
            print("exiting")
            return JsonResponse({'success': True, 'id': incoming_qr_code, 'message': 'logging out'})

@csrf_exempt
def handle_items(request):
    print("going here")
    if request.method == 'GET':
        print("going here1")
        print(functions.grab_items())
        return JsonResponse({'success': True, 'items': functions.grab_items(), 'message': 'user logging out'})

    else:
        print("going here2")
        print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        user = functions.get_current_user(body["id"])
        items_chosen = body["items"]
        print(items_chosen)
        for c_item in items_chosen:
            item = functions.getItem(c_item)
            new_in_use_machine = InUseMachine.objects.create(user=user, item = item)
            new_in_use_machine.save()
        return JsonResponse({'success': True, 'data': 'Nothing', 'message': 'machine records saved'})



