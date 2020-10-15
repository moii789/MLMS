from . models import RegisteredUser, EntryExit, Item, InUseItem, Supervisor
import random
import string
import qrcode
import jwt, json
from django.db import connection
from django.core.mail import EmailMessage
from email.mime.image import MIMEImage

existing_qr_codes = []

def get_random_string():
    letters = string.ascii_letters
    str = ''.join(random.choice(letters) for i in range(5))
    return str

def make_qr_code():
    qr_code = ""
    while len(qr_code) == 0 or qr_code in existing_qr_codes:
        qr_code = get_random_string()

    existing_qr_codes.append(qr_code)
    return qr_code

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

def getItem(item_name):
    for item in Item.objects.raw('SELECT id,item_name FROM makerlab_item'):
        if item.item_name == item_name:
            return item
    return None

def getEntryExit(time_used_id):
    for entryexit_obj in EntryExit.objects.raw('SELECT id FROM makerlab_entryexit'):
        if entryexit_obj.id == time_used_id:
            return entryexit_obj
    return None

def email_preexist(registering_email):
    for user in RegisteredUser.objects.raw('SELECT id,email FROM makerlab_registereduser'):
        if user.email == registering_email:
            return True
    return False

def send_qr_email(unique_identifier, email_address):
    """ Enter the chosen unique id to be encoded as unique_identifier and query the members table to get the
    email address of that record """
    print('trying to email qr')
    code = qrcode.make(unique_identifier)
    code.save('makerlab/temp/temp_code.png', 'PNG')
    msg: EmailMessage = EmailMessage(subject='Welcome to MakerLab at CELEB',
                                     body='This is an automated email. The QR code can be used check in/out rapidly '
                                          'at the Makerlab. Your unique ''identifier is: ' + str(unique_identifier),

                                     from_email='makerlab@beloit.edu', to=[email_address])
    code = open(r'makerlab/temp/temp_code.png', 'rb')
    msg.attach(MIMEImage(code.read()))
    msg.send(fail_silently=False)

def validateUsernamePass(username,password):
    print(username)
    for ursObj in Supervisor.objects.raw('SELECT * FROM makerlab_supervisor'):
        if ursObj.first_name==username:
            return True
    return False

def createToken(data):
    if validateUsernamePass(data['username'],data['password']):
        return jwt.encode(data,'secret', algorithm='HS256').decode('utf-8')
    return False

def validateToken(token):
    try:
        data=jwt.decode(token,'secret', algorithm='HS256')
    except:
        return False
    return validateUsernamePass(data['username'],data['password'])

def completeQuery(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        row=cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        return ([columns]+row)