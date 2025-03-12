import { Place } from '@/types/place';

// Helper function to get coordinates for a location using Google's Geocoding API
export async function getCoordinatesForLocation(location: string): Promise<{ latitude: number; longitude: number } | null> {
  try {
    if (typeof google !== 'undefined' && google.maps && google.maps.Geocoder) {
      const geocoder = new google.maps.Geocoder();
      
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            const location = results[0].geometry.location;
            resolve({
              latitude: location.lat(),
              longitude: location.lng()
            });
          } else {
            console.warn(`Geocoding failed for "${location}": ${status}`);
            // Fallback to mock coordinates
            resolve(getMockCoordinates(location));
          }
        });
      });
    } else {
      console.warn('Google Maps Geocoder not available, using fallback');
      return getMockCoordinates(location);
    }
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return getMockCoordinates(location);
  }
}

// Fallback mock coordinates for common cities
function getMockCoordinates(location: string): { latitude: number; longitude: number } | null {
  const mockGeoData: Record<string, { lat: number; lng: number }> = {
    'new york': { lat: 40.7128, lng: -74.0060 },
    'los angeles': { lat: 34.0522, lng: -118.2437 },
    'chicago': { lat: 41.8781, lng: -87.6298 },
    'london': { lat: 51.5074, lng: -0.1278 },
    'paris': { lat: 48.8566, lng: 2.3522 },
    'tokyo': { lat: 35.6762, lng: 139.6503 },
    'sydney': { lat: -33.8688, lng: 151.2093 },
    'berlin': { lat: 52.5200, lng: 13.4050 },
    'rome': { lat: 41.9028, lng: 12.4964 },
    'madrid': { lat: 40.4168, lng: -3.7038 },
    'toronto': { lat: 43.6532, lng: -79.3832 },
    'cairo': { lat: 30.0444, lng: 31.2357 },
    'cape town': { lat: -33.9249, lng: 18.4241 },
    'johannesburg': { lat: -26.2041, lng: 28.0473 },
    'nairobi': { lat: -1.2921, lng: 36.8219 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'delhi': { lat: 28.6139, lng: 77.2090 },
    'beijing': { lat: 39.9042, lng: 116.4074 },
    'shanghai': { lat: 31.2304, lng: 121.4737 },
    'seoul': { lat: 37.5665, lng: 126.9780 },
    'mexico city': { lat: 19.4326, lng: -99.1332 },
    'rio de janeiro': { lat: -22.9068, lng: -43.1729 },
    'sao paulo': { lat: -23.5505, lng: -46.6333 },
    'buenos aires': { lat: -34.6037, lng: -58.3816 },
    'santiago': { lat: -33.4489, lng: -70.6693 },
    'istanbul': { lat: 41.0082, lng: 28.9784 },
    'moscow': { lat: 55.7558, lng: 37.6173 },
    'dubai': { lat: 25.2048, lng: 55.2708 },
    'singapore': { lat: 1.3521, lng: 103.8198 },
    'hong kong': { lat: 22.3193, lng: 114.1694 },
    'bangkok': { lat: 13.7563, lng: 100.5018 },
    'san francisco': { lat: 37.7749, lng: -122.4194 },
    'miami': { lat: 25.7617, lng: -80.1918 },
    'seattle': { lat: 47.6062, lng: -122.3321 },
    'austin': { lat: 30.2672, lng: -97.7431 },
    'boston': { lat: 42.3601, lng: -71.0589 },
    'vancouver': { lat: 49.2827, lng: -123.1207 },
    'montreal': { lat: 45.5017, lng: -73.5673 },
    'amsterdam': { lat: 52.3676, lng: 4.9041 },
    'barcelona': { lat: 41.3851, lng: 2.1734 },
    'munich': { lat: 48.1351, lng: 11.5820 },
    'vienna': { lat: 48.2082, lng: 16.3738 },
    'prague': { lat: 50.0755, lng: 14.4378 },
    'budapest': { lat: 47.4979, lng: 19.0402 },
    'copenhagen': { lat: 55.6761, lng: 12.5683 },
    'stockholm': { lat: 59.3293, lng: 18.0686 },
    'oslo': { lat: 59.9139, lng: 10.7522 },
    'helsinki': { lat: 60.1699, lng: 24.9384 },
    'athens': { lat: 37.9838, lng: 23.7275 },
    // Add specific neighborhoods in Istanbul
    'kadikoy': { lat: 40.9906, lng: 29.0306 },
    'caddebostan': { lat: 40.9642, lng: 29.0634 },
    'besiktas': { lat: 41.0422, lng: 29.0083 },
    'sisli': { lat: 41.0602, lng: 28.9877 },
    'beyoglu': { lat: 41.0370, lng: 28.9850 },
    'fatih': { lat: 41.0186, lng: 28.9395 },
    'uskudar': { lat: 41.0233, lng: 29.0151 },
  };

  const normalizedLocation = location.toLowerCase();
  
  // Check for specific neighborhoods or districts first
  for (const key in mockGeoData) {
    if (normalizedLocation.includes(key)) {
      return {
        latitude: mockGeoData[key].lat,
        longitude: mockGeoData[key].lng,
      };
    }
  }
  
  // Fallback to a default location (New York) for demo purposes
  return { latitude: 40.7128, longitude: -74.0060 };
}

// Main search function that uses Google Maps API for geocoding
export async function searchPlaces(
  location: string,
  preferences: string[],
  budget: number,
  radius: number = 5000
): Promise<Place[]> {
  try {
    console.log(`Searching for places in ${location} with preferences: ${preferences.join(', ')}`);
    
    // Get coordinates for the location using Google Maps Geocoding
    const coordinates = await getCoordinatesForLocation(location);
    if (!coordinates) {
      throw new Error('Could not get coordinates for location');
    }
    
    // Try to use Google Places API if available
    try {
      if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        // First, try to search with the exact preferences
        let places = await searchWithGooglePlaces(coordinates, location, preferences, budget, radius);
        
        // If we got fewer than 10 places, try to get more with additional searches
        if (places.length < 10) {
          const additionalPlaces = await getAdditionalPlaces(coordinates, location, preferences, budget, radius);
          
          // Combine and deduplicate places
          const allPlaces = [...places];
          for (const place of additionalPlaces) {
            if (!allPlaces.some(p => p.id === place.id)) {
              allPlaces.push(place);
            }
          }
          
          return allPlaces.sort((a, b) => a.distance - b.distance);
        }
        
        return places;
      }
    } catch (error) {
      console.error('Error with Google Places API:', error);
    }
    
    // Fallback to generated data
    return generateMockPlaces(coordinates, location, preferences, budget, radius);
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
}

// Helper function to map user preferences to place types
function mapPreferencesToPlaceTypes(preferences: string[]): string[] {
  const typeMap: Record<string, string[]> = {
    // Food & Drink
    'steak': ['restaurant'],
    'whisky': ['bar'],
    'whiskey': ['bar'],
    'cocktails': ['bar'],
    'bar': ['bar'],
    'nightclub': ['night_club'],
    'club': ['night_club'],
    'restaurant': ['restaurant'],
    'food': ['restaurant'],
    'coffee': ['cafe'],
    'cafe': ['cafe'],
    'pizza': ['restaurant'],
    'burger': ['restaurant'],
    'sushi': ['restaurant'],
    'italian': ['restaurant'],
    'mexican': ['restaurant'],
    'chinese': ['restaurant'],
    'japanese': ['restaurant'],
    'indian': ['restaurant'],
    'thai': ['restaurant'],
    'vegetarian': ['restaurant'],
    'vegan': ['restaurant'],
    'bakery': ['bakery'],
    'dessert': ['bakery', 'cafe'],
    'ice cream': ['ice_cream'],
    'fast food': ['meal_takeaway', 'restaurant'],
    'takeaway': ['meal_takeaway'],
    'delivery': ['meal_delivery'],
    'breakfast': ['restaurant', 'cafe'],
    'lunch': ['restaurant'],
    'dinner': ['restaurant'],
    'brunch': ['restaurant', 'cafe'],
    'seafood': ['restaurant'],
    'fish': ['restaurant'],
    'meat': ['restaurant'],
    'grill': ['restaurant'],
    'bbq': ['restaurant'],
    'barbecue': ['restaurant'],
    'pub': ['bar'],
    'wine': ['bar'],
    'beer': ['bar'],
    'brewery': ['bar'],
    'lounge': ['bar', 'night_club'],
    'dance': ['night_club'],
    'dancing': ['night_club'],
    'music': ['night_club'],
    'live music': ['night_club', 'bar'],
    'jazz': ['night_club', 'bar'],
    'rock': ['night_club', 'bar'],
    'electronic': ['night_club'],
    'dj': ['night_club'],
    'karaoke': ['night_club', 'bar'],
    
    // Shopping
    'shop': ['store', 'shopping_mall', 'department_store'],
    'store': ['store', 'shopping_mall', 'department_store'],
    'market': ['grocery_or_supermarket', 'supermarket'],
    'supermarket': ['grocery_or_supermarket', 'supermarket'],
    'mall': ['shopping_mall'],
    'shopping': ['shopping_mall', 'department_store', 'store'],
    'boutique': ['clothing_store'],
    'clothes': ['clothing_store'],
    'fashion': ['clothing_store'],
    'shoes': ['shoe_store'],
    'jewelry': ['jewelry_store'],
    'electronics': ['electronics_store'],
    'books': ['book_store'],
    'furniture': ['furniture_store'],
    'hardware': ['hardware_store'],
    'grocery': ['grocery_or_supermarket'],
    
    // Accommodation
    'hotel': ['lodging', 'hotel'],
    'motel': ['lodging'],
    'hostel': ['lodging'],
    'resort': ['lodging'],
    'inn': ['lodging'],
    'bed and breakfast': ['lodging'],
    'apartment': ['real_estate_agency'],
    'accommodation': ['lodging'],
    'stay': ['lodging'],
    
    // Health & Beauty
    'spa': ['spa'],
    'massage': ['spa'],
    'salon': ['beauty_salon', 'hair_care'],
    'hair': ['hair_care', 'beauty_salon'],
    'nails': ['beauty_salon'],
    'beauty': ['beauty_salon'],
    'barber': ['hair_care'],
    'gym': ['gym'],
    'fitness': ['gym'],
    'yoga': ['gym'],
    'pilates': ['gym'],
    'wellness': ['spa', 'gym'],
    'health': ['health', 'doctor', 'hospital', 'pharmacy'],
    'doctor': ['doctor', 'health'],
    'dentist': ['dentist'],
    'hospital': ['hospital'],
    'clinic': ['doctor', 'health'],
    'pharmacy': ['pharmacy'],
    'drugstore': ['pharmacy'],
    
    // Entertainment & Recreation
    'movie': ['movie_theater'],
    'cinema': ['movie_theater'],
    'theater': ['movie_theater'],
    'theatre': ['movie_theater'],
    'concert': ['stadium'],
    'museum': ['museum'],
    'art': ['art_gallery', 'museum'],
    'gallery': ['art_gallery'],
    'park': ['park'],
    'garden': ['park'],
    'zoo': ['zoo'],
    'aquarium': ['aquarium'],
    'amusement': ['amusement_park'],
    'theme park': ['amusement_park'],
    'bowling': ['bowling_alley'],
    'casino': ['casino'],
    'game': ['bowling_alley', 'casino'],
    'arcade': ['amusement_park'],
    
    // Sports & Recreation
    'sports': ['stadium', 'gym'],
    'stadium': ['stadium'],
    'arena': ['stadium'],
    'golf': ['golf_course'],
    'tennis': ['gym'],
    'swimming': ['gym'],
    'pool': ['gym'],
    'beach': ['natural_feature'],
    'hiking': ['park', 'natural_feature'],
    'biking': ['park'],
    'cycling': ['park'],
    'running': ['park'],
    'football': ['stadium'],
    'soccer': ['stadium'],
    'basketball': ['stadium'],
    'baseball': ['stadium'],
    
    // Services
    'bank': ['bank', 'atm'],
    'atm': ['atm'],
    'post office': ['post_office'],
    'laundry': ['laundry'],
    'dry cleaning': ['laundry'],
    'gas': ['gas_station'],
    'petrol': ['gas_station'],
    'car': ['car_dealer', 'car_rental', 'car_repair', 'car_wash'],
    'rental': ['car_rental'],
    'repair': ['car_repair'],
    'wash': ['car_wash'],
    'police': ['police'],
    'fire': ['fire_station'],
    'library': ['library'],
    'school': ['school'],
    'university': ['university'],
    'college': ['university'],
    'church': ['church'],
    'mosque': ['mosque'],
    'temple': ['hindu_temple', 'buddhist_temple'],
    'synagogue': ['synagogue'],
    'worship': ['church', 'mosque', 'hindu_temple', 'buddhist_temple', 'synagogue'],
    
    // Transportation
    'airport': ['airport'],
    'train': ['train_station', 'transit_station'],
    'bus': ['bus_station', 'transit_station'],
    'subway': ['subway_station', 'transit_station'],
    'metro': ['subway_station', 'transit_station'],
    'taxi': ['taxi_stand'],
    'parking': ['parking'],
    'transit': ['transit_station'],
    'station': ['transit_station', 'train_station', 'bus_station', 'subway_station'],
    
    // Tourist Attractions
    'tourist': ['tourist_attraction'],
    'attraction': ['tourist_attraction'],
    'landmark': ['tourist_attraction'],
    'monument': ['tourist_attraction'],
    'sightseeing': ['tourist_attraction'],
    'tour': ['tourist_attraction', 'travel_agency'],
    'travel': ['travel_agency'],
    
    // Miscellaneous
    'local': ['point_of_interest'],
    'popular': ['point_of_interest'],
    'best': ['point_of_interest'],
    'top': ['point_of_interest'],
    'recommended': ['point_of_interest'],
    'famous': ['point_of_interest'],
    'hidden gem': ['point_of_interest'],
    'cheap': ['point_of_interest'],
    'expensive': ['point_of_interest'],
    'luxury': ['point_of_interest'],
    'budget': ['point_of_interest'],
    'family': ['point_of_interest'],
    'kids': ['point_of_interest'],
    'pet friendly': ['point_of_interest'],
    'outdoor': ['park', 'natural_feature'],
    'indoor': ['point_of_interest'],
    'view': ['point_of_interest'],
    'rooftop': ['point_of_interest'],
    'waterfront': ['point_of_interest'],
    'historic': ['point_of_interest'],
    'modern': ['point_of_interest'],
    'traditional': ['point_of_interest'],
    'authentic': ['point_of_interest'],
    'trendy': ['point_of_interest'],
    'hipster': ['point_of_interest'],
    'romantic': ['point_of_interest'],
    'quiet': ['point_of_interest'],
    'lively': ['point_of_interest'],
    'cozy': ['point_of_interest'],
    'elegant': ['point_of_interest'],
    'casual': ['point_of_interest'],
  };

  const types: string[] = [];
  
  preferences.forEach(pref => {
    const normalizedPref = pref.toLowerCase();
    if (typeMap[normalizedPref]) {
      types.push(...typeMap[normalizedPref]);
    } else {
      // If no specific mapping, add as a keyword search with point_of_interest
      types.push('point_of_interest');
    }
  });
  
  // Default to restaurants if no specific types are found
  if (types.length === 0) {
    types.push('restaurant');
  }
  
  return Array.from(new Set(types));  // Remove duplicates
}

// Search using Google Places API
async function searchWithGooglePlaces(
  coordinates: { latitude: number; longitude: number },
  location: string,
  preferences: string[],
  budget: number,
  radius: number
): Promise<Place[]> {
  return new Promise((resolve, reject) => {
    try {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );
      
      // Map user preferences to place types
      const placeTypes = mapPreferencesToPlaceTypes(preferences);
      console.log("Mapped place types:", placeTypes);
      
      // Determine price level based on budget
      // Google price levels: 0 (free) to 4 (expensive)
      let maxPriceLevel = 2; // Default to moderate
      if (budget <= 30) maxPriceLevel = 1;
      else if (budget <= 60) maxPriceLevel = 2;
      else if (budget <= 100) maxPriceLevel = 3;
      else maxPriceLevel = 4;
      
      const allResults: google.maps.places.PlaceResult[] = [];
      const searchPromises: Promise<google.maps.places.PlaceResult[]>[] = [];
      
      // IMPORTANT: We'll search for each type individually to ensure diversity
      for (let i = 0; i < Math.min(placeTypes.length, 5); i++) { // Limit to 5 types to avoid too many API calls
        const type = placeTypes[i];
        
        searchPromises.push(
          new Promise<google.maps.places.PlaceResult[]>((resolveSearch) => {
            const request = {
              location: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
              radius: radius,
              type: type,
              maxPriceLevel: maxPriceLevel
            };
            
            service.nearbySearch(request, (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                resolveSearch(results);
              } else {
                console.warn(`Google Places API returned status for type ${type}: ${status}`);
                resolveSearch([]);
              }
            });
          })
        );
      }
      
      // For each preference, do a direct keyword search
      for (const preference of preferences) {
        searchPromises.push(
          new Promise<google.maps.places.PlaceResult[]>((resolveSearch) => {
            const request = {
              location: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
              radius: radius,
              maxPriceLevel: maxPriceLevel,
              keyword: preference
            };
            
            service.nearbySearch(request, (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                resolveSearch(results);
              } else {
                console.warn(`Google Places API keyword search for "${preference}" returned status: ${status}`);
                resolveSearch([]);
              }
            });
          })
        );
      }
      
      // Wait for all searches to complete
      Promise.all(searchPromises).then((resultsArray) => {
        // Combine all results
        resultsArray.forEach(results => {
          allResults.push(...results);
        });
        
        // Deduplicate results based on place_id
        const uniqueResults: google.maps.places.PlaceResult[] = [];
        const seenIds = new Set<string>();
        
        allResults.forEach(result => {
          if (result.place_id && !seenIds.has(result.place_id)) {
            seenIds.add(result.place_id);
            uniqueResults.push(result);
          }
        });
        
        // Filter results to prioritize places that match the user's preferences
        const filteredResults = filterResultsByPreferences(uniqueResults, preferences);
        
        // Process results
        const places: Place[] = filteredResults.map((result, index) => {
          // Calculate a price based on the price level and budget
          const priceLevel = result.price_level || Math.floor(Math.random() * maxPriceLevel) + 1;
          const basePrice = priceLevel * 20;
          const price = Math.min(budget, basePrice + Math.floor(Math.random() * 20));
          
          // Calculate distance (if available)
          let distance = 0;
          if (result.geometry && result.geometry.location) {
            const placeLocation = result.geometry.location;
            const userLocation = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
            distance = google.maps.geometry.spherical.computeDistanceBetween(
              userLocation, 
              placeLocation
            );
          }
          
          // Extract categories from types
          const categories = result.types ? 
            result.types.map(type => type.replace(/_/g, ' ')).map(
              type => type.charAt(0).toUpperCase() + type.slice(1)
            ) : 
            preferences.map(p => p.charAt(0).toUpperCase() + p.slice(1));
          
          return {
            id: result.place_id || `place-${index}`,
            name: result.name || `Place ${index + 1}`,
            address: result.vicinity || `Address in ${location}`,
            city: location,
            categories: categories,
            rating: result.rating?.toString() || ((3 + Math.random() * 2).toFixed(1)),
            price: price,
            priceTier: priceLevel || Math.min(4, Math.ceil(budget / 125)),
            distance: distance || Math.random() * radius,
            latitude: result.geometry?.location?.lat() || coordinates.latitude + (Math.random() * 0.01 - 0.005),
            longitude: result.geometry?.location?.lng() || coordinates.longitude + (Math.random() * 0.01 - 0.005),
            imageUrl: result.photos && result.photos[0] ? 
              result.photos[0].getUrl({ maxWidth: 800, maxHeight: 600 }) : 
              `https://source.unsplash.com/random/800x600/?${preferences[0] || 'place'}`
          };
        });
        
        // Sort by distance
        resolve(places.sort((a, b) => a.distance - b.distance));
      }).catch(error => {
        console.error('Error in Google Places searches:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Error in Google Places search:', error);
      reject(error);
    }
  });
}

