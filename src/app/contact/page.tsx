import Image from "next/image"
import contactBG from "../../../public/mac-cream-cone.jpg"
import { ContactForm } from "./_components/contact-form"
import { Suspense } from "react"

export const metadata = {
  title: "Contact Macaron Pâtisserie | Visit Us or Book Catering",
  description: "Visit our pâtisserie in Your City, order delivery, or inquire about catering for weddings and events. Our team responds within 24 hours.",
  keywords: "contact macaron patisserie, your city bakery, macaron catering, book delivery",
  openGraph: {
    title: "Contact Macaron Pâtisserie",
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
        <Image 
          src={contactBG} 
          alt="" 
          fill 
          className="object-cover opacity-75" 
          sizes="100vw" 
          quality={85} 
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-8xl md:text-9xl font-haviland-cursive text-cyan-200 mb-4 text-shadow-lg">Contact Us</h1>
          <p className="text-gray-200 text-base max-w-2xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 text-center max-w-md mx-auto mb-8">
          <p className="text-gray-300 text-sm">
            <span className="text-cyan-400">Open:</span> Tue-Sun 9am-7pm | <span className="text-cyan-400">Closed:</span> Mon
          </p>
        </div>

        <Suspense fallback={<FormSkeleton />}>
          <ContactForm />
        </Suspense>
      </div>

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            "name": "Macaron Pâtisserie",
            "telephone": "+1555123Macaron",
            "email": "bonjour@Macaronpatisserie.com",
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