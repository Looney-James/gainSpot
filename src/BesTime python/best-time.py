import requests

url = "https://besttime.app/api/v1/forecasts"

params = {
    'api_key_private': 'pri_579f6f48a4ef45be9157b06afbe8cd27',
    'venue_name': 'E. L. Wiegand Fitness Center',
    'venue_address': '1664 N Virginia St Reno, NV 89557 United States'
}

response = requests.request("POST", url, params=params)
print(response.json())