"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/favicon.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", icon: "📸" },
    { name: "Facebook", href: "https://facebook.com", icon: "📘" },
    { name: "Twitter", href: "https://twitter.com", icon: "🐦" },
    { name: "Pinterest", href: "https://pinterest.com", icon: "📌" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Cart", href: "/cart" },
    { name: "Contact", href: "/contact" },
  ];

  const businessHours = [
    { day: "Tuesday", hours: "9:00 AM - 7:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 7:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 7:00 PM" },
    { day: "Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 7:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 7:00 PM" },
    { day: "Monday", hours: "Closed" },
  ];

  const contactInfo = {
    address: "123 Main Street, Your City, US 12345",
    phone: "(555) 123-MACAROON",
    email: "bonjour@macaroonpatisserie.com",
  };

  return (
    <footer className="w-full bg-gray-950/50 backdrop-blur-xl border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start mb-4">
              <div className="relative w-12 h-12 bg-white rounded-full overflow-hidden shadow-md">
                <Image src={Logo} alt="Macaroon Pâtisserie Logo" fill className="object-contain p-2" sizes="48px" />
              </div>
            </div>
            <h3 className="font-haviland-cursive text-cyan-200 text-2xl mb-2">Macaroon Pâtisserie</h3>
            <p className="text-gray-400 text-sm">Artisanal French macaroons made fresh daily in Your City.</p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold text-lg mb-4 border-b border-cyan-400/30 inline-block pb-1">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold text-lg mb-4 border-b border-cyan-400/30 inline-block pb-1">Business Hours</h4>
            <ul className="space-y-1">
              {businessHours.map((hours, idx) => (
                <li key={idx} className="text-gray-400 text-sm flex justify-between sm:justify-start gap-4">
                  <span className="font-medium">{hours.day}:</span>
                  <span className={hours.day === "Monday" ? "text-red-400" : "text-gray-300"}>{hours.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold text-lg mb-4 border-b border-cyan-400/30 inline-block pb-1">Contact Us</h4>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm">
                <span className="text-cyan-400">📍</span>
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm">
                <span className="text-cyan-400">📞</span>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-cyan-400 transition-colors">{contactInfo.phone}</a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm">
                <span className="text-cyan-400">✉️</span>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-cyan-400 transition-colors break-all">{contactInfo.email}</a>
              </li>
            </ul>

            <div className="flex justify-center sm:justify-start gap-3">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-cyan-500/30 transition-all duration-200 hover:scale-110" aria-label={social.name}>
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">© {currentYear} Macaroon Pâtisserie. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-cyan-400 text-xs sm:text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-cyan-400 text-xs sm:text-sm transition-colors">Terms of Service</Link>
            <Link href="/accessibility" className="text-gray-500 hover:text-cyan-400 text-xs sm:text-sm transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};