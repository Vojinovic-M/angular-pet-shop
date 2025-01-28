from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet, SessionStarted, ActionExecuted
from rasa_sdk.executor import CollectingDispatcher
import requests

BASE_URL = "http://localhost:8080"  # Backend URL


class ActionGreetUser(Action):
  def name(self) -> Text:
    return "action_greet_user"

  def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
    dispatcher.utter_message(text="Hi! I’m your pet assistant. You can search for pets or place an order! To search, reply with 'I am looking for a pet'. To order, say 'I want to order a pet'")
    return []


class ActionSessionStart(Action):
  def name(self) -> str:
    return "action_session_start"

  async def run(
    self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[str, Any]
  ) -> List[Dict[Text, Any]]:
    events = [SessionStarted()]

    # Extract authToken from metadata
    auth_token = tracker.get_slot("auth_token")
    if auth_token is None and tracker.latest_message.get("metadata"):
      auth_token = tracker.latest_message["metadata"].get("authToken")

    if auth_token:
      events.append(SlotSet("auth_token", auth_token))

    events.append(ActionExecuted("action_listen"))
    return events


class ActionSearchPets(Action):
  def name(self) -> Text:
    return "action_search_pets"

  def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
    response = requests.get(f"{BASE_URL}/pets/list?page=0&size=10")

    if response.status_code == 200:
      pets = response.json().get("content", [])
      if not pets:
        dispatcher.utter_message(text="No pets found matching your criteria.")
        return []

      for pet in pets:
        dispatcher.utter_message(
          text=(
            f"Name: {pet['name']}\n"
            f"Description: {pet['description']}\n"
            f"Breed: {pet['breed']}\n"
            f"Age: {pet['age']} years\n"
            f"Size: {pet['size']}\n"
            f"Origin: {pet['origin']}\n"
            f"Price: {pet['price']}\n"
            f"Details: [View more](http://localhost:4200/pet/{pet['id']})"
          )
        )
    else:
      dispatcher.utter_message(
        text=f"Error fetching pet data. Status: {response.status_code}. Details: {response.text}"
      )
    return []



class ActionOrderPet(Action):
  def name(self) -> Text:
    return "action_order_pet"

  def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
    auth_token = tracker.get_slot("auth_token")
    print(f"DEBUG: auth token: {auth_token}")

    if not auth_token:
      dispatcher.utter_message(text="You must log in before placing an order. To log in, please visit [this page](http://localhost:4200/user/login)")
      return []

    pet_id = tracker.get_slot("pet_id")
    if not pet_id:
      dispatcher.utter_message(text="Please specify the pet you want to order.")
      return []

    headers = {"Authorization": auth_token}
    response = requests.post(f"{BASE_URL}/orders", json={"petId": pet_id}, headers=headers)

    if response.status_code == 200:
      dispatcher.utter_message(text="Your order has been placed successfully!")
    else:
      dispatcher.utter_message(text="Failed to place the order. Please try again.")
    return []



