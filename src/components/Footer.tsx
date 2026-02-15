import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Linkedin, Twitter, MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative pt-16 sm:pt-20 pb-6 sm:pb-8 overflow-hidden bg-white text-gray-900"
    >
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <img
                src="/images/logo-no-bg.png"
                alt="LAF Logo"
                className="w-48 h-48 sm:w-60 sm:h-60 object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-md">
              Transforming spaces into extraordinary experiences through precision wall artistry and innovative design.
            </p>
            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1 md:justify-self-end">
            <h3 className="text-gray-900 font-bold mb-4 sm:mb-6 text-lg sm:text-xl">Contact</h3>
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-start gap-3 sm:gap-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xs">
                  5-5-510/1, NH65, Abhyudaya Nagar,<br />
                  Chintalkunta Hyderabad,<br />
                  Telangana 500074
                </span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6] flex-shrink-0" />
                <a href="tel:8019818999" className="text-gray-600 hover:text-[#8B5CF6] transition-colors text-base sm:text-lg font-medium">
                  80198 18999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 mb-10 sm:mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm sm:text-base">Subscribe to our newsletter for the latest projects and insights.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white border border-gray-200 text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
              />
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#8B5CF6] text-white font-medium text-sm sm:text-base hover:bg-[#A78BFA] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © 2026 Lakshmi Art Fixes. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-gray-500 text-xs sm:text-sm hover:text-[#8B5CF6] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 text-xs sm:text-sm hover:text-[#8B5CF6] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large Background Text - Subtle on Light Theme */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-[12vw] sm:text-[20vw] font-bold text-gray-900/[0.03] whitespace-nowrap leading-none translate-y-1/3">
          LAKSHMI ART FIXES
        </div>
      </div>
    </footer>
  );
}