// Filter results to prioritize places that match the user's preferences
function filterResultsByPreferences(
  results: google.maps.places.PlaceResult[],
  preferences: string[]
): google.maps.places.PlaceResult[] {
  if (preferences.length === 0) return results;
  
  // Convert preferences to lowercase for case-insensitive matching
  const lowerPreferences = preferences.map(p => p.toLowerCase());
  
  // Score each result based on how well it matches the preferences
  const scoredResults = results.map(result => {
    let score = 0;
    
    // Check if the place types match any of the mapped preference types
    const placeTypes = result.types || [];
    const mappedTypes = mapPreferencesToPlaceTypes(preferences);
    
    for (const type of placeTypes) {
      if (mappedTypes.includes(type)) {
        score += 5; // High score for direct type match
      }
    }
    
    // Check if the place name contains any of the preferences
    const name = (result.name || '').toLowerCase();
    for (const pref of lowerPreferences) {
      if (name.includes(pref)) {
        score += 3; // Medium score for name match
      }
    }
    
    // Check if the place vicinity contains any of the preferences
    const vicinity = (result.vicinity || '').toLowerCase();
    for (const pref of lowerPreferences) {
      if (vicinity.includes(pref)) {
        score += 1; // Low score for vicinity match
      }
    }
    
    // Boost score for places with photos (they're usually better quality listings)
    if (result.photos && result.photos.length > 0) {
      score += 2;
    }
    
    // Boost score for places with high ratings
    if (result.rating && result.rating >= 4) {
      score += 2;
    }
    
    return { result, score };
  });
  
  // Sort by score (descending) and filter out low-scoring results
  scoredResults.sort((a, b) => b.score - a.score);
  
  // Only keep results with a minimum score (more relevant)
  // or keep all if we have too few results
  const minScore = scoredResults.length > 20 ? 3 : 0;
  const filteredResults = scoredResults
    .filter(item => item.score >= minScore)
    .map(item => item.result);
  
  return filteredResults;
}

