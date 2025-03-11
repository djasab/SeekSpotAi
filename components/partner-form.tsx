"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, DollarSign, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const businessTypes = [
  "Restaurant", "Cafe", "Bar", "Nightclub", "Bakery", 
  "Hotel", "Retail Store", "Spa & Wellness", "Gym & Fitness", 
  "Art Gallery", "Museum", "Theater", "Cinema", 
  "Tour Operator", "Travel Agency", "Local Experience"
];

export function PartnerForm() {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customBusinessType, setCustomBusinessType] = useState('');
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const { toast } = useToast();

  // Initialize Google Places Autocomplete for address
  useEffect(() => {
    if (!addressInputRef.current || autocomplete) return;

    try {
      if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const newAutocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
          fields: ['formatted_address', 'geometry', 'name', 'address_components']
        });
        
        newAutocomplete.addListener('place_changed', () => {
          const place = newAutocomplete.getPlace();
          if (place.formatted_address) {
            setAddress(place.formatted_address);
          } else if (place.name) {
            setAddress(place.name);
          }
        });
        
        setAutocomplete(newAutocomplete);
      }
    } catch (error) {
      console.error('Error initializing Places Autocomplete:', error);
    }
  }, [autocomplete]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName || !businessType || !address || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Application submitted!",
        description: "We'll review your business and get back to you soon.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setBusinessName('');
        setBusinessType('');
        setAddress('');
        setDescription('');
        setEmail('');
        setPhone('');
        setWebsite('');
        setCustomBusinessType('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <Card className="glass-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl text-[#97cfda]">Featured Listing Application</CardTitle>
            <CardDescription>
              Fill out the form below to apply for a featured listing. Our team will review your application and contact you.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-name" className="flex items-center gap-2 text-sm font-medium">
                      <Building2 size={16} className="text-[#97cfda]" />
                      Business Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="business-name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Enter your business name"
                      className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="business-type" className="flex items-center gap-2 text-sm font-medium">
                      <Building2 size={16} className="text-[#97cfda]" />
                      Business Type <span className="text-red-500">*</span>
                    </Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-accent/20">
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                        <SelectItem value="other">Other (specify)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {businessType === 'other' && (
                      <Input
                        value={customBusinessType}
                        onChange={(e) => setCustomBusinessType(e.target.value)}
                        placeholder="Specify business type"
                        className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-2"
                      />
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                      <MapPin size={16} className="text-[#97cfda]" />
                      Business Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      ref={addressInputRef}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your business address"
                      className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                      <Building2 size={16} className="text-[#97cfda]" />
                      Business Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell us about your business (max 200 characters)"
                      maxLength={200}
                      className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1 min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {description.length}/200 characters
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                        <Building2 size={16} className="text-[#97cfda]" />
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@yourbusiness.com"
                        className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                        <Building2 size={16} className="text-[#97cfda]" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
                      <Building2 size={16} className="text-[#97cfda]" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourbusiness.com"
                      className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#97cfda] text-primary hover:bg-[#97cfda]/90 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="bg-[#97cfda]/20 p-4 rounded-full mb-4">
                  <CheckCircle size={48} className="text-[#97cfda]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Thank you for your interest in partnering with SeekSpot. Our team will review your application and contact you soon.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="glass-card overflow-hidden sticky top-32">
          <CardHeader>
            <CardTitle className="text-xl text-[#97cfda]">Featured Listing Benefits</CardTitle>
            <CardDescription>
              $50/month for premium placement and enhanced visibility
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge className="bg-[#97cfda]/20 text-[#97cfda] border-[#97cfda]/30">Premium</Badge>
              <h4 className="font-semibold">Top Placement in Search Results</h4>
              <p className="text-sm text-muted-foreground">
                Your business will appear at the top of relevant search results, increasing visibility to potential customers.
              </p>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-[#97cfda]/20 text-[#97cfda] border-[#97cfda]/30">Enhanced</Badge>
              <h4 className="font-semibold">Enhanced Business Profile</h4>
              <p className="text-sm text-muted-foreground">
                Showcase high-quality photos, detailed descriptions, and special offers to attract more customers.
              </p>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-[#97cfda]/20 text-[#97cfda] border-[#97cfda]/30">Analytics</Badge>
              <h4 className="font-semibold">Performance Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Access detailed analytics on views, clicks, and customer engagement with your listing.
              </p>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-[#97cfda]/20 text-[#97cfda] border-[#97cfda]/30">Support</Badge>
              <h4 className="font-semibold">Dedicated Support</h4>
              <p className="text-sm text-muted-foreground">
                Get priority support and assistance with optimizing your business listing.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <div className="w-full p-4 bg-[#97cfda]/10 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Monthly Fee</span>
                <span className="font-bold text-[#97cfda]">$50</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Cancel anytime. No long-term commitment required.
              </div>
            </div>
            
            <div className="flex items-center justify-center w-full">
              <CreditCard size={16} className="text-[#97cfda] mr-2" />
              <span className="text-sm text-muted-foreground">
                Secure payment processing
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}