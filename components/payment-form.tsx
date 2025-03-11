"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Calendar, Lock, AppleIcon, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function PaymentForm({ onSuccess, onCancel }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple'>('card');
  const { toast } = useToast();

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow up to 4 digits for CVV
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      // Validate card details
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        toast({
          title: "Invalid card number",
          description: "Please enter a valid card number.",
          variant: "destructive"
        });
        return;
      }

      if (!cardName) {
        toast({
          title: "Name required",
          description: "Please enter the name on your card.",
          variant: "destructive"
        });
        return;
      }

      if (!expiryDate || expiryDate.length < 5) {
        toast({
          title: "Invalid expiry date",
          description: "Please enter a valid expiry date (MM/YY).",
          variant: "destructive"
        });
        return;
      }

      if (!cvv || cvv.length < 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid security code.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Payment successful",
        description: "Your premium subscription is now active.",
      });
      
      // After showing success message, call onSuccess
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Zm2.52,7.44a4.51,4.51,0,0,1,2.16-3.81,4.66,4.66,0,0,0-3.66-2c-1.56-.16-3,.91-3.83.91s-2-.89-3.3-.87A4.92,4.92,0,0,0,4.69,9.39C2.93,12.45,4.24,17,6,19.47,6.8,20.68,7.8,22.05,9.12,22s1.75-.82,3.28-.82,2,.82,3.3.79,2.22-1.24,3.06-2.45a11,11,0,0,0,1.38-2.85A4.41,4.41,0,0,1,17.46,12.63Z"></path>
    </svg>
  );

  return (
    <div className="space-y-6">
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4 mb-4">
            <Button
              type="button"
              variant={paymentMethod === 'card' ? 'default' : 'outline'}
              className={`flex-1 ${paymentMethod === 'card' ? 'bg-[#97cfda] text-primary' : 'border-accent/20'}`}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard size={16} className="mr-2" />
              Credit Card
            </Button>
            
            <Button
              type="button"
              variant={paymentMethod === 'apple' ? 'default' : 'outline'}
              className={`flex-1 ${paymentMethod === 'apple' ? 'bg-[#97cfda] text-primary' : 'border-accent/20'}`}
              onClick={() => setPaymentMethod('apple')}
            >
              <AppleIcon />
              <span className="ml-2">Apple Pay</span>
            </Button>
          </div>
          
          {paymentMethod === 'card' ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-number" className="flex items-center gap-2 text-sm font-medium">
                  <CreditCard size={16} className="text-[#97cfda]" />
                  Card Number
                </Label>
                <Input
                  id="card-number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                  maxLength={19}
                />
              </div>
              
              <div>
                <Label htmlFor="card-name" className="flex items-center gap-2 text-sm font-medium">
                  <CreditCard size={16} className="text-[#97cfda]" />
                  Name on Card
                </Label>
                <Input
                  id="card-name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Smith"
                  className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry-date" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar size={16} className="text-[#97cfda]" />
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry-date"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                    maxLength={5}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cvv" className="flex items-center gap-2 text-sm font-medium">
                    <Lock size={16} className="text-[#97cfda]" />
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <AppleIcon />
              </div>
              <p className="text-muted-foreground mb-4">
                Click the button below to complete your payment with Apple Pay.
              </p>
              <div className="bg-black text-white py-2 px-4 rounded-lg inline-flex items-center">
                <AppleIcon />
                <span className="ml-2">Pay</span>
              </div>
            </div>
          )}
          
          <div className="bg-[#97cfda]/10 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Premium Subscription</span>
              <span className="font-bold">$15.00</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Billed monthly</span>
              <span>Cancel anytime</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            By providing your payment information, you agree to our <a href="/terms" className="text-[#97cfda] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#97cfda] hover:underline">Privacy Policy</a>. You can cancel your subscription at any time.
          </div>
          
          <div className="flex justify-between gap-4 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-accent/20 hover:bg-accent/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#97cfda] text-primary hover:bg-[#97cfda]/90 flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Subscribe Now'
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="bg-[#97cfda]/20 p-4 rounded-full mb-4">
            <CheckCircle size={48} className="text-[#97cfda]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Payment Confirmed!</h3>
          <p className="text-center text-muted-foreground mb-4">
            Your premium subscription has been activated. You now have access to all premium features.
          </p>
        </div>
      )}
    </div>
  );
}