// Get additional places by searching with different types and keywords
async function getAdditionalPlaces(
  coordinates: { latitude: number; longitude: number },
  location: string,
  preferences: string[],
  budget: number,
  radius: number
): Promise<Place[]> {
  // Create a div for the PlacesService
  const placesDiv = document.createElement('div');
  const service = new google.maps.places.PlacesService(placesDiv);
  
  // Map user preferences to place types
  const placeTypes = mapPreferencesToPlaceTypes(preferences);
  
  // Additional search types to try - expanded to include more diverse place types
  const additionalTypes = [
    // Food & Drink
    'restaurant', 'bar', 'cafe', 'bakery', 'meal_takeaway', 'night_club',
    
    // Accommodation
    'lodging', 'hotel',
    
    // Shopping
    'shopping_mall', 'department_store', 'clothing_store', 'shoe_store', 'jewelry_store',
    'electronics_store', 'book_store', 'furniture_store', 'hardware_store', 'grocery_or_supermarket',
    
    // Health & Beauty
    'spa', 'beauty_salon', 'hair_care', 'gym',
    
    // Entertainment & Recreation
    'movie_theater', 'museum', 'art_gallery', 'park', 'zoo', 'aquarium', 'amusement_park',
    'bowling_alley', 'casino',
    
    // Sports & Recreation
    'stadium', 'golf_course',
    
    // Services
    'bank', 'atm', 'post_office', 'laundry', 'gas_station', 'car_dealer', 'car_rental',
    'car_repair', 'car_wash', 'police', 'fire_station', 'library', 'school', 'university',
    
    // Religious Places
    'church', 'mosque', 'hindu_temple', 'buddhist_temple', 'synagogue',
    
    // Transportation
    'airport', 'train_station', 'bus_station', 'subway_station', 'taxi_stand', 'parking',
    
    // Tourist Attractions
    'tourist_attraction', 'travel_agency',
    
    // Miscellaneous
    'point_of_interest', 'natural_feature'
  ];
  
  // Determine price level based on budget
  let maxPriceLevel = 2; // Default to moderate
  if (budget <= 30) maxPriceLevel = 1;
  else if (budget <= 60) maxPriceLevel = 2;
  else if (budget <= 100) maxPriceLevel = 3;
  else maxPriceLevel = 4;
  
  const allPlaces: Place[] = [];
  const searchPromises: Promise<Place[]>[] = [];
  
  // Create a function to perform a single search
  const performSearch = (type: string, keyword?: string): Promise<Place[]> => {
    return new Promise((resolve) => {
      const request = {
        location: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
        radius: radius,
        type: type,
        maxPriceLevel: maxPriceLevel,
        keyword: keyword
      };
      
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Process results
          const places: Place[] = results.map((result, index) => {
            // Calculate a price based on the price level and budget
            const priceLevel = result.price_level || Math.floor(Math.random() * maxPriceLevel) + 1;
            const basePrice = priceLevel * 20;
            const price = Math.min(budget, basePrice + Math.floor(Math.random() * 20));
            
            // Calculate distance
            let distance = 0;
            if (result.geometry && result.geometry.location) {
              const placeLocation = result.geometry.location;
              const userLocation = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
              distance = google.maps.geometry.spherical.computeDistanceBetween(
                userLocation, 
                placeLocation
              );
            }
            
            // Extract categories from types
            const categories = result.types ? 
              result.types.map(type => type.replace(/_/g, ' ')).map(
                type => type.charAt(0).toUpperCase() + type.slice(1)
              ) : 
              [type.charAt(0).toUpperCase() + type.slice(1)];
            
            return {
              id: result.place_id || `place-${type}-${index}`,
              name: result.name || `Place ${index + 1}`,
              address: result.vicinity || `Address in ${location}`,
              city: location,
              categories: categories,
              rating: result.rating?.toString() || ((3 + Math.random() * 2).toFixed(1)),
              price: price,
              priceTier: priceLevel || Math.min(4, Math.ceil(budget / 125)),
              distance: distance || Math.random() * radius,
              latitude: result.geometry?.location?.lat() || coordinates.latitude + (Math.random() * 0.01 - 0.005),
              longitude: result.geometry?.location?.lng() || coordinates.longitude + (Math.random() * 0.01 - 0.005),
              imageUrl: result.photos && result.photos[0] ? 
                result.photos[0].getUrl({ maxWidth: 800, maxHeight: 600 }) : 
                `https://source.unsplash.com/random/800x600/?${keyword || type}`
            };
          });
          
          resolve(places);
        } else {
          console.warn(`Additional search for ${type} returned status: ${status}`);
          resolve([]);
        }
      });
    });
  };
  
  // First, prioritize searching with the exact preference types
  for (const pref of preferences) {
    // Get the mapped types for this preference
    const relevantTypes = mapPreferencesToPlaceTypes([pref]);
    
    // Search with each relevant type
    for (const type of relevantTypes) {
      searchPromises.push(performSearch(type, pref));
    }
    
    // Also do a direct keyword search with the preference
    searchPromises.push(
      new Promise<Place[]>((resolveSearch) => {
        const request = {
          location: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
          radius: radius,
          keyword: pref
        };
        
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            // Filter results to only include those that are likely to match the preference
            const filteredResults = results.filter(result => {
              // Check if the place name contains the preference
              if (result.name && result.name.toLowerCase().includes(pref.toLowerCase())) {
                return true;
              }
              
              // Check if any of the place types match the mapped types
              if (result.types) {
                for (const type of result.types) {
                  if (relevantTypes.includes(type)) {
                    return true;
                  }
                }
              }
              
              return false;
            });
            
            // Process results
            const places: Place[] = filteredResults.map((result, index) => {
              // Calculate a price based on the price level and budget
              const priceLevel = result.price_level || Math.floor(Math.random() * maxPriceLevel) + 1;
              const basePrice = priceLevel * 20;
              const price = Math.min(budget, basePrice + Math.floor(Math.random() * 20));
              
              // Calculate distance
              let distance = 0;
              if (result.geometry && result.geometry.location) {
                const placeLocation = result.geometry.location;
                const userLocation = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
                distance = google.maps.geometry.spherical.computeDistanceBetween(
                  userLocation, 
                  placeLocation
                );
              }
              
              // Extract categories from types
              const categories = result.types ? 
                result.types.map(type => type.replace(/_/g, ' ')).map(
                  type => type.charAt(0).toUpperCase() + type.slice(1)
                ) : 
                [pref.charAt(0).toUpperCase() + pref.slice(1)];
              
              return {
                id: result.place_id || `place-keyword-${index}`,
                name: result.name || `Place ${index + 1}`,
                address: result.vicinity || `Address in ${location}`,
                city: location,
                categories: categories,
                rating: result.rating?.toString() || ((3 + Math.random() * 2).toFixed(1)),
                price: price,
                priceTier: priceLevel || Math.min(4, Math.ceil(budget / 125)),
                distance: distance || Math.random() * radius,
                latitude: result.geometry?.location?.lat() || coordinates.latitude + (Math.random() * 0.01 - 0.005),
                longitude: result.geometry?.location?.lng() || coordinates.longitude + (Math.random() * 0.01 - 0.005),
                imageUrl: result.photos && result.photos[0] ? 
                  result.photos[0].getUrl({ maxWidth: 800, maxHeight: 600 }) : 
                  `https://source.unsplash.com/random/800x600/?${pref}`
              };
            });
            
            resolveSearch(places);
          } else {
            console.warn(`Keyword search for "${pref}" returned status: ${status}`);
            resolveSearch([]);
          }
        });
      })
    );
  }
  
  // Wait for all searches to complete
  const results = await Promise.all(searchPromises);
  
  // Combine all results
  for (const places of results) {
    allPlaces.push(...places);
  }
  
  // Remove duplicates based on place ID
  const uniquePlaces: Place[] = [];
  const seenIds = new Set<string>();
  
  for (const place of allPlaces) {
    if (!seenIds.has(place.id)) {
      seenIds.add(place.id);
      uniquePlaces.push(place);
    }
  }
  
  // Filter results to prioritize places that match the user's preferences
  return uniquePlaces.filter(place => {
    // Check if any of the place categories match the user's preferences
    for (const pref of preferences) {
      const normalizedPref = pref.toLowerCase();
      
      // Check if the place name contains the preference
      if (place.name.toLowerCase().includes(normalizedPref)) {
        return true;
      }
      
      // Check if any of the place categories match the preference
      for (const category of place.categories) {
        if (category.toLowerCase().includes(normalizedPref)) {
          return true;
        }
      }
    }
    
    // If no match found, check if the place types match the mapped preference types
    const mappedTypes = mapPreferencesToPlaceTypes(preferences);
    for (const category of place.categories) {
      const normalizedCategory = category.toLowerCase().replace(/\s+/g, '_');
      if (mappedTypes.includes(normalizedCategory)) {
        return true;
      }
    }
    
    // If we have very few results, keep this place anyway
    return uniquePlaces.length < 10;
  });
}

