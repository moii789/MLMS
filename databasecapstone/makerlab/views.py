from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from . models import RegisteredUser, EntryExit, Item, InUseItem, SavedQuery
from . import functions as functions

import jwt
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

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    user_id = functions.make_qr_code()
    existing_qr_codes.append(user_id)
    first_name = body["firstName"]
    last_name = body["lastName"]
    date_of_birth = body["DateOfBirth"]
    email = body["email"]

    if functions.email_preexist(email) == True:
        return JsonResponse({'status': False, 'message': 'user already registered'}, status=401)

    visitor_type = body["VisitorType"]
    student_id = -1

    if visitor_type == "student":
        student_id = body["StudentID"]

    new_user = RegisteredUser.objects.create(user_id = user_id, first_name = first_name, last_name = last_name, date_of_birth = date_of_birth, email = email, visitor_type = visitor_type, student_id = student_id)
    new_user.save()
    functions.send_qr_email(user_id, email)
    return JsonResponse({ 'success': True, 'data': 'Nothing'})


@csrf_exempt
def login(request):

    incoming_qr_code = request.GET.get("id")
    if incoming_qr_code not in existing_qr_codes:
        return JsonResponse({ 'status': False, 'message' : 'user not registered'}, status = 401)

    else:

        if incoming_qr_code not in currently_logged_in_qr_codes:
            #entering makerlab

            entry_time = datetime.datetime.now()
            user_entrytime_mapping[incoming_qr_code] = entry_time
            currently_logged_in_qr_codes.append(incoming_qr_code)
            return JsonResponse({'success': True, 'data': 'Nothing', 'message': 'logged in'})

        else:
            #exiting makerlab

            exit_time = datetime.datetime.now()
            currently_logged_in_qr_codes.remove(incoming_qr_code)
            user = functions.get_current_user(incoming_qr_code)
            new_entry_exit = EntryExit.objects.create(user = user, entry_time = user_entrytime_mapping[incoming_qr_code], exit_time = exit_time)
            new_entry_exit.save()
            del user_entrytime_mapping[incoming_qr_code]
            return JsonResponse({'success': True, 'id': incoming_qr_code, 'message': 'logging out'})

@csrf_exempt
def handle_items(request):

    if request.method == 'GET':
        return JsonResponse({'success': True, 'items': functions.grab_items(), 'message': 'send items'})

    else:

        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        user_id = functions.get_current_user(body["id"])
        items_chosen = body["items"]
        time_used_id = None

        for entryexitObj in EntryExit.objects.raw('SELECT id,user FROM makerlab_entryexit'):
            if entryexitObj.user == user_id:
                time_used_id = entryexitObj.id
                print(time_used_id)

        entryexitObj = functions.getEntryExit(time_used_id)
        print(entryexitObj)

        for c_item in items_chosen:
            item = functions.getItem(c_item)
            new_in_use_machine = InUseItem.objects.create(user=user_id, item = item, time_used_id = entryexitObj)
            new_in_use_machine.save()

        return JsonResponse({'success': True, 'data': 'Nothing', 'message': 'machine records saved'})

@csrf_exempt
def gettoken(request):
    data=json.loads(request.body.decode('utf-8'))
    token=functions.createToken(data)
    if token==False:
        return JsonResponse({},status = 401)
    return JsonResponse({'token':str(token)})

@csrf_exempt
def getsavedqueries(request):
    token=request.GET.get("token")
    if not functions.validateToken(token):
        return JsonResponse({},status=401)
    queries=[]
    for query in SavedQuery.objects.all():
        queries.append({'query_name':query.query_name,'query_sql':query.query_sql})
    return JsonResponse({'queries':queries})

@csrf_exempt
def query(request):
    token=request.GET.get("token")
    if not functions.validateToken(token):
        return JsonResponse({},status=401)
    sql=request.GET.get("sql")
    query_results=functions.completeQuery(sql)
    return JsonResponse({'result':query_results})

@csrf_exempt
def savequery(request):
    data=json.loads(request.body.decode('utf-8'))
    if not functions.validateToken(data['token']):
        return JsonResponse({},status=401)
    data=data['query']
    new_entry=SavedQuery.objects.create(query_name=data['query_name'],query_sql=data['query_sql'])
    new_entry.save()
    return JsonResponse({},status=200)