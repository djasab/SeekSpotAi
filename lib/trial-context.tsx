"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TrialContextType {
  isTrialActive: boolean;
  isPremium: boolean;
  trialEndDate: Date | null;
  trialEmail: string | null;
  startTrial: (email: string) => void;
  endTrial: () => void;
  getRemainingDays: () => number;
  getSearchesRemaining: () => number;
  decrementSearches: () => void;
  hasUsedTrial: (email: string) => boolean;
  activatePremium: () => void;
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

interface TrialProviderProps {
  children: ReactNode;
}

export function TrialProvider({ children }: TrialProviderProps) {
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
  const [trialEmail, setTrialEmail] = useState<string | null>(null);
  const [searchesRemaining, setSearchesRemaining] = useState(20);
  const [previousTrials, setPreviousTrials] = useState<string[]>([]);

  // Load trial state from localStorage on mount
  useEffect(() => {
    const storedTrialData = localStorage.getItem('localfinder_trial');
    if (storedTrialData) {
      try {
        const { endDate, email, searches } = JSON.parse(storedTrialData);
        const parsedEndDate = new Date(endDate);
        
        // Check if trial is still valid
        if (parsedEndDate > new Date()) {
          setIsTrialActive(true);
          setTrialEndDate(parsedEndDate);
          setTrialEmail(email);
          setSearchesRemaining(searches !== undefined ? searches : 20);
        } else {
          // Trial has expired, clean up active trial but keep record
          localStorage.removeItem('localfinder_trial');
        }
      } catch (error) {
        console.error('Error parsing trial data:', error);
        localStorage.removeItem('localfinder_trial');
      }
    }

    // Load previous trials
    const storedPreviousTrials = localStorage.getItem('localfinder_previous_trials');
    if (storedPreviousTrials) {
      try {
        setPreviousTrials(JSON.parse(storedPreviousTrials));
      } catch (error) {
        console.error('Error parsing previous trials:', error);
        localStorage.removeItem('localfinder_previous_trials');
      }
    }

    // Load premium status
    const storedPremiumData = localStorage.getItem('localfinder_premium');
    if (storedPremiumData) {
      try {
        setIsPremium(true);
      } catch (error) {
        console.error('Error parsing premium data:', error);
        localStorage.removeItem('localfinder_premium');
      }
    }
  }, []);

  // Save trial state to localStorage whenever it changes
  useEffect(() => {
    if (isTrialActive && trialEndDate && trialEmail) {
      localStorage.setItem('localfinder_trial', JSON.stringify({
        endDate: trialEndDate.toISOString(),
        email: trialEmail,
        searches: searchesRemaining
      }));
    } else if (!isTrialActive) {
      localStorage.removeItem('localfinder_trial');
    }
  }, [isTrialActive, trialEndDate, trialEmail, searchesRemaining]);

  // Save previous trials whenever they change
  useEffect(() => {
    if (previousTrials.length > 0) {
      localStorage.setItem('localfinder_previous_trials', JSON.stringify(previousTrials));
    }
  }, [previousTrials]);

  // Save premium status whenever it changes
  useEffect(() => {
    if (isPremium) {
      localStorage.setItem('localfinder_premium', JSON.stringify({ active: true }));
    } else {
      localStorage.removeItem('localfinder_premium');
    }
  }, [isPremium]);

  // Check if trial has expired
  useEffect(() => {
    if (isTrialActive && trialEndDate) {
      const checkExpiration = () => {
        const now = new Date();
        if (trialEndDate < now) {
          endTrial();
        }
      };
      
      // Check immediately
      checkExpiration();
      
      // Set up interval to check periodically
      const interval = setInterval(checkExpiration, 60000); // Check every minute
      
      return () => clearInterval(interval);
    }
  }, [isTrialActive, trialEndDate]);

  const hasUsedTrial = (email: string): boolean => {
    // Check if this email has already used a trial
    return previousTrials.includes(email.toLowerCase());
  };

  const startTrial = (email: string) => {
    const normalizedEmail = email.toLowerCase();
    
    // Check if this email has already used a trial
    if (hasUsedTrial(normalizedEmail)) {
      throw new Error('This email has already been used for a free trial.');
    }
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // 7 days from now
    
    setIsTrialActive(true);
    setTrialEndDate(endDate);
    setTrialEmail(normalizedEmail);
    setSearchesRemaining(20);
    
    // Add to previous trials list
    setPreviousTrials(prev => [...prev, normalizedEmail]);
  };

  const endTrial = () => {
    // If there's an active trial, add the email to previous trials
    if (isTrialActive && trialEmail && !previousTrials.includes(trialEmail)) {
      setPreviousTrials(prev => [...prev, trialEmail]);
    }
    
    setIsTrialActive(false);
    setTrialEndDate(null);
    setTrialEmail(null);
    setSearchesRemaining(0);
    setIsPremium(false);
    localStorage.removeItem('localfinder_trial');
    localStorage.removeItem('localfinder_premium');
  };

  const activatePremium = () => {
    setIsPremium(true);
    // If there was a trial, end it since they're now premium
    if (isTrialActive) {
      setIsTrialActive(false);
      setTrialEndDate(null);
      setSearchesRemaining(0);
      localStorage.removeItem('localfinder_trial');
    }
  };

  const getRemainingDays = (): number => {
    if (!trialEndDate) return 0;
    
    const now = new Date();
    const diffTime = trialEndDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  const getSearchesRemaining = (): number => {
    return searchesRemaining;
  };

  const decrementSearches = () => {
    if (searchesRemaining > 0) {
      setSearchesRemaining(prev => prev - 1);
    }
  };

  return (
    <TrialContext.Provider value={{
      isTrialActive,
      isPremium,
      trialEndDate,
      trialEmail,
      startTrial,
      endTrial,
      getRemainingDays,
      getSearchesRemaining,
      decrementSearches,
      hasUsedTrial,
      activatePremium
    }}>
      {children}
    </TrialContext.Provider>
  );
}

export function useTrial() {
  const context = useContext(TrialContext);
  if (context === undefined) {
    throw new Error('useTrial must be used within a TrialProvider');
  }
  return context;
}