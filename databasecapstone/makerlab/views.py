from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
from . models import RegisteredUser, EntryExit, Item

import json
import datetime
import random
import string

existing_qr_codes = []

for userObj in RegisteredUser.objects.raw('SELECT id,user_id FROM makerlab_registereduser'):
    existing_qr_codes.append(userObj.user_id)

currently_logged_in_qr_codes = []
user_entrytime_mapping = {}

# Create your views here.

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def register(request):
    print(request.body)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    user_id = make_qr_code()
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
    return JsonResponse({ 'success': True, 'data': 'Nothing'})

def make_qr_code():
    qr_code = ""
    while len(qr_code) == 0 or qr_code in existing_qr_codes:
        qr_code = get_random_string()

    existing_qr_codes.append(qr_code)
    return qr_code

def get_random_string():
    letters = string.ascii_letters
    str = ''.join(random.choice(letters) for i in range(10))
    return str

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
            user = get_current_user(incoming_qr_code)
            new_entry_exit = EntryExit.objects.create(user = user, entry_time = user_entrytime_mapping[incoming_qr_code], exit_time = exit_time)
            new_entry_exit.save()
            del user_entrytime_mapping[incoming_qr_code]
            print("exiting")
            return JsonResponse({'success': True, 'data': 'Nothing', 'message': 'user logging out'})


def get_current_user(incoming_qr_code):
    for userObj in RegisteredUser.objects.raw('SELECT id,user_id FROM makerlab_registereduser'):
        if userObj.user_id == incoming_qr_code:
            return userObj
    return None

def grab_items():
    curr_items = []
    for i in Item.objects.raw('SELECT id, item_name FROM makerlab_item'):
        curr_items.append(i.item_name)
    return curr_items

@csrf_exempt
def handle_items(request):

    if request.method == 'GET':
        print(grab_items())
        return JsonResponse({'success': True, 'data': grab_items(), 'message': 'user logging out'})

    else:
        print(request)
        #body_unicode = request.body.decode('utf-8')
        #body = json.loads(body_unicode)

        #user_id = body["id"]
        #expecting user_id i.e. qr_code
        #expecting item_id??? just make item_name the pk
         #for each item, make a record of qr_code + item_name combo
        return JsonResponse({'success': True, 'data': 'Nothing', 'message': 'machine records saved'})