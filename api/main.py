# from crypt import methods
from datetime import datetime
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
            "bedrooms": house["bedrooms"],
            "bathrooms": house["bathrooms"],
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


@app.route("/tracked/<house_zpid>")
def house_info(house_zpid):
    querystring = {}
    querystring["zpid"] = str(house_zpid)
    print(querystring)
    headers = {
        "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
        "X-RapidAPI-Key": RAPID_API_KEY,
    }

    response = requests.request(
        "GET", INDIVIDUAL_PROPERTY_URL, headers=headers, params=querystring
    )

    data = response.json()
    house_details = {}
    house_details["date_rented"] = "Still on market"
    if data["homeStatus"] == "FOR_RENT":
        house_details["home_status"] = "Still on market"
        house_details["price"] = data["price"]
        house_details["time_to_rent"] = "Still on market"
        house_details["time_on_zillow"] = data["timeOnZillow"]
    else:
        house_details["home_status"] = "Rented out"
        if data["priceHistory"][0]["event"] == "Listing removed":
            house_details["price"] = data["priceHistory"][0]["price"]
            house_details["time_on_zillow"] = "Listing removed"
            house_details["date_rented"] = data["priceHistory"][0]["date"]
            date_rented = datetime.strptime(data["priceHistory"][0]["date"], "%Y-%m-%d")
            date_for_rent = datetime.strptime(
                data["priceHistory"][1]["date"], "%Y-%m-%d"
            )
            house_details["time_to_rent"] = (
                str((date_rented - date_for_rent).days) + " days"
            )

    house_details["year_built"] = data["resoFacts"]["yearBuilt"]
    house_details["zillow_link"] = "www.zillow.com" + data["url"]
    house_details["price_history"] = data["priceHistory"]
    house_details["zpid"] = data["zpid"]
    house_details["bedrooms"] = data["bedrooms"]
    house_details["bathrooms"] = data["bathrooms"]
    house_details["size"] = data["livingArea"]
    house_details["address"] = (
        data["address"]["streetAddress"]
        + ", "
        + data["address"]["city"]
        + ", "
        + data["address"]["state"]
        + " "
        + data["address"]["zipcode"]
    )
    return house_details


@app.route("/tracked/<zpid>", methods=["DELETE"])
def del_house(zpid):
    if request.method == "DELETE":
        result = houses_collection.delete_one({"_id": zpid})
        if not result:
            return {"error": "House was not deleted. Please try again"}, 500
        if result.deleted_count:
            return {"deleted_id": zpid}
        return {"error": "Image not found"}, 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
