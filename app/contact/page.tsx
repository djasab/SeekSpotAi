"use client";

import { ContactForm } from '@/components/contact-form';
import { MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground grid-pattern pt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 deep-blue-blur">
          <div className="flex justify-center mb-6">
            <div className="bg-[#97cfda] p-6 rounded-full glow-effect">
              <MessageSquare size={48} className="text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 gradient-text">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have questions, feedback, or need assistance? We're here to help!
          </p>
        </div>
        
        <ContactForm />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-2 text-[#97cfda]">How does SeekSpot work?</h3>
              <p className="text-muted-foreground">
                SeekSpot uses your location, preferences, and budget to find the perfect local spots for you. Our algorithm considers ratings, distance, and price to deliver personalized recommendations.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-2 text-[#97cfda]">Is SeekSpot available worldwide?</h3>
              <p className="text-muted-foreground">
                Yes! SeekSpot works in any location with Google Maps coverage, providing recommendations for restaurants, bars, cafes, and more around the globe.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-2 text-[#97cfda]">How can businesses get featured?</h3>
              <p className="text-muted-foreground">
                Businesses can apply for featured listings through our Partner program. Featured listings receive premium placement in search results and enhanced profile features.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-2 text-[#97cfda]">Is my location data secure?</h3>
              <p className="text-muted-foreground">
                Absolutely. We only use your location data to provide recommendations and never share it with third parties. Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}