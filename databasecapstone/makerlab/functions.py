from . models import RegisteredUser, EntryExit, Item, InUseMachine
import random
import string

existing_qr_codes = []


def get_random_string():
    letters = string.ascii_letters
    str = ''.join(random.choice(letters) for i in range(10))
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

def send_qr_email(unique_identifier, email_address):
    """ Enter the chosen unique id to be encoded as unique_identifier and query the members table to get the
    email address of that record """
    code = qrcode.make(unique_identifier)
    code.save('makerlab/temp/temp_code.png', 'PNG')
    msg: EmailMessage = EmailMessage(subject='Welcome to MakerLab at CELEB',
                                     body='This is an automated email. The QR code can be used check in/out rapidly '
                                          'at the Makerlab. Your unique ''identifier is: ' + str(unique_identifier),

                                     from_email='makerlab@beloit.edu', to=[email_address])
    code = open(r'makerlab/temp/temp_code.png', 'rb')
    msg.attach(MIMEImage(code.read()))
    msg.send(fail_silently=False)
