from flask import Flask, request, jsonify
from supabase import create_client, Client
from secret_config import SUPABASE_URL, SUPABASE_KEY
from datetime import datetime
from getProx import calculate_proximity, calculate_proximity_transit

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

# get events based on volunteer
@app.route('/getvolevents', methods=['POST'])
def get_volunteer_events():
    data = request.json
    if not data or 'certifications' not in data or 'languages' not in data or 'address' not in data:
        return jsonify({'error': 'Missing volunteer data'}), 400

    volunteer_certifications = data['certifications']
    volunteer_languages = data['languages']
    volunteer_address = data['address']
    print(volunteer_languages)
    try:
        # Fetch all events from Supabase
        events_response = supabase.table('Events').select('*').execute()
        if (events_response.data):
            events = events_response.data
        else:
            return jsonify({'error': 'Failed to fetch events'}), 500

        #print(events)
        filtered_events = []

        # Filter events based on volunteer's certifications and languages
        for event in events:
            event_requirements = event.get('prerequisites', {})
            event_languages = event_requirements.get('Languages', [])
            event_certifications = event_requirements.get('Certifications', [])
            event['proximity'] = calculate_proximity_transit(volunteer_address,event['location'])
            if all(language in volunteer_languages for language in event_languages) and \
               all(certification in volunteer_certifications for certification in event_certifications):
                filtered_events.append(event)

        # Sort events by startdatetime first, then by proximity
        filtered_events.sort(key=lambda e: (datetime.strptime(e['start_time'], '%Y-%m-%dT%H:%M:%S'), 
                                            calculate_proximity_transit(volunteer_address, e['location'])))
        
        print(filtered_events)
        return jsonify(filtered_events), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Something went wrong'}), 500

#ADD EVENT
@app.route('/addevent', methods=['POST'])
def add_event():
    data = request.json
    print(data["uuid"])
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    try:
        # Insert the event into Supabase
        response = supabase.table('Events').update({'languages':data['languages']}).eq("uuid",data['uuid']).execute()
        return jsonify(response.data), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to add event'}), 500


# get events based on beneficiary
@app.route('/getbenevents', methods=['POST'])
def get_beneficiary_events():
    data = request.json
    
    beneficiary_languages = data['languages']
    beneficiary_address = data['address']
    beneficiary_mobility = data['mobility']
    print(beneficiary_languages,beneficiary_address,beneficiary_mobility)
    try:
        # Fetch all events from Supabase
        events_response = supabase.table('Events').select('*').execute()
        if (events_response.data):
            events = events_response.data
        else:
            return jsonify({'error': 'Failed to fetch events'}), 500

        filtered_events = []

        # Filter events based on volunteer's certifications and languages
        for event in events:
            event_requirements = event.get('prerequisites', {})
            event_languages = event_requirements.get('Languages', [])
            event['proximity'] = calculate_proximity(beneficiary_address,event['location'])
            if any(language in event_languages for language in beneficiary_languages):
                if (beneficiary_mobility == 'Moderate' and event['proximity']<40):
                    filtered_events.append(event)

        # Sort events by startdatetime first, then by proximity
        filtered_events.sort(key=lambda e: (datetime.strptime(e['start_time'], '%Y-%m-%dT%H:%M:%S'), 
                                            calculate_proximity(beneficiary_address, e['location'])))
        
        print("Fil"+str(filtered_events))
        return jsonify(filtered_events), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Something went wrong'}), 500


#Request Event
@app.route('/reqevent', methods=['POST'])
def req_event():
    try:
        # Parse the JSON request
        data = request.json
        print(data)
        title = data.get('title')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        icon = data.get('icon')
        location = data.get('location')
        description = data.get('description')
        prerequisites = data.get('prerequisites')
        languages = data.get('languages')

        # Insert the event into the Supabase table
        event_data = {
            'title': title,
            'start_time': start_time,
            'end_time': end_time,
            'icon': icon,
            'location': location,
            'description': description,
            'prerequisites': prerequisites,
            'languages': languages
        }

        response = supabase.table('Events').insert([event_data]).execute()

        if response.data:
            return jsonify({'message': 'Event created successfully', 'data': response.data}), 201
        else:
            return jsonify({'error': response['error']['message']}), 400

        # Return the inserted data
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)