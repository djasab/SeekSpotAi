"use client";

import { PartnerForm } from '@/components/partner-form';
import { Compass, Building2 } from 'lucide-react';

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground grid-pattern pt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 deep-blue-blur">
          <div className="flex justify-center mb-6">
            <div className="bg-[#97cfda] p-6 rounded-full glow-effect">
              <Building2 size={48} className="text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 gradient-text">Partner with Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join SeekSpot as a featured business partner and increase your visibility to potential customers.
          </p>
        </div>
        
        <PartnerForm />
      </div>
    </main>
  );
}