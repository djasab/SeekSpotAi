"use client";

import { Place } from '@/types/place';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, DollarSign } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
  isSelected: boolean;
}

export function PlaceCard({ place, onClick, isSelected }: PlaceCardProps) {
  // Function to render price tier as dollar signs
  const renderPriceTier = (tier: number) => {
    return Array(tier)
      .fill(0)
      .map((_, i) => (
        <DollarSign key={i} size={16} className="inline-block text-accent/80" />
      ));
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md glass-card ${
        isSelected ? 'ring-2 ring-accent glow-effect' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
          <Star size={14} className="text-yellow-400 mr-1" />
          <span className="text-white text-xs font-medium">{place.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1 mb-2">{place.name}</h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin size={16} className="mr-1 text-accent/80" />
          <p className="text-sm line-clamp-1">{place.address}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {place.categories.map((category, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-accent/10 border-accent/20">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t border-border/30 flex justify-between">
        <div className="text-sm text-muted-foreground">
          {(place.distance / 1000).toFixed(1)} km away
        </div>
        <div className="flex items-center">
          <span className="mr-1 font-medium text-accent">${place.price}</span>
          <span className="text-muted-foreground">
            {renderPriceTier(place.priceTier)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}