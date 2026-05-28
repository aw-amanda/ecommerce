"use client"

import Link from "next/link"
import { useCartStore } from "@/store/cart-store"
import { useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import successBG from "@/public/mint-macaroon-bowl.jpg"

function SuccessContent() {
  const { clearCart } = useCartStore()
  const mainRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")

  useEffect(() => {
    clearCart()
    mainRef.current?.focus()
  }, [clearCart])

  return (
    <main 
      ref={mainRef}
      tabIndex={-1}
      aria-labelledby="payment-success-heading"
      aria-live="polite"
      className="min-h-screen pt-32 pb-12 relative"
    >
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
          src={successBG}
          alt=""
          fill
          className="object-cover opacity-85"
          priority={false}
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="container mx-auto px-4 max-w-2xl">
        <div 
          role="alert" 
          aria-live="assertive"
          className="bg-gray-950/25 backdrop-blur-2xl rounded-2xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 
            id="payment-success-heading"
            className="text-3xl md:text-4xl text-cyan-200 mb-4 font-display"
          >
            Thank You for Your Order!
          </h1>
          
          <p className="text-cyan-100 mb-6 text-lg">
            Your payment was successful and your order is being processed.
          </p>

          {orderId && (
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <p className="text-gray-300 text-sm">Order Number</p>
              <p className="text-cyan-300 font-mono text-lg">{orderId}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <p className="text-gray-300">
              You will receive a confirmation email shortly with your order details and tracking information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link 
                href={"/products"}
                aria-label="Continue shopping"
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all duration-200"
              >
                Continue Shopping
              </Link>
              
              <Link 
                href={"/"}
                aria-label="Return to home"
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
        
        <p className="sr-only">
          Your payment was processed successfully and your cart has been cleared.
        </p>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Order",
            "orderNumber": orderId,
            "orderStatus": "https://schema.org/OrderProcessing",
            "priceCurrency": "USD",
            "acceptedOffer": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Macaroon Assortment"
              }
            }
          })
        }}
      />
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 pb-12 flex items-center justify-center">
        <div className="text-cyan-200">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}