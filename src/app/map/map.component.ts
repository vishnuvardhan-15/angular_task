/// <reference types="google-maps" />
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];
  messages: string[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const mapOptions: google.maps.MapOptions = {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            zoom: 12,
          };
          this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapOptions
          );
          this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
              this.logMessage('--------------------------------');
              this.logMessage(`Marker: ${this.markers.length + 1}`);
              this.logMessage(
                `Clicked location: Latitude=${event.latLng.lat()} Longitude=${event.latLng.lng()}`
              );
              this.placeMarker(event.latLng);
              this.getStreetName(event.latLng);
            } else {
              this.logMessage(`${event}`);
            }
          });
        },
        () => {
          this.handleLocationError(true);
        }
      );
    } else {
      this.handleLocationError(false);
    }

    this.logMessage('Map Initialized');
  }
  handleLocationError(browserHasGeolocation: boolean): void {
    this.logMessage(
      browserHasGeolocation
        ? 'Error: Please enable location permissions for Geolocation'
        : "Error: Your browser doesn't support geolocation."
    );
  }

  logMessage(message: string): void {
    this.messages.push(message);
    this.changeDetector.detectChanges();
  }

  placeMarker(location: google.maps.LatLng): void {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
    this.markers.push(marker);
  }

  getStreetName(location: google.maps.LatLng): void {
    const geoCoder = new google.maps.Geocoder();
    geoCoder.geocode({ location }, (results, status) => {
      if (status === 'OK') {
        if (results && results.length > 0) {
          this.logMessage(`Full Address: ${results[0].formatted_address}`);
          const address = results[0].address_components;
          const streetNames = this.extractStreetName(address);
          this.logMessage(
            streetNames.length
              ? 'Street Name: ' + streetNames
              : 'No Street Name Found'
          );
        } else {
          this.logMessage('No results found');
        }
      } else if (status === 'ERROR') {
        this.logMessage(
          `${status}: Please check your connection and try again`
        );
      } else {
        this.logMessage(`${status}: Please try again`);
      }
    });
  }

  extractStreetName(
    addressComponents: google.maps.GeocoderAddressComponent[]
  ): string {
    let streetName = '';

    for (const component of addressComponents) {
      if (component.types.includes('route')) {
        streetName = component.long_name;
      }
    }
    return streetName;
  }

  clearMessagesAndMarkers(): void {
    this.messages = [];
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
}
