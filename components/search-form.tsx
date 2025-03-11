"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Search, DollarSign, Navigation, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SearchFormProps {
  onSearch: (location: string, preferences: string[], budget: number, radius: number) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [location, setLocation] = useState('');
  const [preference, setPreference] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [budget, setBudget] = useState(100);
  const [radius, setRadius] = useState(5);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const { toast } = useToast();

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!locationInputRef.current || autocomplete) return;

    try {
      if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const newAutocomplete = new google.maps.places.Autocomplete(locationInputRef.current, {
          // Allow all types of locations, not just cities
          types: [], 
          fields: ['formatted_address', 'geometry', 'name', 'address_components']
        });
        
        newAutocomplete.addListener('place_changed', () => {
          const place = newAutocomplete.getPlace();
          if (place.formatted_address) {
            setLocation(place.formatted_address);
          } else if (place.name) {
            setLocation(place.name);
          }
        });
        
        setAutocomplete(newAutocomplete);
      }
    } catch (error) {
      console.error('Error initializing Places Autocomplete:', error);
    }
  }, [autocomplete]);

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setGettingLocation(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Use Google Maps Geocoder to get address from coordinates
            if (typeof google !== 'undefined' && google.maps && google.maps.Geocoder) {
              const geocoder = new google.maps.Geocoder();
              const latlng = { lat: latitude, lng: longitude };
              
              geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                  // Use the most detailed address available
                  setLocation(results[0].formatted_address);
                  toast({
                    title: "Location detected",
                    description: `Using your current location: ${results[0].formatted_address}`,
                  });
                } else {
                  console.warn(`Reverse geocoding failed: ${status}`);
                  setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                  toast({
                    title: "Location detected",
                    description: `Using coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                  });
                }
                setGettingLocation(false);
              });
            } else {
              setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              toast({
                title: "Location detected",
                description: `Using coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              });
              setGettingLocation(false);
            }
          } catch (error) {
            console.error('Error getting location:', error);
            toast({
              title: "Error",
              description: "Could not detect your location. Please enter it manually.",
              variant: "destructive"
            });
            setGettingLocation(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Error",
            description: "Could not access your location. Please check your browser permissions.",
            variant: "destructive"
          });
          setGettingLocation(false);
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleAddPreference = () => {
    if (preference.trim() && !preferences.includes(preference.trim())) {
      setPreferences([...preferences, preference.trim()]);
      setPreference('');
    }
  };

  const handleRemovePreference = (pref: string) => {
    setPreferences(preferences.filter(p => p !== pref));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location, preferences, budget, radius * 1000); // Convert km to meters
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPreference();
    }
  };

  // Popular preference suggestions - expanded to include more diverse options
  const popularPreferences = [
    // Food & Drink
    'Restaurant', 'Bar', 'Cafe', 'Pizza', 'Coffee',
    // Shopping
    'Shopping', 'Mall', 'Boutique',
    // Accommodation
    'Hotel', 'Resort',
    // Health & Beauty
    'Spa', 'Massage', 'Salon', 'Gym',
    // Entertainment
    'Museum', 'Cinema', 'Park', 'Theater',
    // Services
    'Hospital', 'Pharmacy', 'Bank', 'Gas Station'
  ];

  const addPopularPreference = (pref: string) => {
    if (!preferences.includes(pref)) {
      setPreferences([...preferences, pref]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full" style={{transform: 'translateZ(0)', willChange: 'transform', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden'}}>
      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
          <MapPin size={16} className="text-accent" />
          Location
        </Label>
        <div className="flex gap-2">
          <Input
            id="location"
            ref={locationInputRef}
            placeholder="Enter exact address or location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="search-input bg-secondary/50 border-accent/20 focus:border-accent"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={getCurrentLocation}
            disabled={gettingLocation}
            title="Use current location"
            className="bg-secondary/50 border-accent/20 hover:bg-accent/20"
          >
            {gettingLocation ? (
              <Loader2 size={16} className="animate-spin text-accent" />
            ) : (
              <Navigation size={16} className="text-accent" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferences" className="flex items-center gap-2 text-sm font-medium">
          <Search size={16} className="text-accent" />
          Preferences
        </Label>
        <div className="flex gap-2">
          <Input
            id="preferences"
            placeholder="e.g., spa, hotel, museum, park"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input bg-secondary/50 border-accent/20 focus:border-accent"
          />
          <Button 
            type="button" 
            onClick={handleAddPreference} 
            variant="secondary"
            className="bg-secondary/50 border-accent/20 hover:bg-accent/20"
          >
            Add
          </Button>
        </div>
        
        {preferences.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {preferences.map((pref) => (
              <Badge key={pref} variant="secondary" className="bg-accent/20 text-foreground border-accent/30 flex items-center gap-1">
                {pref}
                <button 
                  type="button" 
                  onClick={() => handleRemovePreference(pref)}
                  className="ml-1 rounded-full hover:bg-accent/30 p-0.5"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Sparkles size={12} className="text-accent" />
            Popular:
          </p>
          <div className="flex flex-wrap gap-1">
            {popularPreferences.map((pref) => (
              <Badge 
                key={pref} 
                variant="outline" 
                className="cursor-pointer bg-secondary/30 hover:bg-accent/20 border-accent/20"
                onClick={() => addPopularPreference(pref)}
              >
                {pref}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex justify-between">
          <Label htmlFor="budget" className="flex items-center gap-2 text-sm font-medium">
            <DollarSign size={16} className="text-accent" />
            Budget: <span className="text-accent font-semibold ml-1">${budget}</span>
          </Label>
        </div>
        <div className="slider-wrapper" style={{transform: 'translateZ(0)', willChange: 'transform', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden'}}>
          <Slider
            id="budget"
            min={20}
            max={500}
            step={10}
            value={[budget]}
            onValueChange={(value) => setBudget(value[0])}
            className="py-2 slider-custom"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$20</span>
          <span>$500</span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex justify-between">
          <Label htmlFor="radius" className="flex items-center gap-2 text-sm font-medium">
            <MapPin size={16} className="text-accent" />
            Distance: <span className="text-accent font-semibold ml-1">{radius} km</span>
          </Label>
        </div>
        <div className="slider-wrapper" style={{transform: 'translateZ(0)', willChange: 'transform', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden'}}>
          <Slider
            id="radius"
            min={1}
            max={20}
            step={1}
            value={[radius]}
            onValueChange={(value) => setRadius(value[0])}
            className="py-2 slider-custom"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 km</span>
          <span>20 km</span>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6 bg-[#97cfda] text-primary hover:bg-[#97cfda]/90 font-medium"
        disabled={isLoading}
        style={{transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden'}}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Searching...
          </>
        ) : (
          'Find Places'
        )}
      </Button>
    </form>
  );
}