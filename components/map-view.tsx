"use client";

import { useRef, useEffect, useState } from 'react';
import { Place } from '@/types/place';

interface MapViewProps {
  places: Place[];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
}

export function MapView({ places, selectedPlace, onPlaceSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || map) return;

    // Default to New York if no places
    const defaultCenter = { lat: 40.7128, lng: -74.0060 };
    
    try {
      const newMap = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#0D1B2A" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0D1B2A" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#E0E1DD" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#E0E1DD" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#E0E1DD" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#1B263B" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#778DA9" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#415A77" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1B263B" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#E0E1DD" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#415A77" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1B263B" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#E0E1DD" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#415A77" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#E0E1DD" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#0D1B2A" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#778DA9" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#0D1B2A" }],
          },
        ],
      });

      const newInfoWindow = new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(0, -5),
        maxWidth: 300
      });

      setMap(newMap);
      setInfoWindow(newInfoWindow);
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      // Fallback to a simple div with an error message
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <div class="flex items-center justify-center h-full bg-muted rounded-lg">
            <div class="text-center p-4">
              <p class="text-muted-foreground">Map could not be loaded.</p>
              <p class="text-sm text-muted-foreground mt-2">Please try again later.</p>
            </div>
          </div>
        `;
      }
    }
  }, [map]);

  // Update markers when places change
  useEffect(() => {
    if (!map || !places.length || !infoWindow) return;

    try {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Create new markers
      const newMarkers = places.map((place, index) => {
        const marker = new google.maps.Marker({
          position: { lat: place.latitude, lng: place.longitude },
          map,
          title: place.name,
          label: {
            text: (index + 1).toString(),
            color: '#E0E1DD',
          },
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#778DA9',
            fillOpacity: 1,
            strokeColor: '#E0E1DD',
            strokeWeight: 2,
            scale: 10,
          }
        });

        // Create info window content
        const infoContent = `
          <div class="p-3 max-w-xs bg-[#0D1B2A] text-[#E0E1DD] rounded-lg shadow-lg">
            <h3 class="font-bold text-sm text-[#778DA9]">${place.name}</h3>
            <p class="text-xs mt-1 text-[#E0E1DD]">${place.address}</p>
            <div class="flex items-center mt-2 justify-between">
              <span class="text-xs font-semibold text-[#778DA9]">$${place.price}</span>
              <span class="text-xs flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#778DA9" stroke="#778DA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${place.rating}
              </span>
            </div>
          </div>
        `;

        // Add click event
        marker.addListener('click', () => {
          infoWindow.setContent(infoContent);
          infoWindow.open(map, marker);
          onPlaceSelect(place);
        });

        return marker;
      });

      setMarkers(newMarkers);

      // Create bounds to encompass all markers
      if (places.length > 1) {
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
          bounds.extend({ lat: place.latitude, lng: place.longitude });
        });
        map.fitBounds(bounds);
      } else if (places.length === 1) {
        // If only one place, center on it
        map.setCenter({ lat: places[0].latitude, lng: places[0].longitude });
        map.setZoom(15);
      }
    } catch (error) {
      console.error("Error creating map markers:", error);
    }
  }, [map, places, onPlaceSelect, infoWindow]);

  // Highlight selected place
  useEffect(() => {
    if (!map || !selectedPlace || !infoWindow) return;

    try {
      // Center map on selected place
      map.panTo({ lat: selectedPlace.latitude, lng: selectedPlace.longitude });
      
      // Find the marker for the selected place
      const index = places.findIndex(p => p.id === selectedPlace.id);
      if (index >= 0 && markers[index]) {
        // Create info window content
        const infoContent = `
          <div class="p-3 max-w-xs bg-[#0D1B2A] text-[#E0E1DD] rounded-lg shadow-lg">
            <h3 class="font-bold text-sm text-[#778DA9]">${selectedPlace.name}</h3>
            <p class="text-xs mt-1 text-[#E0E1DD]">${selectedPlace.address}</p>
            <div class="flex items-center mt-2 justify-between">
              <span class="text-xs font-semibold text-[#778DA9]">$${selectedPlace.price}</span>
              <span class="text-xs flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#778DA9" stroke="#778DA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${selectedPlace.rating}
              </span>
            </div>
          </div>
        `;
        
        infoWindow.setContent(infoContent);
        infoWindow.open(map, markers[index]);
        
        // Update marker icon to highlight it
        markers[index].setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#415A77', // Darker blue for selected
          fillOpacity: 1,
          strokeColor: '#E0E1DD',
          strokeWeight: 2,
          scale: 12,
        });
        
        markers[index].setAnimation(google.maps.Animation.BOUNCE);
        
        // Stop animation after a short time
        setTimeout(() => {
          markers[index].setAnimation(null);
          // Reset icon after animation
          setTimeout(() => {
            markers[index].setIcon({
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#778DA9',
              fillOpacity: 1,
              strokeColor: '#E0E1DD',
              strokeWeight: 2,
              scale: 10,
            });
          }, 150);
        }, 1500);
      }
    } catch (error) {
      console.error("Error highlighting selected place:", error);
    }
  }, [selectedPlace, map, places, markers, infoWindow]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
  );
}