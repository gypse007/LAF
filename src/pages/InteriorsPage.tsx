import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Phone, MapPin, Star } from 'lucide-react';

export default function InteriorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const WA_CTA = 'https://wa.me/918019818999?text=Hi%20Lakshmi%20Art%20Fixers%20Team%2C%0AI%E2%80%99m%20interested%20in%20interior%20design%20for%20my%20home.%0A%0A%F0%9F%93%8D%20Location%3A%0A%F0%9F%8F%A2%20Property%20Type%3A%0A%F0%9F%93%90%20Approx%20Area%3A%0A%F0%9F%93%85%20Expected%20Completion%20Date%3A';

  const services = [
    {
      title: 'Modular Kitchens',
      description: 'Transform your cooking space with our premium modular kitchen solutions featuring smart storage, elegant finishes, and ergonomic designs tailored to your lifestyle.',
      features: ['Custom Cabinetry', 'Smart Storage Solutions', 'Premium Finishes', 'Island & Peninsula Designs'],
    },
    {
      title: 'Wardrobes',
      description: 'Maximize your storage with our bespoke wardrobe designs that combine functionality with elegant aesthetics.',
      features: ['Walk-in Closets', 'Sliding & Swing Doors', 'Interior Organizing Systems', 'LED Lighting'],
    },
    {
      title: 'Living Spaces',
      description: 'Create inviting living areas with our comprehensive interior design solutions for sofas, TV units, and entertainment centers.',
      features: ['Custom Sofas', 'TV Units & Wall Panels', 'Crockery Units', 'Book Shelves'],
    },
    {
      title: 'Bedroom Interiors',
      description: 'Design your perfect retreat with our bedroom interior solutions including bed designs, side tables, and dressing units.',
      features: ['Platform Beds', 'Upholstered Headboards', 'Dressing Units', 'Bedside Tables'],
    },
    {
      title: 'False Ceilings & Lighting',
      description: 'Enhance your space with professionally designed false ceilings and strategic lighting solutions.',
      features: ['Gypsum Ceilings', 'POP Designs', 'LED Lighting Plans', ' Cove & Profile Lighting'],
    },
    {
      title: 'Painting & Finishes',
      description: 'Complete your interior with premium wall finishes, textures, and professional painting services.',
      features: ['Texture Walls', 'Wallpapers', 'Stencils', 'Accent Walls'],
    },
  ];

  const whyChooseUs = [
    '10+ Years of Experience',
    '200+ Happy Clients',
    '4.8 Star Rating',
    'Premium Quality Materials',
    'Timely Project Delivery',
    'Post-Installation Support',
  ];

  return (
    <div className="min-h-screen bg-[#060612] text-white">
      <Helmet>
        <title>Lakshmi Interiors | Premium Modular Kitchens & Wardrobes - Hyderabad</title>
        <meta name="description" content="Transform your home with Lakshmi Interiors - premium modular kitchens, wardrobes, and complete home interior solutions in Hyderabad. 200+ happy clients, 4.8 star rating." />
        <meta name="keywords" content="modular kitchens Hyderabad, wardrobes Hyderabad, home interiors Hyderabad, interior design Hyderabad, kitchen cabinets, bedroom interiors" />
        <link rel="canonical" href="https://www.lakshmiartfixers.com/interiors/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lakshmiartfixers.com/interiors/" />
        <meta property="og:title" content="Lakshmi Interiors | Premium Modular Kitchens & Wardrobes - Hyderabad" />
        <meta property="og:description" content="Transform your home with premium modular kitchens, wardrobes, and complete home interior solutions in Hyderabad." />
        <meta property="og:image" content="/images/portfolio/Nighttime_restrobar_interior_202602151942.jpeg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.lakshmiartfixers.com/interiors/" />
        <meta name="twitter:title" content="Lakshmi Interiors | Premium Modular Kitchens & Wardrobes - Hyderabad" />
        <meta name="twitter:description" content="Transform your home with premium modular kitchens, wardrobes, and complete home interior solutions in Hyderabad." />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Lakshmi Interiors",
            "description": "Premium modular kitchens, wardrobes & home interiors in Hyderabad",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Lakshmi Art Fixers",
              "url": "https://www.lakshmiartfixers.com/"
            },
            "areaServed": "Hyderabad, Telangana",
            "serviceType": ["Interior Design", "Modular Kitchens", "Wardrobes", "Home Interiors"],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "200"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/portfolio/Nighttime_restrobar_interior_202602151942.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060612] via-transparent to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#C9A962] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Lakshmi Interiors
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Premium modular kitchens, wardrobes & home interiors in Hyderabad
          </p>
          <a
            href={WA_CTA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-black font-semibold rounded-full hover:bg-white transition-colors"
          >
            Get Free Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our Interior Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#C9A962]/50 transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Why Choose Lakshmi Interiors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 p-4 bg-black/30 rounded-xl"
              >
                <Star className="w-5 h-5 text-[#C9A962] fill-[#C9A962]" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Contact us today for a free consultation and quote
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <a
              href="tel:+919996999234"
              className="flex items-center gap-3 text-lg hover:text-[#C9A962] transition-colors"
            >
              <Phone className="w-5 h-5" />
              +91 99969 99234
            </a>
            <a
              href="tel:+916300473219"
              className="flex items-center gap-3 text-lg hover:text-[#C9A962] transition-colors"
            >
              <Phone className="w-5 h-5" />
              +91 63004 73219
            </a>
            <div className="flex items-center gap-3 text-lg">
              <MapPin className="w-5 h-5 text-[#C9A962]" />
              Hyderabad, Telangana
            </div>
          </div>

          <a
            href={WA_CTA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-black font-semibold rounded-full hover:bg-white transition-colors"
          >
            Chat on WhatsApp
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Lakshmi Interiors - Premium modular kitchens, wardrobes & home interiors in Hyderabad.
            Contact us for premium interior design services in Hyderabad, Telangana.
          </p>
        </div>
      </section>
    </div>
  );
}
