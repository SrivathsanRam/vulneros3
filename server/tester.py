from supabase import create_client, Client
from secret_config import SUPABASE_URL, SUPABASE_KEY
supabase: Client = create_client(SUPABASE_URL,SUPABASE_KEY)
import json

try:
    response = (
        supabase.table("Volunteers")
        .select("*")
        .eq("NRIC", "T0333333B")
        .execute()
    )
    print(response)
except:
    print("error")
