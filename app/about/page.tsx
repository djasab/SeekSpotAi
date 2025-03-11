"use client";

import { Compass, Info, Map, Search, Star, Settings, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground grid-pattern pt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 deep-blue-blur">
          <div className="flex justify-center mb-6">
            <div className="bg-[#97cfda] p-6 rounded-full glow-effect">
              <Info size={48} className="text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 gradient-text">About SeekSpot</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover the story behind SeekSpot and how we're helping people find the perfect local spots.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card className="glass-card p-8 h-full">
              <h2 className="text-2xl font-bold mb-6 text-[#97cfda]">Our Mission</h2>
              <p className="text-lg mb-6">
                SeekSpot was created with a simple mission: to help people discover amazing local places that perfectly match their preferences and budget.
              </p>
              <p className="mb-6">
                In today's world of endless options, finding the right place to eat, drink, or hang out can be overwhelming. 
                We wanted to create a tool that cuts through the noise and delivers personalized recommendations based on what really matters to you.
              </p>
              <p className="mb-6">
                Whether you're exploring a new city, looking for a hidden gem in your neighborhood, or planning a special night out, 
                SeekSpot helps you discover places that align with your tastes and budget.
              </p>
              <p>
                Our platform combines powerful search capabilities with an intuitive interface to make finding the perfect local spot easier than ever.
              </p>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card p-8 h-full">
              <h2 className="text-2xl font-bold mb-6 text-[#97cfda]">How It Works</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-[#97cfda]/20 p-2 rounded-full mr-4 mt-1">
                    <Map size={20} className="text-[#97cfda]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location-Based</h3>
                    <p className="text-muted-foreground text-sm">
                      Enter your location or use your current position to find nearby places.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-[#97cfda]/20 p-2 rounded-full mr-4 mt-1">
                    <Search size={20} className="text-[#97cfda]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Preference-Driven</h3>
                    <p className="text-muted-foreground text-sm">
                      Tell us what you're looking for, from cuisine types to specific amenities.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-[#97cfda]/20 p-2 rounded-full mr-4 mt-1">
                    <Settings size={20} className="text-[#97cfda]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Budget-Friendly</h3>
                    <p className="text-muted-foreground text-sm">
                      Set your budget and find places that won't break the bank.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-[#97cfda]/20 p-2 rounded-full mr-4 mt-1">
                    <Star size={20} className="text-[#97cfda]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Quality-Focused</h3>
                    <p className="text-muted-foreground text-sm">
                      We prioritize highly-rated places with positive reviews.
                    </p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 gradient-text">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-[#97cfda]/20 p-3 rounded-full">
                  <Map size={24} className="text-[#97cfda]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-muted-foreground">
                Visualize all recommended places on an interactive map to easily see what's nearby.
              </p>
            </Card>
            
            <Card className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-[#97cfda]/20 p-3 rounded-full">
                  <Zap size={24} className="text-[#97cfda]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Filtering</h3>
              <p className="text-muted-foreground">
                Filter results by distance, rating, price, and category to find exactly what you're looking for.
              </p>
            </Card>
            
            <Card className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-[#97cfda]/20 p-3 rounded-full">
                  <Compass size={24} className="text-[#97cfda]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-muted-foreground">
                Get recommendations tailored to your specific preferences and past searches.
              </p>
            </Card>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-10 gradient-text">Our Team</h2>
          <p className="text-lg max-w-3xl mx-auto mb-12">
            SeekSpot was created by a passionate team of travelers, foodies, and tech enthusiasts who believe in the power of local experiences.
          </p>
          
          <div className="flex justify-center">
            <Card className="glass-card p-8 max-w-3xl">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#97cfda]/20 p-4 rounded-full">
                  <Users size={32} className="text-[#97cfda]" />
                </div>
              </div>
              <p className="italic text-muted-foreground mb-6">
                "We created SeekSpot because we believe that the best experiences happen when you find places that truly match your preferences. Our goal is to help everyone discover their next favorite spot, whether they're at home or exploring a new city."
              </p>
              <p className="font-semibold text-[#97cfda]">— The SeekSpot Team</p>
            </Card>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Join Our Community</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            We're constantly improving SeekSpot based on user feedback. Have suggestions or want to learn more? Get in touch!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-[#97cfda] text-primary hover:bg-[#97cfda]/90 px-6 py-3 rounded-lg font-medium transition-all">
              Contact Us
            </a>
            <a href="/partner" className="bg-secondary/50 border border-accent/20 hover:bg-accent/10 px-6 py-3 rounded-lg font-medium transition-all">
              Partner with Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}