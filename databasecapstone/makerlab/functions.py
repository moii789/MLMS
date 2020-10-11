from . models import RegisteredUser, EntryExit, Item, InUseMachine
import random
import string

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

def email_preexist(registering_email):
    for user in RegisteredUser.objects.raw('SELECT id,email FROM makerlab_registereduser'):
        if user.email == registering_email:
            return True
    return False