# def create_auth_header(username: str, password: str) -> Dict[str, str]:
#   """Generate Basic Auth headers."""
#   from base64 import b64encode
#   token = b64encode(f"{username}:{password}".encode()).decode()
#   return {"Authorization": f"Basic {token}"}
# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa-pro/concepts/custom-actions
# This is a simple example for a custom action which utters "Hello World!"
import base64

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.events import SlotSet
# from rasa_sdk.executor import CollectingDispatcher
# from typing import List, Dict, Text, Any
# import requests
# import base64
#
# BASE_URL = "http://localhost:8080/pets"
#
#
#
# class ActionOrderPet(Action):
#   def name(self) -> Text:
#     return "action_place_order"
#
#   def run(self, dispatcher: CollectingDispatcher,
#           tracker: Tracker,
#           domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#     # Retrieve username and password from slots
#     pet_id = tracker.get_slot("pet_id")
#     username = tracker.get_slot("username")
#     password = tracker.get_slot("password")
#
#     if not username or not password:
#       dispatcher.utter_message(text="Please log in before placing an order. Thanks!")
#       return [SlotSet("order_status", "failure")]
#
#     auth_header = get_auth_header(username, password)
#
#     try:
#       response = requests.post("http://localhost:8080/orders/create",
#                                json={"petId": pet_id}, headers=auth_header)
#
#       if response.status_code == 200:
#         dispatcher.utter_message(text="Your order was placed successfully!  Would you like to browse more pets or add another order?")
#         return [SlotSet("order_status", "success"), SlotSet("pet_id", None)]
#       else:
#         dispatcher.utter_message(text="Unfortunately, we couldn't process your order. You can try again or view available pets.")
#         return [SlotSet("order_status", "failure")]
#
#     except requests.exceptions.RequestException as e:
#       dispatcher.utter_message(text="Error connecting to the system. Please check your internet connection.")
#       print(f"Error: {e}")  # Log the error for debugging
#
#
#
# class ActionListAvailablePets(Action):
#   def name(self) -> str:
#     return "action_list_available_pets"
#
#   def run(self, dispatcher, tracker, domain):
#     username = tracker.get_slot("username")
#     password = tracker.get_slot("password")
#
#     if not username or not password:
#       dispatcher.utter_message(text="Please log in to see available pets.")
#       return []
#
#     auth_header = get_auth_header(username, password)
#
#     try:
#       response = requests.get("http://localhost:8080/pets/list", headers=auth_header)
#       if response.status_code == 200:
#         pets = response.json()
#         if pets:
#
#           message = "Here are the available pets:\n"
#           for pet in pets:
#             message += f"- {pet['name']}, ({pet['age']}) ({pet['breed']}): {pet['description']} - [View Details](http://localhost:4200/pet/{pet['id']})\n"
#           dispatcher.utter_message(text=message)
#           return []
#         else:
#           dispatcher.utter_message(text="No pets available right now.")
#           return []
#       else:
#         dispatcher.utter_message(text="Failed to fetch pets.")
#         return []
#
#     except requests.exceptions.RequestException as e:
#       dispatcher.utter_message(text="Error connecting to the system. Please check your internet connection.")
#       print(f"Error: {e}")  # Log the error for debugging
#
#
#
# class ActionFetchPetDetails(Action):
#   def name(self) -> str:
#     return "action_fetch_pet_details"
#
#   def run(self, dispatcher, tracker, domain):
#     pet_id = tracker.get_slot("pet_id")
#     username = tracker.get_slot("username")
#     password = tracker.get_slot("password")
#
#     if not pet_id:
#       dispatcher.utter_message(text="Please provide a valid pet ID.")
#       return []
#
#     auth_header = get_auth_header(username, password)
#
#     try:
#       response = requests.get(f"http://localhost:8080/pets/{pet_id}", headers=auth_header)
#       if response.status_code == 200:
#         pet = response.json()
#         dispatcher.utter_message(
#           text=f"Details for {pet['name']}:\n"
#                f"- Type: {pet['type']}\n"
#                f"- Age: {pet['age']} years\n"
#                f"- Description: {pet['description']}\n"
#                f"- Price: ${pet['price']}\n"
#         )
#         dispatcher.utter_message(text="What would you like to do next? You can ask for another pet or place an order.")
#         return []
#       else:
#         dispatcher.utter_message(text="Could not fetch pet details.")
#         return []
#     except requests.exceptions.RequestException as e:
#       dispatcher.utter_message(text="Error connecting to the system. Please check your internet connection.")
#       print(f"Error: {e}")  # Log the error for debugging
#
#
#
# class ActionCheckLogin(Action):
#   def name(self) -> str:
#     return "action_check_login"
#
#   def run(
#     self,
#     dispatcher: CollectingDispatcher,
#     tracker: Any,
#     domain: Dict[str, Any],
#   ) -> List[Dict[str, Any]]:
#     user_id = tracker.get_slot("user_id")
#
#     if user_id is None:
#       dispatcher.utter_message(text="Please log in before placing an order.")
#       return []
#
#     dispatcher.utter_message(text="You are logged in. Let's proceed!")
#     return []
#
#
#
# class ActionFetchUserCredentials(Action):
#   def name(self) -> str:
#     return "action_fetch_user_credentials"
#
#   def run(self, dispatcher, tracker, domain):
#     username = tracker.get_slot("username")
#     password = tracker.get_slot("password")
#
#     if username and password:
#       dispatcher.utter_message(text=f"Welcome, {username}!")
#       return [SlotSet("username", username), SlotSet("password", password)]
#     else:
#       dispatcher.utter_message(text="Could not retrieve login credentials. Please log in.")
#       return []
