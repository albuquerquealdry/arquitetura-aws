import json
import secrets
import string

def lambda_handler(event, context):
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(20)) 
    return {
        'statusCode': 200,
        'body': json.dumps(password)
    }