# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa-pro/concepts/custom-actions
# This is a simple example for a custom action which utters "Hello World!"

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

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from typing import List, Dict, Text, Any
import requests

BASE_URL = "http://localhost:8080/pets"

def fetch_pets_from_backend(page=0):
  response = requests.get(f"{BASE_URL}/list?page={page}")
  return response.json() if response.status_code == 200 else None

def fetch_pet_by_id_from_backend(pet_id):
  response = requests.get(f"{BASE_URL}/{pet_id}")
  return response.json() if response.status_code == 200 else None


class ActionSearchPet(Action):
  def name(self) -> Text:
    return "action_search_pet"

  def run(
    self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]
  ) -> List[Dict[Text, Any]]:
    user_message = tracker.latest_message.get('text', '')
    response = requests.get(f'{BASE_URL}/list?page=0&size=10')

    # get_pets iz bekend?
    if response.status_code == 200:
      pets = response.json()["content"]
      if pets:
        pet_details = "\n".join([f"{pet['name']} ({pet['breed']}): {pet['description']}" for pet in pets])
        dispatcher.utter_message(text=f"Here's your pet list:\n {pet_details}")
      else:
        dispatcher.utter_message(text="Sorry, I couldn't find any pets.")
    else:
      dispatcher.utter_message(text="Something went wrong, please try again later.")
    return []

class ActionOrderPet(Action):
  def name(self):
    return "action_order_pet"

  async def run(self, dispatcher, tracker, domain):
    pet_name = tracker.get_slot("pet_name")
    if pet_name:
      dispatcher.utter_message(text=f"Your order for {pet_name} has been placed.")
    else:
      dispatcher.utter_message(text="Could you please specify the name of the pet you'd like to order?")
    return []



