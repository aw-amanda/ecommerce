import Image from "next/image"
import checkoutBG from "../../../public/mint-macaroon-bowl.jpg"
import { CartClient } from "./_components/cart-client"
import { Suspense } from "react"

// ===============
// METADATA
// ===============
export const metadata = {
  title: "Your Cart & Checkout | Macaroon Pâtisserie | Secure Ordering",
  description: "Review your macaroon order, adjust quantities, and complete your purchase securely. Delivery available throughout Your City and surrounding areas. Pickup also available at our café location.",
  keywords: "macaroon cart, checkout, order macaroons, buy macaroons online, your city delivery, macaroon payment, secure checkout",
  openGraph: {
    title: "Your Cart | Macaroon Pâtisserie",
    description: "Review and complete your macaroon order. Handcrafted French macaroons delivered to your door.",
    images: [{ url: "/mint-macaroon-bowl.jpg" }],
    type: "website",
  },
  robots: "noindex, follow",
  alternates: {
    canonical: "/cart",
  },
}

function CartSkeleton() {
  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="fixed inset-0 -z-10">
        <Image
          src={checkoutBG}
          alt=""
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-12 bg-cyan-400/20 rounded-lg w-48 mx-auto mb-8"></div>
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="h-96 bg-white/5 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <main className="min-h-screen pt-32 pb-12">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
          src={checkoutBG}
          alt=""
          fill
          className="object-cover opacity-85"
          priority={false}
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-7xl md:text-9xl font-haviland-cursive text-cyan-200 text-shadow-lg mb-4 md:mb-8">
          Your Cart
        </h1>
        <p className="text-cyan-50 text-lg max-w-2xl mx-auto px-4 text-shadow-lg">
          Review your selection, adjust quantities, and complete your order
        </p>
      </div>

      <Suspense fallback={<CartSkeleton />}>
        <CartClient />
      </Suspense>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CheckoutPage",
            "name": "Cart & Checkout | Macaroon Pâtisserie",
            "description": "Complete your macaroon order securely.",
            "mainEntity": {
              "@type": "Bakery",
              "name": "Macaroon Pâtisserie",
              "url": "https://yourdomain.com/cart",
              "acceptsReservations": "https://schema.org/True",
              "paymentAccepted": ["Credit Card", "Debit Card", "Apple Pay", "Google Pay"],
              "areaServed": {
                "@type": "City",
                "name": "Your City Metropolitan Area"
              },
              "deliveryLeadTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 3,
                "unitCode": "DAY"
              }
            }
          })
        }}
      />
    </main>
  )
}