// Generate mock places as a fallback
function generateMockPlaces(
  coordinates: { latitude: number; longitude: number },
  location: string,
  preferences: string[],
  budget: number,
  radius: number
): Place[] {
  // Generate mock data based on preferences and budget
  const mockPlaces: Place[] = [];
  
  // Map preferences to place types to ensure diverse results
  const placeTypes = mapPreferencesToPlaceTypes(preferences);
  
  // Use preferences or default categories
  const categories = preferences.length > 0 
    ? preferences.map(p => p.charAt(0).toUpperCase() + p.slice(1)) 
    : ['Restaurant', 'Bar', 'Cafe', 'Bistro', 'Pub'];
  
  // Generate place names based on categories and location
  const placeNamePrefixes = [
    'The', 'Royal', 'Golden', 'Silver', 'Blue', 'Red', 'Green', 
    'Vintage', 'Urban', 'Downtown', 'Uptown', 'Classic', 'Modern',
    'Fusion', 'Artisan', 'Gourmet', 'Premium', 'Elite', 'Local'
  ];
  
  const placeNameSuffixes = [
    'House', 'Spot', 'Place', 'Corner', 'Junction', 'Hub',
    'Lounge', 'Grill', 'Kitchen', 'Eatery', 'Diner', 'Bistro'
  ];
  
  // Get local street names based on the location
  const streetNames = getLocalStreetNames(location);
  
  // Generate 30-50 random places for more comprehensive results
  const numPlaces = 30 + Math.floor(Math.random() * 20);
  
  // Create a mapping of place types to business name templates
  const placeTypeNameTemplates: Record<string, { prefixes: string[], suffixes: string[] }> = {
    'restaurant': {
      prefixes: ['Gourmet', 'Tasty', 'Delicious', 'Savory', 'Fresh', 'Organic'],
      suffixes: ['Restaurant', 'Eatery', 'Bistro', 'Kitchen', 'Grill', 'Diner']
    },
    'cafe': {
      prefixes: ['Cozy', 'Morning', 'Sunny', 'Artisan', 'Brew'],
      suffixes: ['Cafe', 'Coffee', 'Espresso', 'Bakery', 'Roasters']
    },
    'bar': {
      prefixes: ['Vintage', 'Classic', 'Urban', 'Night', 'Craft'],
      suffixes: ['Bar', 'Lounge', 'Pub', 'Tavern', 'Spirits']
    },
    'hotel': {
      prefixes: ['Grand', 'Royal', 'Luxury', 'Comfort', 'Premium'],
      suffixes: ['Hotel', 'Inn', 'Suites', 'Resort', 'Lodge']
    },
    'spa': {
      prefixes: ['Tranquil', 'Serene', 'Relaxing', 'Zen', 'Peaceful'],
      suffixes: ['Spa', 'Wellness', 'Retreat', 'Massage', 'Relaxation']
    },
    'gym': {
      prefixes: ['Power', 'Fitness', 'Strong', 'Elite', 'Active'],
      suffixes: ['Gym', 'Fitness', 'Training', 'Athletics', 'Club']
    },
    'shopping_mall': {
      prefixes: ['Grand', 'City', 'Metro', 'Central', 'Plaza'],
      suffixes: ['Mall', 'Center', 'Galleria', 'Shops', 'Outlets']
    },
    'park': {
      prefixes: ['Green', 'Central', 'Memorial', 'City', 'National'],
      suffixes: ['Park', 'Gardens', 'Reserve', 'Fields', 'Commons']
    },
    'museum': {
      prefixes: ['National', 'Modern', 'Contemporary', 'Historical', 'Science'],
      suffixes: ['Museum', 'Gallery', 'Exhibition', 'Collection', 'Center']
    },
    'hospital': {
      prefixes: ['General', 'Community', 'Memorial', 'Regional', 'University'],
      suffixes: ['Hospital', 'Medical Center', 'Clinic', 'Care', 'Health']
    }
  };
  
  for (let i = 0; i < numPlaces; i++) {
    // Determine price tier based on budget
    const priceTier = Math.min(4, Math.max(1, Math.ceil(budget / 125)));
    
    // Calculate price within budget
    const minPrice = Math.max(10, budget * 0.3);
    const maxPrice = budget * 0.9;
    const price = Math.floor(minPrice + Math.random() * (maxPrice - minPrice));
    
    // Calculate a random distance within the radius
    const randomDistance = Math.random() * radius;
    
    // Generate a random angle
    const angle = Math.random() * 2 * Math.PI;
    
    // Calculate random offset for latitude and longitude based on distance and angle
    const lat = coordinates.latitude;
    const lng = coordinates.longitude;
    
    // Convert distance from meters to degrees (approximate)
    // 111,111 meters = 1 degree of latitude
    // For longitude, 1 degree = 111,111 * cos(latitude) meters
    const latOffset = (randomDistance / 111111) * Math.cos(angle);
    const lngOffset = (randomDistance / (111111 * Math.cos(lat * Math.PI / 180))) * Math.sin(angle);
    
    // Select a random place type from the mapped types or use a default
    let placeType = 'restaurant';
    if (placeTypes.length > 0) {
      placeType = placeTypes[Math.floor(Math.random() * placeTypes.length)];
    }
    
    // Generate a realistic place name based on the place type
    let placeName = '';
    
    if (placeTypeNameTemplates[placeType]) {
      const template = placeTypeNameTemplates[placeType];
      const prefix = template.prefixes[Math.floor(Math.random() * template.prefixes.length)];
      const suffix = template.suffixes[Math.floor(Math.random() * template.suffixes.length)];
      
      if (Math.random() > 0.5) {
        placeName = `${prefix} ${suffix}`;
      } else {
        placeName = `The ${prefix} ${suffix}`;
      }
    } else {
      // Fallback to generic name generation
      const usePrefix = Math.random() > 0.3; // 70% chance to use a prefix
      const useSuffix = Math.random() > 0.4; // 60% chance to use a suffix
      
      if (usePrefix) if (usePrefix) {
        placeName += placeNamePrefixes[Math.floor(Math.random() * placeNamePrefixes.length)] + ' ';
      }
      
      // Add the category or a variation of it to the name
      if (Math.random() > 0.5) {
        placeName += categories[Math.floor(Math.random() * categories.length)] + ' ';
      } else if (placeType.toLowerCase() === 'restaurant') {
        const cuisineTypes = getLocalCuisines(location);
        placeName += cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)] + ' ';
      }
      
      if (useSuffix) {
        placeName += placeNameSuffixes[Math.floor(Math.random() * placeNameSuffixes.length)];
      } else if (placeName.trim() === '') {
        // Ensure we have at least something in the name
        placeName = placeType.charAt(0).toUpperCase() + placeType.slice(1) + ' ' + (i + 1);
      }
    }
    
    // Generate a realistic address
    const streetNumber = 100 + Math.floor(Math.random() * 900);
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    const address = `${streetNumber} ${streetName}`;
    
    // Generate a realistic rating (weighted toward higher ratings)
    const baseRating = 3.5 + (Math.random() * 1.5);
    const rating = baseRating.toFixed(1);
    
    // Create additional categories based on the main category
    const additionalCategories: string[] = [];
    if (placeType.toLowerCase() === 'restaurant') {
      const cuisineTypes = getLocalCuisines(location);
      additionalCategories.push(cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)]);
    } else if (placeType.toLowerCase() === 'bar') {
      const barTypes = getLocalBarTypes(location);
      additionalCategories.push(barTypes[Math.floor(Math.random() * barTypes.length)]);
    }
    
    // Convert place type to a more readable format for categories
    const readableType = placeType.replace(/_/g, ' ');
    const formattedType = readableType.charAt(0).toUpperCase() + readableType.slice(1);
    
    // Add the place to our list
    mockPlaces.push({
      id: `place-${i}`,
      name: placeName.trim(),
      address: address,
      city: location,
      categories: [formattedType, ...additionalCategories],
      rating: rating,
      price: price,
      priceTier: priceTier,
      distance: randomDistance,
      latitude: lat + latOffset,
      longitude: lng + lngOffset,
      imageUrl: `https://source.unsplash.com/random/800x600/?${placeType.toLowerCase()},${location.toLowerCase()}`,
    });
  }
  
  // Sort by distance
  return mockPlaces.sort((a, b) => a.distance - b.distance);
}

