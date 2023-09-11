import json

def lambda_handler(event, context):
    try:
        # Parse o corpo JSON do evento
        request_body = json.loads(event['body'])

        # Realize o processamento desejado com os dados JSON
        resultado = f"Olá, {request_body['nome']}! Seu ID é: {request_body['id']}"

        # Retorne uma resposta com o resultado
        response = {
            "statusCode": 200,
            "body": json.dumps({"message": resultado})
        }

        return response
    except Exception as e:
        print(f"Erro ao processar o evento: {str(e)}")

        # Em caso de erro, retorne uma resposta de erro
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": "Erro interno do servidor"})
        }

        return response
