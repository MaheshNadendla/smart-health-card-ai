import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

APP_ENV = os.getenv("APP_ENV", "development")
MONGO_URI = os.getenv("PROD_MONGO_URI") if APP_ENV == "deployment" else os.getenv("LOCAL_MONGO_URI", "mongodb://localhost:27017")

client = MongoClient(MONGO_URI)
db = client["medical_chatbot"]
sessions = db["chat_sessions"]