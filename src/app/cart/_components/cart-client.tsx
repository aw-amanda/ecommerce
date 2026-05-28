"use client"

import { useCartStore } from "@/store/cart-store"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { mockCheckoutAction } from "./mock-checkout-action"

// Define CartItem type to match the store
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string | null
}

// Shipping options
interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: string
}

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 500, // $5.00 in cents
    estimatedDays: "2-5 business days"
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 1000, // $10.00 in cents
    estimatedDays: "1-2 business days"
  },
  {
    id: "pickup",
    name: "Free In-Store Pickup",
    price: 0,
    estimatedDays: "Ready in 1 hour"
  }
]

// Reusable quantity control component
const QuantityControl = ({ 
  item, 
  onIncrement, 
  onDecrement 
}: { 
  item: CartItem
  onIncrement: () => void
  onDecrement: () => void
}) => (
  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-1">
    <button 
      onClick={onDecrement}
      className="w-8 h-8 rounded-full bg-cyan-500/80 hover:bg-cyan-500 
               text-white text-xl font-bold transition-all duration-200
               focus:outline-none focus:ring-2 focus:ring-cyan-400
               disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={`Decrease quantity of ${item.name}`}
    > 
      −
    </button>
    <span 
      className="text-lg font-bold text-white min-w-8 text-center"
      aria-live="polite"
    >
      {item.quantity}
    </span>
    <button 
      onClick={onIncrement}
      className="w-8 h-8 rounded-full bg-cyan-500/80 hover:bg-cyan-500 
               text-white text-xl font-bold transition-all duration-200
               focus:outline-none focus:ring-2 focus:ring-cyan-400"
      aria-label={`Increase quantity of ${item.name}`}
    > 
      +
    </button>
  </div>
)

// Reusable cart item component
const CartItem = ({ 
  item, 
  onIncrement, 
  onDecrement 
}: { 
  item: CartItem
  onIncrement: () => void
  onDecrement: () => void
}) => {
  const itemTotal = ((item.price * item.quantity) / 100).toFixed(2)
  
  return (
    <li className="flex flex-col sm:flex-row gap-4 border-b border-white/20 pb-4">
      {/* Product Image (if available) */}
      {item.image && (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-white/10">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      
      {/* Product Details */}
      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">{item.name}</h3>
          <p className="text-cyan-300 text-sm">
            ${(item.price / 100).toFixed(2)} each
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <QuantityControl
            item={item}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <p className="text-white font-bold text-lg">
            ${itemTotal}
          </p>
        </div>
      </div>
    </li>
  )
}

// Empty cart component
function EmptyCart() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-gray-950/25 backdrop-blur-2xl rounded-2xl p-8 md:p-12">
        {/* Empty Cart Icon */}
        <svg 
          className="w-24 h-24 mx-auto text-cyan-400 mb-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" 
          />
        </svg>
        
        <h2 className="text-3xl md:text-4xl font-body font-light text-cyan-200 mb-4">
          Your Cart is Empty
        </h2>
        
        <p className="text-gray-300 mb-8">
          Looks like you haven't added any macaroons to your cart yet.
          Explore our delicious collection and find your perfect treat.
        </p>
        
        <Link 
          href="/products"
          className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white
                   text-lg font-semibold rounded-xl transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
        >
          Browse Our Macaroons
        </Link>
      </div>
    </div>
  )
}

// Shipping address form component
function ShippingAddressForm({ 
  onSubmit 
}: { 
  onSubmit: (data: any) => void 
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    specialInstructions: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-white text-sm mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-white text-sm mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-white text-sm mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-white text-sm mb-1">
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="123 Main St"
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-white text-sm mb-1">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="Your City"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="state" className="block text-white text-sm mb-1">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              placeholder="CA"
            />
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-white text-sm mb-1">
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              required
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              placeholder="12345"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="specialInstructions" className="block text-white text-sm mb-1">
          Special Instructions (Optional)
        </label>
        <textarea
          id="specialInstructions"
          name="specialInstructions"
          rows={3}
          value={formData.specialInstructions}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                   focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          placeholder="Gift message, delivery instructions, etc."
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl
                 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        Continue to Payment
      </button>
    </form>
  )
}

