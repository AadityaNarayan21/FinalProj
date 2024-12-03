from pymongo import MongoClient

# Replace <db_password> with your MongoDB password
uri = "mongodb+srv://aaditya:aaditya@project.bklgo.mongodb.net/"

# Connect to the MongoDB client
client = MongoClient(uri)

# Create or select a database (will be created if it doesn't exist)
db = client['my_database']

# Create or select a collection (will be created if it doesn't exist)
collection = db['my_collection']

# Insert a single document into the collection
document = {
    "name": "Aaditya",
    "age": 25,
    "location": "India"
}
result = collection.insert_one(document)

# Print the ID of the inserted document
print(f"Inserted document with ID: {result.inserted_id}")
