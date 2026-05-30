
import requests
import time
import aux
import json


URL = "http://192.168.1.167:8080/index.php"


while True:

    request_data = {"type": "agent", "data": aux.getSystemLevelData()}
    response = requests.post(URL, json=request_data)
        
    # Verifica se a requisição teve sucesso (status 200-299)
    if response.status_code == 200:
        print(f"Sucesso [{response.status_code}]: {response.text}")
    else:
        print(f"Erro no Servidor [{response.status_code}]: {response.text}")

    time.sleep(10)