// Helper function to get location-specific street names
function getLocalStreetNames(location: string): string[] {
  const normalizedLocation = location.toLowerCase();
  
  // Street name patterns by region/country
  const streetPatterns: Record<string, string[]> = {
    // US/Canada
    'new york': ['Broadway', 'Park Ave', '5th Ave', 'Madison Ave', 'Lexington Ave', 'Wall St'],
    'los angeles': ['Sunset Blvd', 'Hollywood Blvd', 'Rodeo Dr', 'Melrose Ave', 'Wilshire Blvd'],
    'chicago': ['Michigan Ave', 'State St', 'Wacker Dr', 'Clark St', 'Lake Shore Dr'],
    'toronto': ['Yonge St', 'Queen St', 'King St', 'Bloor St', 'Dundas St'],
    
    // UK
    'london': ['Oxford St', 'Regent St', 'Baker St', 'Bond St', 'Piccadilly'],
    
    // France
    'paris': ['Rue de Rivoli', 'Avenue des Champs-Élysées', 'Boulevard Saint-Germain', 'Rue Saint-Honoré'],
    
    // Turkey
    'istanbul': ['İstiklal Caddesi', 'Bağdat Caddesi', 'Abdi İpekçi Caddesi', 'Nispetiye Caddesi', 'Barbaros Bulvarı'],
    'kadikoy': ['Bahariye Caddesi', 'Moda Caddesi', 'Söğütlüçeşme Caddesi', 'Karakolhane Caddesi', 'Mühürdar Caddesi'],
    'caddebostan': ['Bağdat Caddesi', 'Operatör Cemil Topuzlu Caddesi', 'Göztepe Caddesi', 'Cemil Topuzlu Caddesi'],
    'besiktas': ['Barbaros Bulvarı', 'Çırağan Caddesi', 'Nispetiye Caddesi', 'Ihlamurdere Caddesi'],
    'sisli': ['Halaskargazi Caddesi', 'Büyükdere Caddesi', 'Rumeli Caddesi', 'Teşvikiye Caddesi'],
    'beyoglu': ['İstiklal Caddesi', 'Meşrutiyet Caddesi', 'Siraselviler Caddesi', 'Tarlabaşı Bulvarı'],
    'uskudar': ['Bağlarbaşı Caddesi', 'Altunizade Caddesi', 'Nuhkuyusu Caddesi', 'Selimiye Caddesi'],
    
    // Japan
    'tokyo': ['Ginza Dori', 'Omotesando', 'Takeshita Dori', 'Nakamise Dori', 'Chuo Dori'],
    
    // Australia
    'sydney': ['George St', 'Pitt St', 'Oxford St', 'Crown St', 'King St'],
    
    // Germany
    'berlin': ['Unter den Linden', 'Kurfürstendamm', 'Friedrichstraße', 'Alexanderplatz', 'Potsdamer Platz'],
    
    // Italy
    'rome': ['Via del Corso', 'Via Veneto', 'Via Condotti', 'Via Nazionale', 'Via Appia Antica'],
    
    // Spain
    'madrid': ['Gran Vía', 'Calle de Alcalá', 'Paseo del Prado', 'Calle Mayor', 'Calle de Serrano'],
    
    // Default street names for any location
    'default': ['Main St', 'High St', 'Park Ave', 'Market St', 'Broadway', 'Church St', 'Station Rd']
  };
  
  // Check if we have specific street names for this location
  for (const key in streetPatterns) {
    if (normalizedLocation.includes(key)) {
      return streetPatterns[key];
    }
  }
  
  // Fallback to default street names
  return streetPatterns['default'];
}

