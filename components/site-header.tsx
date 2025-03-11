"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plane, Menu, X, LogOut, Crown } from "lucide-react";
import { TrialModal } from "@/components/trial-modal";
import { TrialBadge } from "@/components/trial-badge";
import { PremiumBadge } from "@/components/premium-badge";
import { useTrial } from "@/lib/trial-context";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionModal } from "@/components/subscription-modal";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const { isTrialActive, startTrial, endTrial, isPremium, activatePremium } = useTrial();
  const { toast } = useToast();

  const handleStartTrial = (email: string) => {
    startTrial(email);
    setTrialModalOpen(false);
  };

  const handleOpenTrialModal = () => {
    setTrialModalOpen(true);
  };

  const handleCloseTrialModal = () => {
    setTrialModalOpen(false);
  };

  const handleOpenSubscriptionModal = () => {
    setSubscriptionModalOpen(true);
  };

  const handleCloseSubscriptionModal = () => {
    setSubscriptionModalOpen(false);
  };

  const handleSubscribe = () => {
    activatePremium();
    setSubscriptionModalOpen(false);
    toast({
      title: "Premium Activated",
      description: "You now have access to unlimited recommendations and premium features.",
    });
  };

  const handleSignOut = () => {
    endTrial();
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });
  };

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-40 px-4 py-6">
      {/* Desktop Header */}
      <header className="capsule-header mx-auto max-w-5xl bg-opacity-50 backdrop-blur-md hidden md:block">
        <div className="flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#97cfda] p-1.5 rounded-full">
                <div className="bg-primary p-0.5 rounded-full">
                  <Plane size={16} className="text-[#97cfda]" />
                </div>
              </div>
              <span className="font-bold text-xl gradient-text">SeekSpot</span>
            </Link>
            {isTrialActive && <TrialBadge />}
            {isPremium && <PremiumBadge />}
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-accent hover:text-accent-foreground transition-colors nav-link">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-accent hover:text-accent-foreground transition-colors nav-link">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-accent hover:text-accent-foreground transition-colors nav-link">
              Contact
            </Link>
            <Link href="/partner" className="text-sm font-medium text-accent hover:text-accent-foreground transition-colors nav-link">
              Partner with Us
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {isTrialActive || isPremium ? (
              <Button 
                variant="outline" 
                className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent-foreground flex items-center gap-2"
                onClick={handleSignOut}
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent-foreground"
                onClick={handleOpenTrialModal}
              >
                Try for Free
              </Button>
            )}
            <Button 
              className="bg-[#97cfda] text-primary hover:bg-[#97cfda]/90"
              onClick={handleOpenSubscriptionModal}
              disabled={isPremium}
            >
              {isPremium ? "Subscribed" : "Subscribe"}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Header - Just Logo and Menu Button */}
      <div className="md:hidden flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#97cfda] p-1.5 rounded-full">
            <div className="bg-primary p-0.5 rounded-full">
              <Plane size={16} className="text-[#97cfda]" />
            </div>
          </div>
          <span className="font-bold text-xl gradient-text">SeekSpot</span>
        </Link>
        
        {/* Trial/Premium Badge for Mobile */}
        <div className="flex items-center">
          {isTrialActive && <TrialBadge />}
          {isPremium && <PremiumBadge />}
          
          {/* Mobile Menu Button */}
          <button 
            className="ml-2 p-2 rounded-md hover:bg-accent/10 bg-secondary/30 border border-accent/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-accent" />
            ) : (
              <Menu size={24} className="text-accent" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Floating Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="mx-4 mobile-menu p-4 rounded-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-base font-medium text-accent hover:text-accent-foreground transition-colors py-3 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-base font-medium text-accent hover:text-accent-foreground transition-colors py-3 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-base font-medium text-accent hover:text-accent-foreground transition-colors py-3 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/partner" 
                className="text-base font-medium text-accent hover:text-accent-foreground transition-colors py-3 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partner with Us
              </Link>
              
              <div className="border-t border-accent/10 my-2"></div>
              
              <div className="flex flex-col gap-3 pt-2 px-4">
                {isTrialActive || isPremium ? (
                  <Button 
                    variant="outline" 
                    className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent-foreground w-full flex items-center justify-center gap-2"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent-foreground w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTrialModalOpen(true);
                    }}
                  >
                    Try for Free
                  </Button>
                )}
                <Button 
                  className="bg-[#97cfda] text-primary hover:bg-[#97cfda]/90 w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSubscriptionModalOpen(true);
                  }}
                  disabled={isPremium}
                >
                  {isPremium ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Trial Modal */}
      <TrialModal 
        isOpen={trialModalOpen} 
        onClose={handleCloseTrialModal}
        onStartTrial={handleStartTrial}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={subscriptionModalOpen}
        onClose={handleCloseSubscriptionModal}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
}