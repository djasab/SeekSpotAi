"use client";

import { useState } from 'react';
import { Place } from '@/types/place';
import { PlaceCard } from '@/components/place-card';
import { MapView } from '@/components/map-view';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, List, ArrowLeft, Filter, Sparkles, DollarSign, Lock, Crown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResultsViewProps {
  places: Place[];
  onNewSearch: () => void;
  searchParams: {
    location: string;
    preferences: string[];
    budget: number;
    radius: number;
  } | null;
  isTrialMode?: boolean;
  isPremiumMode?: boolean;
}

export function ResultsView({ places, onNewSearch, searchParams, isTrialMode = false, isPremiumMode = false }: ResultsViewProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(places.length > 0 ? places[0] : null);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(places);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Get unique categories from all places
  const allCategories = Array.from(
    new Set(
      places.flatMap(place => place.categories)
    )
  ).sort();

  // Apply sorting and filtering
  const getSortedAndFilteredPlaces = () => {
    let result = [...places];
    
    // Apply category filter if selected
    if (categoryFilter) {
      result = result.filter(place => 
        place.categories.some(cat => 
          cat.toLowerCase().includes(categoryFilter.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'distance':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating':
        result.sort((a, b) => {
          const ratingA = typeof a.rating === 'string' ? parseFloat(a.rating) : a.rating;
          const ratingB = typeof b.rating === 'string' ? parseFloat(b.rating) : b.rating;
          return ratingB - ratingA; // Higher rating first
        });
        break;
      case 'price':
        result.sort((a, b) => a.price - b.price); // Lower price first
        break;
    }
    
    return result;
  };

  // Update filtered places when sort or filter changes
  useState(() => {
    setFilteredPlaces(getSortedAndFilteredPlaces());
  });

  const handleSortChange = (value: 'distance' | 'rating' | 'price') => {
    setSortBy(value);
    const sorted = getSortedAndFilteredPlaces();
    setFilteredPlaces(sorted);
  };

  const handleFilterChange = (category: string | null) => {
    setCategoryFilter(category);
    
    let filtered = [...places];
    
    if (category) {
      filtered = filtered.filter(place => 
        place.categories.some(cat => 
          cat.toLowerCase().includes(category.toLowerCase())
        )
      );
    }
    
    // Apply current sort
    switch (sortBy) {
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating':
        filtered.sort((a, b) => {
          const ratingA = typeof a.rating === 'string' ? parseFloat(a.rating) : a.rating;
          const ratingB = typeof b.rating === 'string' ? parseFloat(b.rating) : b.rating;
          return ratingB - ratingA;
        });
        break;
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
    }
    
    setFilteredPlaces(filtered);
  };

  if (places.length === 0) {
    return (
      <div className="text-center py-12 glass-card p-8 rounded-xl deep-blue-blur">
        <h3 className="text-xl font-semibold mb-4">No places found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your search criteria or budget.</p>
        <Button onClick={onNewSearch} className="bg-[#97cfda] text-primary hover:bg-[#97cfda]/90">New Search</Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 deep-blue-blur">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Results <span className="bg-accent/20 text-white px-2 py-1 rounded-full text-sm ml-2">{filteredPlaces.length}</span></h2>
          {searchParams && (
            <p className="text-muted-foreground text-sm mt-2 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-[#97cfda]" />
                {searchParams.location}
              </span>
              {searchParams.preferences.length > 0 && (
                <span className="flex items-center gap-1">
                  <Sparkles size={14} className="text-[#97cfda]" />
                  {searchParams.preferences.join(', ')}
                </span>
              )}
              <span className="flex items-center gap-1">
                <DollarSign size={14} className="text-[#97cfda]" />
                ${searchParams.budget} budget
              </span>
            </p>
          )}
          
          {isTrialMode && (
            <div className="mt-2 bg-[#97cfda]/10 text-[#97cfda] px-3 py-1 rounded-full text-xs inline-flex items-center">
              <Lock size={12} className="mr-1" />
              Trial Mode: Limited to 20 results
            </div>
          )}

          {isPremiumMode && (
            <div className="mt-2 bg-[#97cfda]/10 text-[#97cfda] px-3 py-1 rounded-full text-xs inline-flex items-center">
              <Crown size={12} className="mr-1" />
              Premium Mode: Up to 100 results
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-secondary/50 border-accent/20 hover:bg-accent/20">
                <Filter size={16} className="text-[#97cfda]" />
                Filter & Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card border-accent/20">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-accent/20" />
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  onClick={() => handleSortChange('distance')}
                  className={sortBy === 'distance' ? "bg-[#97cfda]/20" : ""}
                >
                  Distance
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleSortChange('rating')}
                  className={sortBy === 'rating' ? "bg-[#97cfda]/20" : ""}
                >
                  Rating (high to low)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleSortChange('price')}
                  className={sortBy === 'price' ? "bg-[#97cfda]/20" : ""}
                >
                  Price (low to high)
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator className="bg-accent/20" />
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-accent/20" />
              
              <DropdownMenuItem 
                onClick={() => handleFilterChange(null)}
                className={categoryFilter === null ? "bg-[#97cfda]/20" : ""}
              >
                All Categories
              </DropdownMenuItem>
              
              {allCategories.slice(0, 10).map((category) => (
                <DropdownMenuItem 
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={categoryFilter === category ? "bg-[#97cfda]/20" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            onClick={onNewSearch} 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 bg-secondary/50 border-accent/20 hover:bg-accent/20"
          >
            <ArrowLeft size={16} className="text-[#97cfda]" />
            New Search
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full" onValueChange={(value) => setView(value as 'list' | 'map')}>
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/30 p-1">
          <TabsTrigger 
            value="list" 
            className="flex items-center gap-2 data-[state=active]:bg-[#97cfda] data-[state=active]:text-primary"
          >
            <List size={16} />
            List View
          </TabsTrigger>
          <TabsTrigger 
            value="map" 
            className="flex items-center gap-2 data-[state=active]:bg-[#97cfda] data-[state=active]:text-primary"
          >
            <MapPin size={16} />
            Map View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onClick={() => setSelectedPlace(place)}
                isSelected={selectedPlace?.id === place.id}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
            <div className="lg:col-span-1 overflow-y-auto pr-2 space-y-4 max-h-[70vh] scrollbar-thin">
              {filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onClick={() => setSelectedPlace(place)}
                  isSelected={selectedPlace?.id === place.id}
                />
              ))}
            </div>
            <div className="lg:col-span-2 h-full map-container">
              <MapView
                places={filteredPlaces}
                selectedPlace={selectedPlace}
                onPlaceSelect={setSelectedPlace}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Found {places.length} places near {searchParams?.location}</p>
        <p className="mt-1">Showing {filteredPlaces.length} places after filtering</p>
        
        {isTrialMode && (
          <div className="mt-4 p-3 bg-[#97cfda]/10 rounded-lg inline-block">
            <p className="text-[#97cfda] flex items-center gap-2">
              <Lock size={14} />
              <span>Subscribe for unlimited results and advanced features</span>
            </p>
          </div>
        )}

        {!isTrialMode && !isPremiumMode && (
          <div className="mt-4 p-3 bg-[#97cfda]/10 rounded-lg inline-block">
            <p className="text-[#97cfda] flex items-center gap-2">
              <Lock size={14} />
              <span>Sign up for a free trial or subscribe to see more recommendations</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}