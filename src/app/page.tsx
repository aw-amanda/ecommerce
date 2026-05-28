import Image from "next/image";
import heroBG from "../../public/macaroon-stacks.jpg";

// ===============
// METADATA EXPORT for Next.js App Router
// ===============
export const metadata = {
  title: "Macaroon Pâtisserie | Artisanal French Macaroons in Your City",
  description: "Handcrafted French macaroons made fresh daily in Your City. Visit our charming pâtisserie-café, order delivery, or book catering for weddings, parties, and corporate events.",
  keywords: ["macaroon", "macaroons", "french pastry", "patisserie", "bakery", "dessert", "macaron cafe", "your city bakery"],
  openGraph: {
    title: "Macaroon Pâtisserie | Artisanal French Macaroons in Your City",
    description: "Handcrafted French macaroons made fresh daily. Visit our café, order delivery, or book catering for your special event.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://yourdomain.com",
  },
};

// ===============
// INLINE DATA (prevents imports)
// ===============
const flavors = [
  "Vanilla Bean",
  "Dark Chocolate Ganache",
  "Salted Caramel",
  "Pistachio",
  "Rose & Raspberry",
  "Lemon Curd",
  "Neopolitan",
  "Mint",
  "Ice Cream",
  "Coffee Espresso",
  "Citrus Orange",
  "Berry Medley",
  "Seasonal",
];

const testimonials = [
  {
    text: "The most authentic French macaroons I've had outside of Paris! The texture is absolutely perfect—crisp, chewy, and melt-in-your-mouth amazing.",
    author: "Isabelle R.",
    rating: 5,
  },
  {
    text: "We hired Macaroon Pâtisserie for our wedding and the macaroon tower was the star of the dessert table. Our guests are still talking about the salted caramel flavor!",
    author: "Michael & Sarah T.",
    rating: 5,
  },
  {
    text: "Finally, a pâtisserie in Your City that understands what a real macaroon should taste like. I stop by every week for their seasonal flavors.",
    author: "Jennifer L.",
    rating: 5,
  },
  {
    text: "Ordered delivery for my mother's birthday and the presentation was gorgeous. She said they were the best macaroons she's ever had—and she's been to Paris!",
    author: "David R.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "What's the difference between a macaroon and a macaron?",
    answer: "Great question! French macarons (which we make) are delicate sandwich cookies made with almond flour, egg whites, and filling. Coconut macaroons are entirely different—dense, chewy coconut mounds. Our pâtisserie specializes in authentic French macarons with the signature smooth domed tops and ruffled feet."
  },
  {
    question: "Do you offer delivery throughout Your City?",
    answer: "Yes! We deliver to all neighborhoods in Your City and many surrounding areas. Delivery typically takes 1-2 hours for local orders, or you can schedule a specific delivery window up to two weeks in advance."
  },
  {
    question: "How far in advance should I book catering for an event?",
    answer: "For weddings and large corporate events (100+ macaroons), we recommend booking 2-4 weeks in advance. For smaller parties and gatherings, 1 week is usually sufficient. Contact our catering team for rush orders—we'll do our best to accommodate!"
  },
  {
    question: "Are your macaroons gluten-free?",
    answer: "Yes! Traditional French macarons are naturally gluten-free since they're made with almond flour instead of wheat flour. However, please note that our kitchen does handle other baked goods, so we cannot guarantee a completely gluten-free environment."
  },
  {
    question: "Do you offer vegan macaroons?",
    answer: "We offer a rotating selection of vegan macaroons made without eggs or dairy. Call ahead or check our online menu to see our current vegan options. For catering orders, we can create custom vegan macaroon boxes with 48 hours' notice."
  }
];

const benefits = [
  "Small-batch, handmade daily",
  "Premium French ingredients",
  "Certified pastry chefs",
  "Beautiful gift packaging",
  "Competitive catering prices",
  "Flexible delivery windows",
  "Custom flavor development",
  "Gluten-free friendly",
  "Nut-aware options available",
  "Eco-friendly packaging",
];

