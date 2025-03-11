"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, User, MessageSquare, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
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
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-[#97cfda]">Get in Touch</CardTitle>
          <CardDescription>
            Have questions or feedback? We'd love to hear from you.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} className="text-[#97cfda]" />
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail size={16} className="text-[#97cfda]" />
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare size={16} className="text-[#97cfda]" />
                    Your Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="search-input bg-secondary/50 border-accent/20 focus:border-[#97cfda] mt-1 min-h-[150px]"
                    required
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
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-[#97cfda]/20 p-4 rounded-full mb-4">
                <CheckCircle size={48} className="text-[#97cfda]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-center text-muted-foreground mb-4">
                Thank you for reaching out to us. We'll respond to your inquiry as soon as possible.
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 border-t border-border/30 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/30">
              <Mail size={20} className="text-[#97cfda] mb-2" />
              <span className="text-sm text-muted-foreground">support@seekspot.ai</span>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/30">
              <User size={20} className="text-[#97cfda] mb-2" />
              <span className="text-sm text-muted-foreground">Response time: 24h</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}