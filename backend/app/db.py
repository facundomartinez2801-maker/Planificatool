from pymongo import MongoClient
from app.config import settings
from typing import Optional

class MongoDB:
    client: Optional[MongoClient] = None
    db = None

    @classmethod
    def connect_db(cls):
        cls.client = MongoClient(settings.mongodb_url)
        cls.db = cls.client[settings.database_name]
        print("✓ Connected to MongoDB")

    @classmethod
    def close_db(cls):
        if cls.client:
            cls.client.close()
            print("✓ Closed MongoDB connection")

    @classmethod
    def get_db(cls):
        if cls.db is None:
            cls.connect_db()
        return cls.db

db = MongoDB()

def get_database():
    return MongoDB.get_db()
