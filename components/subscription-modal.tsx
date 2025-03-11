"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, CreditCard, Loader2, Sparkles, Zap, Search, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PaymentForm } from '@/components/payment-form';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export function SubscriptionModal({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(true);
  const { toast } = useToast();

  const handlePaymentSuccess = () => {
    setIsSuccess(true);
    
    // After showing success message, close and reset
    setTimeout(() => {
      onSubscribe();
      setIsSuccess(false);
      setShowPaymentForm(true);
      
      toast({
        title: "Subscription activated!",
        description: "Your premium subscription has been activated successfully.",
      });
    }, 1500);
  };

  if (!isOpen) return null;

  const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Zm2.52,7.44a4.51,4.51,0,0,1,2.16-3.81,4.66,4.66,0,0,0-3.66-2c-1.56-.16-3,.91-3.83,.91s-2-.89-3.3-.87A4.92,4.92,0,0,0,4.69,9.39C2.93,12.45,4.24,17,6,19.47,6.8,20.68,7.8,22.05,9.12,22s1.75-.82,3.28-.82,2,.82,3.3,.79,2.22-1.24,3.06-2.45a11,11,0,0,0,1.38-2.85A4.41,4.41,0,0,1,17.46,12.63Z"></path>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-[1001] w-full max-w-md mx-auto my-8">
        <Card className="glass-card overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-20 bg-card">
            <CardHeader className="bg-[#97cfda]/10 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="bg-[#97cfda]/20 p-2 rounded-full">
                  <Sparkles size={24} className="text-[#97cfda]" />
                </div>
                <div>
                  <CardTitle className="text-xl text-[#97cfda]">Premium Subscription</CardTitle>
                  <CardDescription>
                    Unlock unlimited recommendations and premium features
                  </CardDescription>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </CardHeader>
          </div>
          
          <CardContent className="pt-6">
            {!isSuccess ? (
              <>
                {showPaymentForm ? (
                  <>
                    <div className="mb-6 space-y-4">
                      <div className="bg-[#97cfda]/10 p-4 rounded-lg space-y-3">
                        <h3 className="font-semibold text-[#97cfda]">Premium Benefits:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-[#97cfda] mr-2">✓</span>
                            <span><strong>Unlimited recommendations</strong> (up to 100 per search)</span>
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
                          <li className="flex items-start">
                            <span className="text-[#97cfda] mr-2">✓</span>
                            <span>Priority customer support</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-center p-3 bg-secondary/30 rounded-lg">
                        <span className="text-lg font-bold text-[#97cfda] mr-2">$15</span>
                        <span className="text-sm text-muted-foreground">per month</span>
                      </div>
                    </div>
                    
                    <PaymentForm 
                      onSuccess={handlePaymentSuccess} 
                      onCancel={onClose} 
                    />
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="bg-[#97cfda]/20 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                      <Zap size={32} className="text-[#97cfda]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready to Upgrade?</h3>
                    <p className="text-muted-foreground mb-6">
                      Get unlimited recommendations and premium features for just $15/month.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        className="w-full bg-[#97cfda] text-primary hover:bg-[#97cfda]/90"
                        onClick={() => setShowPaymentForm(true)}
                      >
                        <CreditCard size={16} className="mr-2" />
                        Continue to Payment
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-accent/20 hover:bg-accent/10"
                        onClick={onClose}
                      >
                        Maybe Later
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="bg-[#97cfda]/20 p-4 rounded-full mb-4">
                  <CheckCircle size={48} className="text-[#97cfda]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Subscription Activated!</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Thank you for subscribing to SeekSpot Premium. You now have access to unlimited recommendations and all premium features.
                </p>
              </div>
            )}
          </CardContent>
          
          <div className="sticky bottom-0 z-20 bg-card">
            <CardFooter className="flex justify-center border-t border-border/30 pt-4">
              <div className="flex items-center text-xs text-muted-foreground">
                <Lock size={12} className="mr-1" />
                Secure payment processing
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}