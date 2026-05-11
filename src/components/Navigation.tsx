import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'What We Do', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'How It Works', href: '#process' },
  { label: 'Results', href: '#beforeafter' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent backdrop-blur-[2px]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28 sm:h-32 lg:h-36">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <img
                src="/images/logo-no-bg.png"
                alt="LAF"
                className="h-24 sm:h-28 lg:h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative text-sm transition-colors duration-300 group ${isScrolled ? 'text-gray-600 hover:text-black' : 'text-gray-800 hover:text-black'}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#C9A962] to-[#9A7B3D] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <a
                href="https://wa.me/918019818999?text=Hi%20Laksmi%20Art%20Fixes%20Team%2C%0AI%E2%80%99m%20interested%20in%20commercial%20wall%20branding%20for%20my%20space.%0A%0A%F0%9F%93%8D%20Location%3A%0A%F0%9F%8F%A2%20Business%20Type%3A%0A%F0%9F%93%90%20Approx%20Wall%20Area%3A%0A%F0%9F%93%85%20Expected%20Completion%20Date%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#9A7B3D] text-white font-medium text-sm hover:from-[#E8D5A3] hover:to-[#C9A962] transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,98,0.3)] inline-block"
              >
                Start Project
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center ${isScrolled ? 'text-black' : 'text-gray-900'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[280px] sm:w-80 bg-[#060612] border-l border-white/10 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="pt-20 sm:pt-24 px-6 sm:px-8">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left py-3 text-lg sm:text-xl text-white/80 hover:text-[#C9A962] transition-colors duration-300 border-b border-white/5"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="https://wa.me/918019818999?text=Hi%20Laksmi%20Art%20Fixes%20Team%2C%0AI%E2%80%99m%20interested%20in%20commercial%20wall%20branding%20for%20my%20space.%0A%0A%F0%9F%93%8D%20Location%3A%0A%F0%9F%8F%A2%20Business%20Type%3A%0A%F0%9F%93%90%20Approx%20Wall%20Area%3A%0A%F0%9F%93%85%20Expected%20Completion%20Date%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#C9A962] to-[#9A7B3D] text-white font-medium text-center hover:from-[#E8D5A3] hover:to-[#C9A962] transition-all duration-300 block"
              >
                Start Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
