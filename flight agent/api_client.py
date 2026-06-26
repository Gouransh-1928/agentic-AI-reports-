import os
import httpx
from dotenv import load_dotenv

load_dotenv()

AVIATIONSTACK_API_KEY = os.getenv("AVIATIONSTACK_API_KEY")
BASE_URL = "http://api.aviationstack.com/v1"


def get_flight_status(flight_iata: str):
    """
    Get the live status of a flight using its IATA flight number.
    """

    url = f"{BASE_URL}/flights"

    params = {
        "access_key": AVIATIONSTACK_API_KEY,
        "flight_iata": flight_iata,
    }

    response = httpx.get(url, params=params, timeout=30)

    response.raise_for_status()

    return response.json()