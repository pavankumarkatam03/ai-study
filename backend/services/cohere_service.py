import cohere
import os
from dotenv import load_dotenv

load_dotenv()
COHERE_API_KEY = os.getenv('COHERE_API_KEY')

co = cohere.Client(COHERE_API_KEY)

def get_cohere_response(prompt:str)->str:
    
    try:
        response = co.generate(
            model ="command",
            prompt = prompt,
            max_tokens = 300,
            temperature = 0.6
        )
        return response.generations[0].text.strip()
    
    except Exception as e:
        return f"Error getting response from Cohre API:{e}"