import Image from "next/image"
import checkoutBG from "../../../public/mint-macaron-bowl.jpg"
import { CartClient } from "./_components/cart-client"
import { Suspense } from "react"

export const metadata = {
  title: "Your Cart & Checkout | Macaron Pâtisserie | Secure Ordering",
  description: "Review your macaron order, adjust quantities, and complete your purchase securely. Delivery available throughout Your City and surrounding areas. Pickup also available at our café location.",
  keywords: "macaron cart, checkout, order macarons, buy macarons online, your city delivery, Macaron payment, secure checkout",
  openGraph: {
    title: "Your Cart | Macaron Pâtisserie",
    description: "Review and complete your macaron order. Handcrafted french macarons delivered to your door.",
    images: [{ url: "/mint-macaron-bowl.jpg" }],
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

      <div className="text-center mb-8">
        <h1 className="text-7xl md:text-9xl font-haviland-cursive text-cyan-200 text-shadow-lg mb-4 md:mb-8">
          Your Cart
        </h1>
        <p className="text-cyan-50 text-base max-w-2xl mx-auto px-4 text-shadow-lg">
          Review your selection, adjust quantities, and complete your order.
        </p>
      </div>

      <Suspense fallback={<CartSkeleton />}>
        <CartClient />
      </Suspense>

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CheckoutPage",
            "name": "Cart & Checkout | Macaron Pâtisserie",
            "description": "Complete your macaron order securely.",
            "mainEntity": {
              "@type": "Bakery",
              "name": "Macaron Pâtisserie",
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