"use client";

import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground grid-pattern pt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 deep-blue-blur">
          <div className="flex justify-center mb-6">
            <div className="bg-[#97cfda] p-6 rounded-full glow-effect">
              <Shield size={48} className="text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 gradient-text">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            How we collect, use, and protect your personal information.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-lg max-w-4xl mx-auto">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">1. Introduction</h2>
              <p className="mb-4">
                At SeekSpot ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, or any other services we offer (collectively, the "Services").
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">2. Information We Collect</h2>
              <p className="mb-4">
                We collect several types of information from and about users of our Services, including:
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">2.1 Personal Information</h3>
              <p className="mb-4">
                Personal information is data that can be used to identify you individually, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Telephone number</li>
                <li>Postal address</li>
                <li>Payment information</li>
                <li>Any other information you provide to us</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">2.2 Location Information</h3>
              <p className="mb-4">
                When you use our Services, we may collect and process information about your actual location. We use various technologies to determine location, including IP address, GPS, and other sensors that may, for example, provide us with information on nearby devices, Wi-Fi access points, and cell towers.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">2.3 Usage Information</h3>
              <p className="mb-4">
                We may collect information about how you use our Services, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Search queries</li>
                <li>Preferences and settings</li>
                <li>Interaction with our Services</li>
                <li>Time spent on our Services</li>
                <li>Pages visited</li>
                <li>Features used</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">2.4 Device Information</h3>
              <p>
                We may collect information about the device you use to access our Services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device type</li>
                <li>Operating system</li>
                <li>Browser type</li>
                <li>IP address</li>
                <li>Device identifiers</li>
                <li>Mobile network information</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">3. How We Collect Information</h2>
              <p className="mb-4">
                We collect information in several ways:
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">3.1 Information You Provide</h3>
              <p className="mb-4">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Register for an account</li>
                <li>Complete a profile</li>
                <li>Use our search functionality</li>
                <li>Contact us</li>
                <li>Participate in surveys or promotions</li>
                <li>Post reviews or comments</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">3.2 Automated Technologies</h3>
              <p className="mb-4">
                When you use our Services, we may use automated technologies to collect information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Cookies</li>
                <li>Web beacons</li>
                <li>Pixel tags</li>
                <li>Local storage</li>
                <li>Analytics tools</li>
              </ul>
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, please note that some parts of our Services may be inaccessible or not function properly.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">4. How We Use Your Information</h2>
              <p className="mb-4">
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide, maintain, and improve our Services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, promotions, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
                <li>Personalize and improve the Services and provide content or features that match user profiles or interests</li>
                <li>Facilitate contests, sweepstakes, and promotions and process and deliver entries and rewards</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities and protect the rights and property of SeekSpot and others</li>
                <li>Carry out any other purpose described to you at the time the information was collected</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">5. How We Share Your Information</h2>
              <p className="mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">5.1 With Service Providers</h3>
              <p className="mb-4">
                We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">5.2 For Business Transfers</h3>
              <p className="mb-4">
                We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">5.3 For Legal Purposes</h3>
              <p className="mb-4">
                We may share your information if we believe disclosure is necessary or appropriate to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Comply with applicable laws, regulations, legal processes, or governmental requests</li>
                <li>Enforce our agreements, including for billing and collection purposes</li>
                <li>Protect our rights, property, or safety, or that of our users or others</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">5.4 With Your Consent</h3>
              <p>
                We may share your information with third parties when you have given us your consent to do so.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">6. Data Security</h2>
              <p className="mb-4">
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure in Delaware. All information you provide to us is stored on secure servers behind firewalls.
              </p>
              <p className="mb-4">
                The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Services, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
              </p>
              <p>
                Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Services. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">7. Your Choices</h2>
              <p className="mb-4">
                You have several choices regarding your personal information:
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">7.1 Account Information</h3>
              <p className="mb-4">
                You may update, correct, or delete your account information at any time by logging into your account or contacting us. Note that we may retain certain information as required by law or for legitimate business purposes.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">7.2 Location Information</h3>
              <p className="mb-4">
                You can choose whether or not to allow our Services to collect and use real-time information about your device's location through your device's settings. If you block the use of location information, some parts of our Services may be inaccessible or not function properly.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">7.3 Cookies</h3>
              <p className="mb-4">
                Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Services.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">7.4 Promotional Communications</h3>
              <p>
                You may opt out of receiving promotional emails from us by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">8. Children's Privacy</h2>
              <p>
                Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, do not use or provide any information on our Services. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 13, please contact us.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">9. Changes to Our Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. If we make material changes to how we treat our users' personal information, we will notify you through a notice on our website or by other means. The date the Privacy Policy was last revised is identified at the bottom of the page. You are responsible for periodically visiting our Services and this Privacy Policy to check for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">10. Contact Information</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at <a href="mailto:privacy@seekspot.ai" className="text-[#97cfda] hover:underline">privacy@seekspot.ai</a>.
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