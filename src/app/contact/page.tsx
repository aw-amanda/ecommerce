import Image from "next/image"
import contactBG from "../../../public/mac-cream-cone.jpg"
import { ContactForm } from "./_components/contact-form"
import { Suspense } from "react"

export const metadata = {
  title: "Contact Macaroon Pâtisserie | Visit Us or Book Catering",
  description: "Visit our pâtisserie in Your City, order delivery, or inquire about catering for weddings and events. Our team responds within 24 hours.",
  keywords: "contact macaroon patisserie, your city bakery, macaroon catering, book delivery",
  openGraph: {
    title: "Contact Macaroon Pâtisserie",
    description: "Reach out for questions, catering, or special orders.",
    images: [{ url: "/mac-cream-cone.jpg" }],
  },
  alternates: {
    canonical: "/contact",
  },
}

function FormSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-black/70 backdrop-blur-md rounded-2xl p-6 animate-pulse">
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-12 bg-gray-700 rounded"></div>
        ))}
        <div className="h-24 bg-gray-700 rounded"></div>
        <div className="h-12 bg-cyan-600 rounded"></div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-12">
      <div className="fixed inset-0 -z-10">
        <Image src={contactBG} alt="" fill className="object-cover opacity-75" sizes="100vw" quality={85} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-display text-cyan-200 mb-4">Contact Us</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-black/60 transition">
            <svg className="w-8 h-8 mx-auto text-cyan-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 className="text-white font-semibold text-sm">Call Us</h3>
            <a href="tel:+1555123MACAROON" className="text-cyan-300 text-sm">(555) 123-MACAROON</a>
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-black/60 transition">
            <svg className="w-8 h-8 mx-auto text-cyan-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-white font-semibold text-sm">Email</h3>
            <a href="mailto:bonjour@macaroonpatisserie.com" className="text-cyan-300 text-sm break-all">bonjour@macaroonpatisserie.com</a>
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-black/60 transition">
            <svg className="w-8 h-8 mx-auto text-cyan-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-white font-semibold text-sm">Visit</h3>
            <p className="text-gray-300 text-sm">123 Main St, Your City</p>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 text-center max-w-md mx-auto mb-8">
          <p className="text-gray-300 text-sm">
            <span className="text-cyan-400">Open:</span> Tue-Sun 9am-7pm | <span className="text-cyan-400">Closed:</span> Mon
          </p>
        </div>

        <Suspense fallback={<FormSkeleton />}>
          <ContactForm />
        </Suspense>
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            "name": "Macaroon Pâtisserie",
            "telephone": "+1555123MACAROON",
            "email": "bonjour@macaroonpatisserie.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main Street",
              "addressLocality": "Your City",
              "addressRegion": "US",
              "postalCode": "12345"
            },
            "openingHours": ["Tue-Sun 09:00-19:00"]
          })
        }}
      />
    </main>
  )
}