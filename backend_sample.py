
import os
import uuid
from datetime import datetime, timezone

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

# Load .env from the same folder as this Python file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI missing. Please check your .env file.")

client = MongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=10000
)

# Check MongoDB connection
client.admin.command("ping")
print("MongoDB Atlas connected successfully!")

db = client["roomfinder_db"]
properties_collection = db["properties"]
visits_collection = db["visits"]


# Initial sample properties
sample_properties = [
    {
        "id": "p_ramtek_1",
        "title": "Spacious 2BHK Flat near KITS Engineering College",
        "city": "Ramtek, Dist. Nagpur",
        "locality": "KITS College Road",
        "rent": 7800,
        "deposit": 15000,
        "propertyType": "2BHK",
        "furnishing": "Semi-Furnished",
        "landlordName": "Anil Deshmukh",
        "landlordPhone": "9422114455",
        "amenities": [
            "WiFi", "24x7 Water", "Power Backup",
            "Bike Parking", "Geyser"
        ],
        "baths": 2,
        "areaSqFt": 880,
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "verified": True,
        "status": "available"
    },
    {
        "id": "p_ramtek_2",
        "title": "Budget 1RK Room for 2 Students (Mansar Road)",
        "city": "Ramtek, Dist. Nagpur",
        "locality": "Mansar Road",
        "rent": 3200,
        "deposit": 6000,
        "propertyType": "1RK",
        "furnishing": "Unfurnished",
        "landlordName": "Rameshwar Tembhre",
        "landlordPhone": "9823055667",
        "amenities": ["24x7 Water", "Bike Parking"],
        "baths": 1,
        "areaSqFt": 280,
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "verified": True,
        "status": "available"
    }
]


# Add sample properties only if database is empty
if properties_collection.count_documents({}) == 0:
    properties_collection.insert_many(sample_properties)
    print("Sample properties added to MongoDB.")


# GET all properties
@app.route("/api/properties", methods=["GET"])
def get_properties():
    properties = list(
        properties_collection.find(
            {},
            {"_id": 0}
        ).sort("_id", -1)
    )
    return jsonify(properties)


# POST a new property
@app.route("/api/properties", methods=["POST"])
def add_property():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Invalid property data"}), 400

    data["id"] = f"prop_{uuid.uuid4().hex}"
    data["createdAt"] = datetime.now(timezone.utc).isoformat()

    properties_collection.insert_one(data)

    return jsonify(data), 201


# GET all visits
@app.route("/api/visits", methods=["GET"])
def get_visits():
    visits = list(
        visits_collection.find(
            {},
            {"_id": 0}
        ).sort("_id", -1)
    )
    return jsonify(visits)


# POST a new visit
@app.route("/api/visits", methods=["POST"])
def add_visit():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Invalid visit data"}), 400

    data["id"] = f"visit_{uuid.uuid4().hex}"
    data["createdAt"] = datetime.now(timezone.utc).isoformat()

    visits_collection.insert_one(data)

    return jsonify(data), 201


if __name__ == "__main__":
    print("RoomFinder Backend running at http://127.0.0.1:5000/api")
    app.run(host="127.0.0.1", port=5000, debug=True)