// ===============
// SERVER COMPONENT
// ===============
export default function Home() {
  return (
    <main 
      id="home"
      className="w-full min-h-screen pt-32 py-2 flex flex-col items-center justify-center"
    >
      {/* SEO H1 - visually hidden but accessible */}
      <h1 className="sr-only">Macaroon Pâtisserie | Artisanal French Macaroons in Your City</h1>
      
      {/* SEO H2 for structure */}
      <h2 className="sr-only">Handcrafted French Macaroons Made Fresh Daily in Your City</h2>

      {/* Hero Background Image */}
      <div 
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
          src={heroBG}
          alt="Artisanal French macaroons stacked beautifully at Macaroon Pâtisserie"
          fill
          className="object-cover opacity-85"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Header Section */}
      <div className="mb-20 p-2 md:p-6 bg-gray-300/30 backdrop-blur-lg border-none rounded-2xl shadow-2xl">
        <header className="flex flex-col items-center text-center p-4">
          <h2 className="mb-2 font-haviland-cursive text-cyan-200 text-5xl md:text-7xl lg:text-9xl text-shadow-lg">
            Macaroon Pâtisserie
          </h2>
          <p className="text-gray-700 text-xl lg:text-2xl">
            Café • Delivery • Catering
          </p>
        </header>
      </div>

      {/* Main Content Section */}
      <div className="mb-20 flex flex-col items-center justify-center gap-5 max-w-4xl mx-auto p-2 md:p-6 bg-gray-300/30 backdrop-blur-3xl border-none rounded-2xl shadow-2xl">
        <div className="text-3xl font-medium text-cyan-200 text-shadow-lg text-center">
          Your City's Premier Destination for Artisanal French Macaroons
        </div>
        
        <div className="text-gray-900 text-md p-4 space-y-6">
          <p className="text-gray-900 text-shadow-md">
            At Macaroon Pâtisserie, we've elevated the art of French macaroon-making to perfection. 
            Each delicate confection is handcrafted in small batches using premium ingredients—real 
            butter, fresh eggs, finely ground almonds, and natural flavorings. The result? A crisp, 
            airy shell that gives way to a soft, chewy interior and finished with our signature 
            ganaches, jams, and buttercreams.
          </p>

          <h3 className="text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg mt-6">Why Macaroon Lovers Choose Our Pâtisserie</h3>
          <p className="text-gray-900 text-shadow-md">
            What makes our macaroons truly exceptional? It's the dedication to traditional French 
            techniques combined with a passion for innovation. Every macaroon that leaves our kitchen 
            has been carefully piped, rested, baked, and filled by skilled pastry artists who treat 
            each piece as a small masterpiece. From the first bite, you'll taste the difference that 
            craftsmanship makes.
          </p>

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 mb-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="text-gray-900 text-shadow-md text-sm">✓ {benefit}</li>
            ))}
          </ul>

          <h3 className="text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg mt-6">Our Macaroon Collections & Services</h3>
          <p className="text-gray-900 text-shadow-md">
            Whether you're treating yourself to a moment of sweetness, surprising a loved one, or 
            planning an unforgettable event, we offer multiple ways to enjoy our macaroons. Visit 
            our welcoming café for coffee and pastries, order contactless delivery right to your 
            door, or let us create a stunning macaroon display for your wedding, party, or corporate 
            gathering.
          </p>

          <h3 className="text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg mt-6">Serving Your City & Beyond</h3>
          <p className="text-gray-900 text-shadow-md">
            Finding exceptional French macaroons in Your City shouldn't require a trip to Paris. 
            We've brought the finest pâtisserie experience directly to our neighborhood and beyond. 
            Whether you're in downtown Your City, the surrounding suburbs, or planning an event 
            across the metro area, our handcrafted macaroons are never far away. Visit our charming 
            café on Main Street or arrange delivery to enjoy our pastries wherever you are.
          </p>

          <h3 className="text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg mt-6">The Art of Macaroon-Making</h3>
          <p className="text-gray-900 text-shadow-md">
            Creating the perfect macaroon is both science and art. Our time-tested process ensures 
            consistency, beauty, and unforgettable flavor in every single piece we create.
          </p>
        </div>
      </div>

      {/* Flavors Section */}
      <div className="mb-20 w-full max-w-6xl mx-auto p-2 md:p-6 bg-gray-300/30 backdrop-blur-3xl border-none rounded-2xl shadow-2xl">
        <h3 className="text-3xl font-medium text-cyan-200 text-shadow-lg text-center mb-4">
          Ready to Indulge in the Finest Macaroons Your City Has to Offer?
        </h3>
        <p className="text-center text-gray-900 text-shadow-md">
          Don't wait to experience the finest French macaroons Your City has to offer. Whether 
          you're stopping by our café, ordering delivery, or planning catering for a special event, 
          our team is ready to make your macaroon dreams come true.
        </p>
        <p className="text-center text-gray-900 text-shadow-md mb-4 md:mb-8">
          Stop by Tuesday through Sunday, order online for delivery throughout Your City, or 
          contact our catering team to make your next event unforgettable.
        </p>
        
        
        <h3 className="mb-6 text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg text-center">
          Our Signature Macaroon Flavors
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {flavors.map((flavor, idx) => (
            <div key={idx} className="bg-cyan-100/30 rounded-lg p-2 text-center">
              <span className="text-gray-900 text-shadow-md text-sm">{flavor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-20 w-full max-w-6xl mx-auto p-2 md:p-6 bg-gray-300/30 backdrop-blur-3xl border-none rounded-2xl shadow-2xl">
        <h3 className="mb-6 text-3xl font-medium text-cyan-200 text-shadow-lg text-center">
          What Our Customers Say About Our Macaroons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-cyan-200/40 rounded-xl p-5">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-800 text-shadow-md italic mb-3">"{testimonial.text}"</p>
              <p className="font-semibold text-cyan-200 text-shadow-md">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20 w-full max-w-4xl mx-auto p-2 md:p-6 bg-gray-300/30 backdrop-blur-3xl border-none rounded-2xl shadow-2xl">
        <h3 className="mb-6 text-3xl font-medium text-cyan-200 text-shadow-lg text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200/50 pb-4">
              <h4 className="text-xl font-medium text-cyan-100 text-shadow-lg mb-2">{faq.question}</h4>
              <p className="font-geist-sans text-gray-900 text-shadow-md">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            "name": "Macaroon Pâtisserie",
            "description": "Handcrafted French macaroons made fresh daily in Your City. Visit our charming pâtisserie-café, order delivery, or book catering for weddings, parties, and corporate events.",
            "url": "https://yourdomain.com",
            "logo": "https://yourdomain.com/MP_Logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main Street",
              "addressLocality": "Your City",
              "addressRegion": "US",
              "postalCode": "12345",
            },
            "priceRange": "$$",
            "servesCuisine": "French Patisserie",
            "openingHours": ["Tue 09:00-19:00", "Wed 09:00-19:00", "Thu 09:00-19:00", "Fri 09:00-19:00", "Sat 09:00-19:00", "Sun 09:00-19:00"],
            "telephone": "(555) 123-MACAROON",
            "email": "bonjour@macaroonpatisserie.com",
          }),
        }}
      />

      {/* Additional Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Macaroon Catering & Delivery",
            "provider": {
              "@type": "Bakery",
              "name": "Macaroon Pâtisserie"
            },
            "areaServed": {
              "@type": "City",
              "name": "Your City Metropolitan Area"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Macaroon Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Signature Macaroon Box (6 pc)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Grand Macaroon Collection (12 pc)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Wedding Macaroon Tower"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Corporate Gift Boxes"
                  }
                }
              ]
            }
          }),
        }}
      />
    </main>
  );
}