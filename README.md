# Vulneros3

### Enabling and Protecting the Vulnerable


## Features
 - Singpass Login
 - User Friendly Onboarding
 - Support Vector Regression based vulnerability score calculation
 - OneMap routing (transit and walk)

## Installation Instructions
Create and activate virtual environment
```
cd server
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
```
Create secret_config.py and add your variables:

```
cd server
type nul > secret_config.py
```
Add your variables:
```
SUPABASE_URL = '<your supabase URL>'
SUPABASE_KEY = '<your supabase API key>'
ONEMAP_KEY = '<your OneMap API key>'
```

Run the backend server
```
cd server
python app.py
```
Initialise and Run the React Client
```
cd client
npm install
npm run dev
```