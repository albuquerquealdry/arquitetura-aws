
import json
import boto3
def lambda_handler(event, context):
    client = boto3.client('sns')
    if event["requestContext"]["http"]["method"] == "POST":
        body = event["body"]
        return {
            'statusCode': 200,
            'body': body
        }
        
        response = client.publish(TopicArn='arn:aws:sns:us-east-1:523616670904:BuyOrder',Message="Test message")
        print("Message published")
    else:
        return ("Date provided can't be in the past")
