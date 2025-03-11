"use client";

import Link from "next/link";
import { Plane } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-accent/10 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#97cfda] p-1.5 rounded-full">
                <div className="bg-primary p-0.5 rounded-full">
                  <Plane size={16} className="text-[#97cfda]" />
                </div>
              </div>
              <span className="font-bold text-xl gradient-text">SeekSpot</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover the perfect local spots based on your preferences and budget.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#97cfda]">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#97cfda]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#97cfda]">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@seekspot.ai" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                  support@seekspot.ai
                </a>
              </li>
              <li className="text-muted-foreground text-sm">
                123 Main Street, Suite 100
              </li>
              <li className="text-muted-foreground text-sm">
                New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} SeekSpot.ai. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-accent text-sm transition-colors">
              Facebook
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent text-sm transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent text-sm transition-colors">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent text-sm transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}