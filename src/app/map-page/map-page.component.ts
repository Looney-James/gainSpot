import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})

export class MapPageComponent implements OnInit {

  lat = 39.5296;
  lng = -119.8138;
  zoom = 12;
  map!: google.maps.Map;
  placesService!: google.maps.places.PlacesService;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;
  currentLocationMarker!: google.maps.Marker;

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('load', () => this.initMap());
    this.initMap();
  }


  initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
  
    const options = {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom
    };
  
    const map = new google.maps.Map(mapElement, options);

  
  
    // Add markers for gyms
    const gyms = [
      {
        name: "E.L. Wiegand Fitness Center",
        lat: 39.54356,
        lng: -119.81745,
        address: '1664 N Virginia St, Reno, NV 89557',
        phone: '(775) 784-1225',
        website: 'https://www.unr.edu/fitness/facilities/fitness-center-rules'
      },
      {
        name: 'Anytime Fitness',
        lat: 39.5216,
        lng: -119.8116,
        address: '50 W Liberty St, Reno, NV 89501',
        phone: '(775) 473-4040',
        website: 'https://www.anytimefitness.com/gyms/4271/Reno-NV-89501/?utm_source=google&utm_medium=local&utm_campaign=localmaps&utm_content=4271'
      },
      {
        name: 'South Reno Athletic Club',
        lat: 39.4457,
        lng: -119.7664,
        address: '9393 Gateway Dr, Reno, NV 89521',
        phone: '(775) 853-4050',
        website: 'http://www.southrac.com/'
      },
      {
        name: 'Double Edge Fitness - Midtown',
        lat: 39.5194,
        lng: -119.8094,
        address: '1065 S Virginia St, Reno, NV 89502',
        phone: '(775) 657-9956',
        website: 'http://www.doubleedgefitness.com/'
      },
      {
        name: 'American Iron Gym',
        lat: 39.5031,
        lng: -119.7626,
        address: '650 S Rock Blvd, Reno, NV 89502',
        phone: '(775) 856-4766',
        website: 'http://american-iron.com/'
      }
    ];
  
    gyms.forEach(gym => {
      const marker = new google.maps.Marker({
        position: { lat: gym.lat, lng: gym.lng },
        map: map,
        title: gym.name
      });
  
      const contentString = `
        <div class="info-window">
          <div class="info-window-header">${gym.name}</div>
          <div class="info-window-content">

            <div class="info-window-row">
              <div class="info-window-label">Address:</div>
              <div class="info-window-value">${gym.address}</div>
            </div>

            <div class="info-window-row">
              <div class="info-window-label">Phone:</div>
              <div class="info-window-value">${gym.phone}</div>
            </div>

            <div class="info-window-row">
              <div class="info-window-label">Website:</div>
              <div class="info-window-value"><a href="${gym.website}" target="_blank">${gym.website}</a></div>
            </div>
          </div>
        </div>
      `;
  
      const infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
  
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });

    let currentLat: number;
    let currentLng: number;
    
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        currentLat = position.coords.latitude;
        currentLng = position.coords.longitude;
    
        // Add a marker for the user's current location
        const currentLocationMarker = new google.maps.Marker({
          position: { lat: currentLat, lng: currentLng },
          map: map,
          title: "Current Location",
          icon: {
            url: 'https://maps.google.com/mapfiles/kml/paddle/blu-blank.png',
            scaledSize: new google.maps.Size(40, 40)
          }
        });
      });
    }
  }
}