// Helper function to get local cuisines based on location
function getLocalCuisines(location: string): string[] {
  const normalizedLocation = location.toLowerCase();
  
  // Cuisine types by region/country
  const cuisinePatterns: Record<string, string[]> = {
    // US
    'new york': ['Pizza', 'Bagel', 'Deli', 'Italian', 'Chinese', 'American'],
    'los angeles': ['Mexican', 'Korean', 'Sushi', 'Vegan', 'Fusion', 'Taco'],
    'chicago': ['Deep Dish Pizza', 'Hot Dog', 'Italian Beef', 'Steakhouse', 'Polish'],
    'san francisco': ['Seafood', 'Sourdough', 'Chinese', 'Mexican', 'Farm-to-Table'],
    'new orleans': ['Cajun', 'Creole', 'Seafood', 'Gumbo', 'Po Boy'],
    'miami': ['Cuban', 'Caribbean', 'Seafood', 'Latin', 'Fusion'],
    
    // Europe
    'london': ['Fish & Chips', 'Indian', 'Pub Food', 'British', 'Middle Eastern'],
    'paris': ['French', 'Bistro', 'Patisserie', 'Boulangerie', 'Wine Bar'],
    'rome': ['Italian', 'Pizza', 'Pasta', 'Gelato', 'Espresso'],
    'barcelona': ['Tapas', 'Paella', 'Catalan', 'Seafood', 'Spanish'],
    'berlin': ['German', 'Currywurst', 'Turkish', 'Döner', 'International'],
    'amsterdam': ['Dutch', 'Pancake', 'Cheese', 'Herring', 'Indonesian'],
    
    // Asia
    'tokyo': ['Sushi', 'Ramen', 'Izakaya', 'Tempura', 'Yakitori'],
    'bangkok': ['Thai', 'Street Food', 'Curry', 'Noodle', 'Seafood'],
    'hong kong': ['Dim Sum', 'Cantonese', 'Seafood', 'Roast', 'Noodle'],
    'singapore': ['Hawker', 'Laksa', 'Chili Crab', 'Chinese', 'Indian'],
    'seoul': ['Korean BBQ', 'Bibimbap', 'Fried Chicken', 'Kimchi', 'Street Food'],
    'mumbai': ['Indian', 'Street Food', 'Curry', 'Tandoori', 'Vegetarian'],
    
    // Middle East
    'istanbul': ['Turkish', 'Kebab', 'Mezes', 'Seafood', 'Baklava'],
    'dubai': ['Arabic', 'Lebanese', 'Indian', 'International', 'Seafood'],
    
    // Australia
    'sydney': ['Seafood', 'Modern Australian', 'Asian Fusion', 'Brunch', 'Coffee'],
    'melbourne': ['Coffee', 'Brunch', 'Italian', 'Greek', 'Vietnamese'],
    
    // South America
    'buenos aires': ['Steak', 'Empanadas', 'Argentinian', 'Italian', 'Parrilla'],
    'rio de janeiro': ['Brazilian', 'Churrasco', 'Seafood', 'Feijoada', 'Street Food'],
    
    // Default cuisines for any location
    'default': ['Local', 'International', 'Fusion', 'Traditional', 'Modern', 'Bistro', 'Grill']
  };
  
  // Check if we have specific cuisines for this location
  for (const key in cuisinePatterns) {
    if (normalizedLocation.includes(key)) {
      return cuisinePatterns[key];
    }
  }
  
  // Fallback to default cuisines
  return cuisinePatterns['default'];
}

