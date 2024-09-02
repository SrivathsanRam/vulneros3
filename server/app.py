from flask import Flask, request, jsonify
from supabase import create_client, Client
from secret_config import SUPABASE_URL, SUPABASE_KEY

supabase: Client = create_client(SUPABASE_URL,SUPABASE_KEY)

app = Flask(__name__)  

#Login Auth Method for Beneficiaries and Volunteers
@app.route('/login', methods=['POST'])
def verify_user():
    data = request.get_json()
    nric = data.get('nric')
    print(nric)
    if not nric:
        return jsonify({"error": "UserID not provided"}), 400

    try:
        volunteer_response = supabase \
            .from_('Volunteers') \
            .select('*') \
            .eq('NRIC', nric) \
            .execute()

        if volunteer_response.data:
            # If found in 'users' table, return as volunteer
            volunteer_data = volunteer_response.data[0]
            volunteer_data['type'] = 'volunteer'
            return jsonify(volunteer_data)

        # If not found in 'users', check the 'beneficiaries' table
        beneficiary_response = supabase \
            .from_('Beneficiaries') \
            .select('*') \
            .eq('NRIC', nric) \
            .execute()

        if beneficiary_response.data:
            # If found in 'beneficiaries' table, return as beneficiary
            beneficiary_data = beneficiary_response.data[0]
            beneficiary_data['type'] = 'beneficiary'
            return jsonify(beneficiary_data)

        # If not found in either table, return 404
        return jsonify({"error": "User not found"}), 404


    except Exception as e:
        print(f"Error verifying user: {e}")
        return jsonify({"error": "Verification failed"}), 500
    
#Saving Languages for Beneficiaries
@app.route('/save_languages', methods=['POST'])
def save_languages():
    data = request.get_json()
    print(data)
    nric = data.get('nric')
    languages = data.get('languages')
    
    if not (languages):
        return jsonify({"error": "Incomplete data"}), 400

    try:
        # Update the beneficiary data in the supabase table
        
        update_response = supabase \
            .table('Beneficiaries') \
            .update({
                "languages": {"Languages": languages},
            }) \
            .eq('NRIC', nric) \
            .execute()

        if update_response.data:
            return jsonify({"message": "Beneficiary data updated successfully"}), 200
        else:
            return jsonify({"error": "Failed to update"}), 500

    except Exception as e:
        print(f"Error updating beneficiary data: {e}")
        return jsonify({"error": "Server error"}), 500
    

#Saving Mobility for Beneficiaries
@app.route('/save_mobility', methods=['POST'])
def save_mobility():
    data = request.get_json()
    print(data)
    nric = data.get('nric')
    mobility = data.get('mobility')
    
    if not (mobility):
        return jsonify({"error": "Incomplete data"}), 400

    try:
        # Update the beneficiary data in the supabase table
        
        update_response = supabase \
            .table('Beneficiaries') \
            .update({
                "mobility": mobility,
            }) \
            .eq('NRIC', nric) \
            .execute()

        if update_response.data:
            return jsonify({"message": "Beneficiary data updated successfully"}), 200
        else:
            return jsonify({"error": "Failed to update"}), 500

    except Exception as e:
        print(f"Error updating beneficiary data: {e}")
        return jsonify({"error": "Server error"}), 500


#Saving Loved Ones for Beneficiaries
@app.route('/save_loved_ones', methods=['POST'])
def save_loved():
    data = request.get_json()
    print(data)
    nric = data.get('nric')
    lovedOnes = data.get('lovedOnes')
    visitFrequency = data.get('visitFrequency')
    
    if not (lovedOnes):
        return jsonify({"error": "Incomplete data"}), 400

    try:
        # Update the beneficiary data in the supabase table
        
        update_response = supabase \
            .table('Beneficiaries') \
            .update({
                "loved_ones": {'number': lovedOnes, 'freq': visitFrequency},
            }) \
            .eq('NRIC', nric) \
            .execute()

        if update_response.data:
            return jsonify({"message": "Beneficiary data updated successfully"}), 200
        else:
            return jsonify({"error": "Failed to update"}), 500

    except Exception as e:
        print(f"Error updating beneficiary data: {e}")
        return jsonify({"error": "Server error"}), 500

if __name__ == '__main__':
    app.run(debug=True)