// Payment form component
function PaymentForm({ 
  onSubmit, 
  onBack,
  total,
  shippingOption
}: { 
  onSubmit: () => void
  onBack: () => void
  total: number
  shippingOption: ShippingOption
}) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onSubmit()
    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-cyan-500/20 rounded-lg p-4">
        <div className="flex justify-between text-white mb-2">
          <span>Order Total:</span>
          <span className="text-2xl font-bold">${(total / 100).toFixed(2)}</span>
        </div>
        <div className="text-sm text-cyan-300">
          Shipping: {shippingOption.name} ({shippingOption.estimatedDays})
        </div>
      </div>
      
      <div>
        <label className="block text-white text-sm mb-2">Payment Method *</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="credit_card"
              checked={paymentMethod === "credit_card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-cyan-500"
            />
            <span className="text-white">Credit / Debit Card</span>
          </label>
          
          <label className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-cyan-500"
            />
            <span className="text-white">PayPal</span>
          </label>
          
          <label className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="apple_pay"
              checked={paymentMethod === "apple_pay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-cyan-500"
            />
            <span className="text-white">Apple Pay</span>
          </label>
        </div>
      </div>
      
      {paymentMethod === "credit_card" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-white text-sm mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="4242 4242 4242 4242"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-white text-sm mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                placeholder="MM/YY"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            
            <div>
              <label htmlFor="cvc" className="block text-white text-sm mb-1">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                placeholder="123"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl
                   transition-all duration-200"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isProcessing}
          className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            "Complete Order"
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-400 text-center">
        This is a demo checkout. No real payment will be processed.
      </p>
    </form>
  )
}

export function CartClient() {
  const { items, removeItem, addItem, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment">("cart")
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[0])
  const [shippingAddress, setShippingAddress] = useState<any>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const liveRegionRef = useRef<HTMLDivElement>(null)

  // Calculate totals
  const { subtotal, itemCount } = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
    return { subtotal, itemCount }
  }, [items])

  const total = subtotal + selectedShipping.price

  const formatPrice = useCallback((cents: number) => {
    return (cents / 100).toFixed(2)
  }, [])

  const handleIncrement = useCallback((item: CartItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image ?? null
    })
    announceToScreenReader(`Added one ${item.name} to cart`)
  }, [addItem])

  const handleDecrement = useCallback((itemId: string, itemName: string) => {
    removeItem(itemId)
    announceToScreenReader(`Removed one ${itemName} from cart`)
  }, [removeItem])

  const announceToScreenReader = useCallback((message: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message
    }
  }, [])

  const handleClearCart = useCallback(() => {
    if (items.length > 0) {
      clearCart()
      announceToScreenReader("Cart cleared. All items removed.")
    }
  }, [clearCart, items.length])

  const handleCheckout = async () => {
    if (items.length === 0) return
    
    setIsProcessing(true)
    announceToScreenReader("Processing your order. Please wait.")
    
    try {
      const orderData = {
        items,
        shippingAddress,
        shippingOption: selectedShipping,
        total
      }
      
      await mockCheckoutAction(orderData)
    } catch (error) {
      console.error("Checkout failed:", error)
      announceToScreenReader("Checkout failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleShippingSubmit = (data: any) => {
    setShippingAddress(data)
    setCheckoutStep("payment")
    announceToScreenReader("Shipping address saved. Proceeding to payment.")
  }

  const handlePaymentComplete = async () => {
    await handleCheckout()
  }

  useEffect(() => {
    setIsMounted(true)
    if (items.length === 0 && mainRef.current) {
      mainRef.current.focus()
    }
  }, [items.length])

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div 
      ref={mainRef}
      tabIndex={-1}
      className="container mx-auto px-4 py-6 max-w-6xl"
    >
      <div 
        ref={liveRegionRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-950/25 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-cyan-500/20 px-6 py-4 border-b border-white/20">
              <h2 
                id="order-summary-heading"
                className="text-xl md:text-2xl text-white font-display"
              >
                Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </h2>
            </div>

            <div className="p-6">
              {checkoutStep === "cart" && (
                <>
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onIncrement={() => handleIncrement(item)}
                        onDecrement={() => handleDecrement(item.id, item.name)}
                      />
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>${formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-xl pt-2 border-t border-white/20">
                        <span>Total</span>
                        <span>${formatPrice(subtotal)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
                    <button 
                      onClick={handleClearCart}
                      className="px-6 py-2 bg-red-500/50 hover:bg-red-500/70 
                               text-white rounded-xl transition-all duration-200
                               focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label="Remove all items from cart"
                    >
                      Clear Cart
                    </button>
                    
                    <button 
                      onClick={() => setCheckoutStep("shipping")}
                      className="px-8 py-2 bg-cyan-500 hover:bg-cyan-600 
                               text-white font-bold rounded-xl transition-all duration-200
                               focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      Proceed to Checkout →
                    </button>
                  </div>
                </>
              )}

              {checkoutStep !== "cart" && (
                <button
                  onClick={() => setCheckoutStep("cart")}
                  className="text-cyan-400 hover:text-cyan-300 mb-4 inline-block"
                >
                  ← Back to Cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Checkout Form Section */}
        <div className="lg:col-span-1">
          {checkoutStep === "shipping" && (
            <div className="bg-gray-950/25 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-cyan-500/20 px-6 py-4 border-b border-white/20">
                <h2 className="text-xl text-white font-display">
                  Shipping Information
                </h2>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-white text-sm mb-2">Shipping Method *</label>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <label key={option.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping.id === option.id}
                            onChange={() => setSelectedShipping(option)}
                            className="text-cyan-500"
                          />
                          <div>
                            <span className="text-white block">{option.name}</span>
                            <span className="text-gray-400 text-xs">{option.estimatedDays}</span>
                          </div>
                        </div>
                        <span className="text-white font-semibold">
                          {option.price === 0 ? "Free" : `$${(option.price / 100).toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <ShippingAddressForm onSubmit={handleShippingSubmit} />
              </div>
            </div>
          )}

          {checkoutStep === "payment" && (
            <div className="bg-gray-950/25 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-cyan-500/20 px-6 py-4 border-b border-white/20">
                <h2 className="text-xl text-white font-display">
                  Payment Information
                </h2>
              </div>
              
              <div className="p-6">
                <PaymentForm 
                  onSubmit={handlePaymentComplete}
                  onBack={() => setCheckoutStep("shipping")}
                  total={total}
                  shippingOption={selectedShipping}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
          <svg className="w-8 h-8 mx-auto text-cyan-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-white font-semibold mb-1">Same-Day Delivery</h3>
          <p className="text-gray-300 text-sm">Order by 2pm for same-day delivery in Your City</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
          <svg className="w-8 h-8 mx-auto text-cyan-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h3 className="text-white font-semibold mb-1">Secure Payment</h3>
          <p className="text-gray-300 text-sm">Your payment information is encrypted and secure</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
          <svg className="w-8 h-8 mx-auto text-cyan-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="text-white font-semibold mb-1">Free Pickup</h3>
          <p className="text-gray-300 text-sm">Skip the delivery fee - pickup at our café</p>
        </div>
      </div>
    </div>
  )
}