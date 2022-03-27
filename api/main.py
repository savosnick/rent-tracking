# from crypt import methods
import os
from dotenv import load_dotenv
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from mongo_client import mongo_client

# from dataclasses import dataclass
tracked_houses = mongo_client.rentals
houses_collection = tracked_houses.houses

load_dotenv(dotenv_path="./.env.local")

RAPID_API_KEY = os.environ.get("RAPID_API_KEY", default="")
PROPERTY_EXTENDED_URL = "https://zillow-com1.p.rapidapi.com/propertyExtendedSearch"
INDIVIDUAL_PROPERTY_URL = "https://zillow-com1.p.rapidapi.com/property"

if not RAPID_API_KEY:
    raise EnvironmentError(
        "Please create .env local file and insert the RAPID_API_KEY in that file"
    )

app = Flask(__name__)
CORS(app)


@app.route("/new-results")
def new_results():
    parameters = request.args
    # querystring={"location":"folsom, ca","status_type":"ForRent","home_type":"Houses"}
    headers = {
        "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
        "x-rapidapi-key": RAPID_API_KEY,
    }
    response = requests.request(
        "GET", PROPERTY_EXTENDED_URL, headers=headers, params=parameters
    )

    data = response.json()
    houses_for_rent = {}
    for house in data["props"]:
        houses_for_rent[house["zpid"]] = {
            "zpid": house["zpid"],
            "address": house["address"],
            "image": house["imgSrc"],
            "longitude": house["longitude"],
            "latitude": house["latitude"],
            "price": house["price"],
            "size": house["livingArea"],
            "has_image": house["hasImage"],
        }
    return houses_for_rent


@app.route("/tracked", methods=["GET", "POST"])
def tracked():
    if request.method == "GET":
        # read images from the database
        houses = houses_collection.find({})
        # return "This is working"
        # return str(houses_collection.count_documents({}) + 8)
        return jsonify([house for house in houses])

    if request.method == "POST":
        # save image in the database
        house = request.get_json()
        # to avoid issue with MongoDB auto creating of _id not being jsonifiable
        house["_id"] = house.get("zpid")
        result = houses_collection.insert_one(house)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
