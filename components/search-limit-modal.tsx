"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Search, AlertTriangle } from 'lucide-react';

interface SearchLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export function SearchLimitModal({ isOpen, onClose, onSubscribe }: SearchLimitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-[1001] w-full max-w-md mx-auto my-8">
        <Card className="glass-card overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-20 bg-card">
            <CardHeader className="bg-[#97cfda]/10 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="bg-[#97cfda]/20 p-2 rounded-full">
                  <AlertTriangle size={24} className="text-[#97cfda]" />
                </div>
                <div>
                  <CardTitle className="text-xl text-[#97cfda]">Search Limit Reached</CardTitle>
                  <CardDescription>
                    You've used all your trial searches
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </div>
          
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="bg-secondary/30 p-4 rounded-full mb-4">
                <Lock size={32} className="text-[#97cfda]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">You have reached your search limit!</h3>
              <p className="text-muted-foreground">
                Your trial includes 20 searches. Subscribe to our premium plan for unlimited searches and additional features.
              </p>
            </div>
            
            <div className="bg-[#97cfda]/10 p-4 rounded-lg space-y-3 mb-6">
              <h3 className="font-semibold text-[#97cfda]">Premium Includes:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-[#97cfda] mr-2">✓</span>
                  <span>Up to 100 recommendations per search</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#97cfda] mr-2">✓</span>
                  <span>Advanced filtering options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#97cfda] mr-2">✓</span>
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#97cfda] mr-2">✓</span>
                  <span>Save favorite places</span>
                </li>
              </ul>
            </div>
            
            <div className="flex items-center justify-center p-3 bg-secondary/30 rounded-lg mb-4">
              <span className="text-lg font-bold text-[#97cfda] mr-2">$15</span>
              <span className="text-sm text-muted-foreground">per month</span>
            </div>
          </CardContent>
          
          <div className="sticky bottom-0 z-20 bg-card">
            <CardFooter className="flex flex-col gap-3 border-t border-border/30 pt-4">
              <Button 
                className="w-full bg-[#97cfda] text-primary hover:bg-[#97cfda]/90"
                onClick={onSubscribe}
              >
                <Search size={16} className="mr-2" />
                Subscribe Now
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-accent/20 hover:bg-accent/10"
                onClick={onClose}
              >
                Maybe Later
              </Button>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}