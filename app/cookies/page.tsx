"use client";

import { Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground grid-pattern pt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 deep-blue-blur">
          <div className="flex justify-center mb-6">
            <div className="bg-[#97cfda] p-6 rounded-full glow-effect">
              <Cookie size={48} className="text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 gradient-text">Cookie Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            How we use cookies and similar technologies on our platform.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-lg max-w-4xl mx-auto">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">1. Introduction</h2>
              <p className="mb-4">
                This Cookie Policy explains how SeekSpot ("we," "our," or "us") uses cookies and similar technologies when you visit our website, mobile application, or any other services we offer (collectively, the "Services").
              </p>
              <p>
                By using our Services, you consent to the use of cookies and similar technologies in accordance with this Cookie Policy. If you do not accept the use of cookies, please disable them as described below so they cannot be used when you visit our Services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">2. What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site. Cookies can be "persistent" or "session" cookies.
              </p>
              <p className="mb-4">
                Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser. Cookies can also be first-party cookies, which are set by the website you are visiting, or third-party cookies, which are set by a third party.
              </p>
              <p>
                In addition to cookies, we may use other similar technologies, such as web beacons (also known as pixel tags or clear GIFs), which are tiny graphics files that allow us to track your use of our Services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">3. Types of Cookies We Use</h2>
              <p className="mb-4">
                We use the following types of cookies:
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">3.1 Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the Services to function properly. They enable basic functions like page navigation, access to secure areas, and security features. The Services cannot function properly without these cookies.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">3.2 Preference Cookies</h3>
              <p className="mb-4">
                These cookies enable the Services to remember information that changes the way the Services behave or look, such as your preferred language or the region you are in. They help us to remember your settings and preferences so that you don't have to set them each time you visit.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">3.3 Analytics Cookies</h3>
              <p className="mb-4">
                These cookies help us understand how visitors interact with the Services by collecting and reporting information anonymously. They allow us to count visits and traffic sources so we can measure and improve the performance of our Services.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-accent">3.4 Marketing Cookies</h3>
              <p>
                These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">4. Specific Cookies We Use</h2>
              <p className="mb-4">
                Below is a list of the main cookies we use and what we use them for:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary/30">
                      <th className="border border-accent/20 p-2 text-left">Cookie Name</th>
                      <th className="border border-accent/20 p-2 text-left">Type</th>
                      <th className="border border-accent/20 p-2 text-left">Purpose</th>
                      <th className="border border-accent/20 p-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-accent/20 p-2">_session</td>
                      <td className="border border-accent/20 p-2">Essential</td>
                      <td className="border border-accent/20 p-2">Maintains your session state</td>
                      <td className="border border-accent/20 p-2">Session</td>
                    </tr>
                    <tr>
                      <td className="border border-accent/20 p-2">_auth</td>
                      <td className="border border-accent/20 p-2">Essential</td>
                      <td className="border border-accent/20 p-2">Authenticates your account</td>
                      <td className="border border-accent/20 p-2">30 days</td>
                    </tr>
                    <tr>
                      <td className="border border-accent/20 p-2">_preferences</td>
                      <td className="border border-accent/20 p-2">Preference</td>
                      <td className="border border-accent/20 p-2">Stores your preferences</td>
                      <td className="border border-accent/20 p-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-accent/20 p-2">_ga</td>
                      <td className="border border-accent/20 p-2">Analytics</td>
                      <td className="border border-accent/20 p-2">Google Analytics - Distinguishes users</td>
                      <td className="border border-accent/20 p-2">2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-accent/20 p-2">_gid</td>
                      <td className="border border-accent/20 p-2">Analytics</td>
                      <td className="border border-accent/20 p-2">Google Analytics - Distinguishes users</td>
                      <td className="border border-accent/20 p-2">24 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-accent/20 p-2">_fbp</td>
                      <td className="border border-accent/20 p-2">Marketing</td>
                      <td className="border border-accent/20 p-2">Facebook Pixel - Tracks conversions</td>
                      <td className="border border-accent/20 p-2">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">5. Third-Party Cookies</h2>
              <p className="mb-4">
                Some cookies are placed by third parties on our Services. These third parties may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Analytics providers (such as Google Analytics)</li>
                <li>Advertising networks</li>
                <li>Social media platforms</li>
                <li>Payment processors</li>
              </ul>
              <p>
                These third parties may use cookies, web beacons, and similar technologies to collect information about your use of our Services and other websites. This information may be used to, among other things, analyze and track data, determine the popularity of certain content, and better understand your online activity.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">6. Managing Cookies</h2>
              <p className="mb-4">
                Most web browsers allow you to manage your cookie preferences in Delaware. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from version to version.
              </p>
              <p className="mb-4">
                You can obtain up-to-date information about blocking and deleting cookies via these links:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#97cfda] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#97cfda] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#97cfda] hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#97cfda] hover:underline">Microsoft Edge</a></li>
              </ul>
              <p>
                Please note that if you choose to block cookies, you may not be able to use all the features of our Services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">7. Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised Cookie Policy on our Services. Your continued use of our Services following these changes means that you accept the revised Cookie Policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#97cfda]">8. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at <a href="mailto:privacy@seekspot.ai" className="text-[#97cfda] hover:underline">privacy@seekspot.ai</a>.
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