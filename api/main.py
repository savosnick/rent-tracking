# from crypt import methods
from dataclasses import dataclass
import os
from dotenv import load_dotenv
import requests
from flask import Flask, request, jsonify
# from flask_cors import CORS
# from mongo_client import mongo_client

load_dotenv(dotenv_path="./.env.local")

RAPID_API_KEY = os.environ.get("RAPID_API_KEY", default="")
PROPERTY_EXTENDED_URL = 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch'
INDIVIDUAL_PROPERTY_URL = 'https://zillow-com1.p.rapidapi.com/property'

if not RAPID_API_KEY:
    raise EnvironmentError(
        "Please create .env local file and insert the RAPID_API_KEY in that file"
    )

app = Flask(__name__)

@app.route("/new-results")
def new_results():
    parameters = request.args
    # querystring = {"location":"folsom, ca","status_type":"ForRent","home_type":"Houses"}
    headers = {
    'x-rapidapi-host': "zillow-com1.p.rapidapi.com",
    'x-rapidapi-key': RAPID_API_KEY
    }
    response = requests.request("GET", PROPERTY_EXTENDED_URL, headers=headers, params=parameters)

    data = response.json()
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)