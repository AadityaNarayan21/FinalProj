from pymongo import MongoClient
import datetime
from datetime import UTC  # Importing UTC for timezone-aware timestamp

# Function to calculate required nutrients and suggest fertilizers
def calculate_required_nutrients_and_suggest_fertilizers(npk_values):
    ideal_ratio = {'N': 1, 'P': 0.52, 'K': 1.37}
    N, P, K = npk_values
    total_nutrients = N + P + K
    
    # Calculate ideal values for each nutrient
    ideal_N = (total_nutrients / (ideal_ratio['N'] + ideal_ratio['P'] + ideal_ratio['K'])) * ideal_ratio['N']
    ideal_P = (total_nutrients / (ideal_ratio['N'] + ideal_ratio['P'] + ideal_ratio['K'])) * ideal_ratio['P']
    ideal_K = (total_nutrients / (ideal_ratio['N'] + ideal_ratio['P'] + ideal_ratio['K'])) * ideal_ratio['K']
    
    # Prepare detailed recommendations
    recommendations = []
    if max(0, ideal_N - N) > 0:
        recommendations.append("The soil in this grid is currently deficient in nitrogen. It is recommended to apply Urea or Calcium Ammonium Nitrate to address this deficiency and promote optimal plant growth.")
    if max(0, ideal_P - P) > 0:
        recommendations.append("The soil in this grid is currently deficient in phosphorus. It is recommended to apply Super Single Phosphate (SSP) to address this deficiency and enhance root development.")
    if max(0, ideal_K - K) > 0:
        recommendations.append("The soil in this grid is currently deficient in potassium. It is recommended to apply Potash to address this deficiency and improve overall plant health and disease resistance.")
    
    return recommendations

# Function to insert recommendations into MongoDB
def insert_recommendations_to_mongodb(npk_values, recommendations):
    client = MongoClient('mongodb+srv://aaditya:aaditya@project.bklgo.mongodb.net/soil_data?retryWrites=true&w=majority')
    db = client['soil_data']
    collection = db['recommendations']
    
    document = {
        "npk_values": {"N": npk_values[0], "P": npk_values[1], "K": npk_values[2]},
        "recommendations": recommendations or ["No deficiencies detected. The soil is balanced."],
        "timestamp": datetime.datetime.now(UTC)  # Timezone-aware UTC timestamp
    }
    collection.insert_one(document)
    print("Recommendations successfully inserted into MongoDB.")

# Example input NPK values
input_values = [140, 40, 200]  # Replace with actual NPK values

# Calculate and print recommendations
recommendations = calculate_required_nutrients_and_suggest_fertilizers(input_values)
if recommendations:
    for recommendation in recommendations:
        print(recommendation)
else:
    print("No deficiencies detected. The soil is balanced.")

# Insert the results into MongoDB
insert_recommendations_to_mongodb(input_values, recommendations)
