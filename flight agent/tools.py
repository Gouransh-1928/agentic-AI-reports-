from langchain.tools import tool
from api_client import get_flight_status


@tool
def flight_status(flight_number: str) -> str:
    """
    Get the live status of a flight using its flight number.
    Example: AI302, 6E205, EK511
    """

    result = get_flight_status(flight_number)

    if not result["data"]:
        return f"No flight found for {flight_number}"

    flight = result["data"][0]

    return f"""
Flight: {flight['flight']['iata']}

Status: {flight['flight_status']}

Airline: {flight['airline']['name']}

Departure Airport: {flight['departure']['airport']}

Arrival Airport: {flight['arrival']['airport']}

Scheduled Departure: {flight['departure']['scheduled']}

Scheduled Arrival: {flight['arrival']['scheduled']}
"""