// Helper function to get local bar types based on location
function getLocalBarTypes(location: string): string[] {
  const normalizedLocation = location.toLowerCase();
  
  // Bar types by region/country
  const barPatterns: Record<string, string[]> = {
    // US
    'new york': ['Cocktail Bar', 'Speakeasy', 'Rooftop Bar', 'Dive Bar', 'Wine Bar'],
    'los angeles': ['Rooftop Bar', 'Cocktail Lounge', 'Beach Bar', 'Wine Bar', 'Craft Beer'],
    'chicago': ['Sports Bar', 'Cocktail Bar', 'Brewery', 'Jazz Bar', 'Dive Bar'],
    'san francisco': ['Craft Beer', 'Wine Bar', 'Cocktail Bar', 'Brewpub', 'Speakeasy'],
    'new orleans': ['Jazz Bar', 'Cocktail Bar', 'Historic Bar', 'Dive Bar', 'Bourbon Bar'],
    'miami': ['Beach Bar', 'Nightclub', 'Cocktail Bar', 'Rooftop Bar', 'Latin Bar'],
    
    // Europe
    'london': ['Pub', 'Cocktail Bar', 'Wine Bar', 'Gin Bar', 'Historic Tavern'],
    'paris': ['Wine Bar', 'Cocktail Bar', 'Café Bar', 'Jazz Bar', 'Bistro Bar'],
    'rome': ['Wine Bar', 'Aperitivo Bar', 'Cocktail Bar', 'Rooftop Bar', 'Café Bar'],
    'barcelona': ['Tapas Bar', 'Wine Bar', 'Cocktail Bar', 'Beach Bar', 'Vermouth Bar'],
    'berlin': ['Beer Garden', 'Cocktail Bar', 'Club Bar', 'Craft Beer', 'Dive Bar'],
    'amsterdam': ['Brown Café', 'Cocktail Bar', 'Beer Bar', 'Canal Bar', 'Jenever Bar'],
    
    // Asia
    'tokyo': ['Izakaya', 'Whisky Bar', 'Beer Bar', 'Cocktail Bar', 'Sake Bar'],
    'bangkok': ['Rooftop Bar', 'Cocktail Bar', 'Beer Bar', 'Night Market Bar', 'Club Bar'],
    'hong kong': ['Rooftop Bar', 'Cocktail Bar', 'Wine Bar', 'Speakeasy', 'Club Bar'],
    'singapore': ['Cocktail Bar', 'Rooftop Bar', 'Speakeasy', 'Craft Beer', 'Hotel Bar'],
    'seoul': ['Soju Bar', 'Craft Beer', 'Cocktail Bar', 'Makgeolli Bar', 'Club Bar'],
    
    // Middle East
    'istanbul': ['Meyhane', 'Rooftop Bar', 'Cocktail Bar', 'Raki Bar', 'Nargile Café'],
    'dubai': ['Rooftop Bar', 'Beach Bar', 'Cocktail Bar', 'Hotel Bar', 'Club Bar'],
    
    // Australia
    'sydney': ['Beach Bar', 'Pub', 'Cocktail Bar', 'Wine Bar', 'Rooftop Bar'],
    'melbourne': ['Laneway Bar', 'Cocktail Bar', 'Wine Bar', 'Rooftop Bar', 'Pub'],
    
    // Default bar types for any location
    'default': ['Bar', 'Pub', 'Cocktail Bar', 'Wine Bar', 'Beer Bar', 'Lounge', 'Tavern']
  };
  
  // Check if we have specific bar types for this location
  for (const key in barPatterns) {
    if (normalizedLocation.includes(key)) {
      return barPatterns[key];
    }
  }
  
  // Fallback to default bar types
  return barPatterns['default'];
}