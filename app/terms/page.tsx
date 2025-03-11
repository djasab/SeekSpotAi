"use client";

import { Scroll } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground grid-pattern pt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 deep-blue-blur">
          <div className="flex justify-center mb-6">
            <div className="bg-[#97cfda] p-6 rounded-full glow-effect">
              <Scroll size={48} className="text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 gradient-text">Terms & Conditions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Please read these terms and conditions carefully before using SeekSpot.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-lg max-w-4xl mx-auto">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">1. Introduction</h2>
              <p className="mb-4">
                Welcome to SeekSpot ("we," "our," or "us"). By accessing or using our website, mobile application, or any other services we offer (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms").
              </p>
              <p>
                If you do not agree with these Terms, please do not use our Services. We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of the Services following any modifications indicates your acceptance of the modified Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">2. Account Registration</h2>
              <p className="mb-4">
                To access certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="mb-4">
                You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
              </p>
              <p>
                We reserve the right to terminate or suspend your account at any time for any reason, including, but not limited to, violation of these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">3. Free Trial and Subscription</h2>
              <p className="mb-4">
                We offer a free trial of our premium services. The free trial period lasts for 7 days from the date of registration. During the free trial, you will have access to a limited number of searches (20) and features.
              </p>
              <p className="mb-4">
                At the end of the free trial period, your account will automatically be charged the then-current subscription fee unless you cancel your subscription before the end of the trial period. You may only use one free trial per person. Creating multiple accounts to obtain additional free trials is prohibited.
              </p>
              <p>
                Subscription fees are billed in advance on a monthly basis. You may cancel your subscription at any time, but no refunds will be provided for any unused portion of the current billing period.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">4. User Conduct</h2>
              <p className="mb-4">
                You agree not to use the Services to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe the rights of any third party</li>
                <li>Transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                <li>Collect or store personal data about other users without their consent</li>
                <li>Create multiple accounts to obtain additional free trials</li>
              </ul>
              <p>
                We reserve the right to terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">5. Intellectual Property</h2>
              <p className="mb-4">
                The Services and their original content, features, and functionality are and will remain the exclusive property of SeekSpot and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of SeekSpot.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">6. Third-Party Links</h2>
              <p className="mb-4">
                Our Services may contain links to third-party websites or services that are not owned or controlled by SeekSpot. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p>
                You acknowledge and agree that SeekSpot shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">7. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall SeekSpot, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Your access to or use of or inability to access or use the Services</li>
                <li>Any conduct or content of any third party on the Services</li>
                <li>Any content obtained from the Services</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              <p>
                Whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">8. Disclaimer</h2>
              <p className="mb-4">
                Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
              <p>
                SeekSpot, its subsidiaries, affiliates, and its licensors do not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>The Services will function uninterrupted, secure, or available at any particular time or location</li>
                <li>Any errors or defects will be corrected</li>
                <li>The Services are free of viruses or other harmful components</li>
                <li>The results of using the Services will meet your requirements</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">10. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@seekspot.ai" className="text-[#97cfda] hover:underline">legal@seekspot.ai</a>.
              </p>
            </section>
          </div>
          
          <div className="mt-8 pt-8 border-t border-accent/20 text-center">
            <p className="text-muted-foreground mb-4">
              Last updated: May 15, 2025
            </p>
            <Link href="/" className="text-[#97cfda] hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}