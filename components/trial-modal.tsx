"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, CheckCircle, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PaymentForm } from '@/components/payment-form';
import { useTrial } from '@/lib/trial-context';
import { Card } from '@/components/ui/card';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: (email: string) => void;
}

export function TrialModal({ isOpen, onClose, onStartTrial }: TrialModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { toast } = useToast();
  const { hasUsedTrial } = useTrial();

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setIsSubmitting(false);
      setIsSuccess(false);
      setShowPaymentForm(false);
      setEmailError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Check if email has already been used for a trial
    if (hasUsedTrial(email)) {
      setEmailError('This email has already been used for a free trial.');
      toast({
        title: "Trial already used",
        description: "This email has already been used for a free trial.",
        variant: "destructive"
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter a password.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPaymentForm(true);
    }, 1000);
  };

  const handlePaymentSuccess = () => {
    setIsSuccess(true);
    
    // After showing success message, close and reset
    setTimeout(() => {
      try {
        onStartTrial(email);
        setIsSuccess(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setShowPaymentForm(false);
        
        toast({
          title: "Trial activated!",
          description: "Your 7-day free trial has been activated with 20 searches.",
        });
      } catch (error) {
        toast({
          title: "Error activating trial",
          description: error instanceof Error ? error.message : "An unexpected error occurred.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-[1001] w-full max-w-md mx-auto my-8">
        <Card className="glass-card overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-20 bg-card pt-6 px-6">
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground z-10"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {!isSuccess && !showPaymentForm && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#97cfda] flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5" />
                  Create Your Free Account
                </h2>
                <p className="text-muted-foreground text-sm">
                  Sign up to start your 7-day free trial with SeekSpot.
                </p>
              </div>
            )}
          </div>
          
          {!isSuccess ? (
            <>
              {!showPaymentForm ? (
                <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      placeholder="your.email@example.com"
                      className={`search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] ${
                        emailError ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {emailError && (
                      <div className="flex items-center gap-2 text-red-500 text-xs mt-1">
                        <AlertTriangle size={12} />
                        <span>{emailError}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password (min. 8 characters)"
                        className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] pr-10"
                        required
                        minLength={8}
                      />
                      <button 
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda]"
                      required
                    />
                  </div>
                  
                  <div className="bg-[#97cfda]/10 p-4 rounded-lg space-y-3">
                    <h3 className="font-semibold text-[#97cfda]">Trial Includes:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-[#97cfda] mr-2">✓</span>
                        <span>Up to 20 recommendations per search</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#97cfda] mr-2">✓</span>
                        <span>Basic map access</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#97cfda] mr-2">✓</span>
                        <span>Standard filtering options</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#97cfda] mr-2">✓</span>
                        <span>7 days of full access</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    By creating an account, you agree to our <a href="/terms" className="text-[#97cfda] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#97cfda] hover:underline">Privacy Policy</a>.
                  </div>
                  
                  <div className="flex justify-between gap-4 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onClose}
                      className="border-accent/20 hover:bg-accent/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#97cfda] text-primary hover:bg-[#97cfda]/90 flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Account..." : "Continue"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="p-6">
                  <PaymentForm 
                    onSuccess={handlePaymentSuccess} 
                    onCancel={() => setShowPaymentForm(false)} 
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-6">
              <div className="bg-[#97cfda]/20 p-4 rounded-full mb-4">
                <CheckCircle size={48} className="text-[#97cfda]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Account Created!</h3>
              <p className="text-center text-muted-foreground mb-4">
                Your account has been created and your 7-day free trial is now active. You have access to 20 recommendation searches.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}