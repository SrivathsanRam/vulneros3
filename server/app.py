from flask import Flask, request, jsonify
from supabase import create_client, Client
from secret_config import SUPABASE_URL, SUPABASE_KEY

supabase: Client = create_client(SUPABASE_URL,SUPABASE_KEY)

app = Flask(__name__)  

@app.route('/login', methods=['POST'])
def verify_user():
    data = request.get_json()
    nric = data.get('nric')
    print(nric)
    if not nric:
        return jsonify({"error": "UserID not provided"}), 400

    try:
        response = supabase \
            .from_('Volunteers') \
            .select('*') \
            .eq('NRIC', nric) \
            .execute()

        if response.data:
            return jsonify({"verified": True})
        else:
            return jsonify({"verified": False})

    except Exception as e:
        print(f"Error verifying user: {e}")
        return jsonify({"error": "Verification failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)