"use client";

import { useState } from 'react';
import { SearchForm } from '@/components/search-form';
import { ResultsView } from '@/components/results-view';
import { Place } from '@/types/place';
import { searchPlaces } from '@/lib/api';
import { MapPin, Search, Plane } from 'lucide-react';
import { useTrial } from '@/lib/trial-context';
import { useToast } from '@/hooks/use-toast';
import { SearchLimitModal } from '@/components/search-limit-modal';
import { SubscriptionModal } from '@/components/subscription-modal';

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    location: string;
    preferences: string[];
    budget: number;
    radius: number;
  } | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  const { isTrialActive, isPremium, getSearchesRemaining, decrementSearches, activatePremium } = useTrial();
  const { toast } = useToast();

  const handleSearch = async (location: string, preferences: string[], budget: number, radius: number) => {
    // Check if trial is active and has searches remaining
    if (isTrialActive) {
      const searchesRemaining = getSearchesRemaining();
      if (searchesRemaining <= 0) {
        setShowLimitModal(true);
        return;
      }
    }
    
    setIsLoading(true);
    setSearchParams({ location, preferences, budget, radius });
    
    try {
      const results = await searchPlaces(location, preferences, budget, radius);
      
      // If trial is active, limit results to 20
      if (isTrialActive) {
        setPlaces(results.slice(0, 20));
        decrementSearches();
        
        // Show toast about trial usage
        const remaining = getSearchesRemaining();
        toast({
          title: "Trial search used",
          description: `You have ${remaining} searches remaining in your trial.`,
        });
      } else if (isPremium) {
        // If premium, limit to 100 results
        setPlaces(results.slice(0, 100));
        
        toast({
          title: "Premium search",
          description: "Showing up to 100 recommendations with your premium account.",
        });
      } else {
        // If neither trial nor premium, show limited results
        setPlaces(results.slice(0, 5));
        
        toast({
          title: "Limited search",
          description: "Sign up for a free trial or subscribe to see more recommendations.",
        });
      }
      
      setHasSearched(true);
    } catch (error) {
      console.error('Error searching places:', error);
      setPlaces([]);
      toast({
        title: "Search error",
        description: "There was a problem finding places. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setHasSearched(false);
  };

  const handleSubscribe = () => {
    setShowLimitModal(false);
    setShowSubscriptionModal(true);
  };

  const handleSubscriptionComplete = () => {
    activatePremium();
    setShowSubscriptionModal(false);
    toast({
      title: "Premium Activated",
      description: "You now have access to unlimited recommendations and premium features.",
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground grid-pattern pt-28">
      <div className="container mx-auto px-4 py-8">
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center mb-8 deep-blue-blur">
              <div className="flex justify-center mb-6">
                <div className="bg-[#97cfda] p-6 rounded-full glow-effect" style={{transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden'}}>
                  <div className="bg-primary p-2 rounded-full">
                    <Plane size={32} className="text-[#97cfda]" />
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-3 gradient-text" style={{textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale'}}>SeekSpot</h1>
              <p className="text-muted-foreground max-w-md mx-auto text-lg">
                Discover the perfect spots based on your location, preferences, and budget.
              </p>
              
              {isTrialActive && (
                <div className="mt-4 bg-[#97cfda]/10 rounded-lg p-3 inline-block" style={{transform: 'translateZ(0)'}}>
                  <p className="text-sm text-[#97cfda]">
                    Trial Mode: {getSearchesRemaining()} searches remaining
                  </p>
                </div>
              )}

              {isPremium && (
                <div className="mt-4 bg-[#97cfda]/10 rounded-lg p-3 inline-block" style={{transform: 'translateZ(0)'}}>
                  <p className="text-sm text-[#97cfda]">
                    Premium Account: Up to 100 recommendations per search
                  </p>
                </div>
              )}
            </div>
            
            <div className="w-full max-w-md glass-card p-6 rounded-xl search-form-container" style={{transform: 'translateZ(0)', willChange: 'transform', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden'}}>
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <ResultsView 
            places={places} 
            onNewSearch={handleNewSearch} 
            searchParams={searchParams}
            isTrialMode={isTrialActive}
            isPremiumMode={isPremium}
          />
        )}
      </div>

      {/* Search Limit Modal */}
      <SearchLimitModal 
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onSubscribe={handleSubscribe}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscriptionComplete}
      />
    </main>
  );
}