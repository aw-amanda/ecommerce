"use client"

import { useCartStore } from "@/store/cart-store"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { mockCheckoutAction } from "./mock-checkout-action"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string | null
}

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
    price: 5.00,
    estimatedDays: "2-5 business days"
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 10.00,
    estimatedDays: "1-2 business days"
  },
  {
    id: "pickup",
    name: "Free In-Store Pickup",
    price: 0,
    estimatedDays: "Ready in 1 hour"
  }
]

const QuantityControl = ({ item, onIncrement, onDecrement }: { 
  item: CartItem
  onIncrement: () => void
  onDecrement: () => void
}) => (
  <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-1">
    <button 
      onClick={onDecrement}
      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/80 hover:bg-cyan-500 text-white text-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={`Decrease quantity of ${item.name}`}
    > 
      −
    </button>
    <span className="text-base sm:text-lg font-bold text-white min-w-8 text-center" aria-live="polite">
      {item.quantity}
    </span>
    <button 
      onClick={onIncrement}
      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/80 hover:bg-cyan-500 text-white text-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      aria-label={`Increase quantity of ${item.name}`}
    > 
      +
    </button>
  </div>
)

const CartItemComponent = ({ item, onIncrement, onDecrement }: { 
  item: CartItem
  onIncrement: () => void
  onDecrement: () => void
}) => {
  const itemTotal = (item.price * item.quantity).toFixed(2)
  
  return (
    <li className="flex flex-col sm:flex-row gap-4 border-b border-white/20 pb-4">
      {item.image && (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-white/10">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base sm:text-lg">{item.name}</h3>
          <p className="text-cyan-300 text-sm">${item.price.toFixed(2)} each</p>
        </div>
        
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2">
          <QuantityControl item={item} onIncrement={onIncrement} onDecrement={onDecrement} />
          <p className="text-white font-bold text-base sm:text-lg min-w-20 text-right">${itemTotal}</p>
        </div>
      </div>
    </li>
  )
}

function EmptyCart() {
  return (
    <div className="max-w-2xl mx-auto text-center px-4">
      <div className="bg-gray-950/25 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 md:p-12">
        <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-cyan-400 mb-4 sm:mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
        </svg>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-body font-light text-cyan-200 mb-3 sm:mb-4">
          Your Cart is Empty
        </h2>
        
        <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
          Looks like you haven't added any macaroons to your cart yet.
          Explore our delicious collection and find your perfect treat.
        </p>
        
        <Link 
          href="/products"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
        >
          Browse Our Macaroons
        </Link>
      </div>
    </div>
  )
}

function ShippingAddressForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", address: "", city: "", state: "", zipCode: "", specialInstructions: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-white text-sm mb-1">Full Name *</label>
          <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block text-white text-sm mb-1">Email Address *</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base" placeholder="john@example.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-white text-sm mb-1">Phone Number *</label>
          <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base" placeholder="(555) 123-4567" />
        </div>
        <div>
          <label htmlFor="address" className="block text-white text-sm mb-1">Street Address *</label>
          <input type="text" id="address" name="address" required value={formData.address} onChange={handleChange} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base" placeholder="123 Main St" />
        </div>
        <div>
          <label htmlFor="city" className="block text-white text-sm mb-1">City *</label>
          <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base" placeholder="Your City" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="state" className="block text-white text-sm mb-1">State *</label>
            <input type="text" id="state" name="state" required value={formData.state} onChange={handleChange} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base" placeholder="CA" />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-white text-sm mb-1">ZIP Code *</label>
            <input type="text" id="zipCode" name="zipCode" required value={formData.zipCode} onChange={handleChange} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base" placeholder="12345" />
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="specialInstructions" className="block text-white text-sm mb-1">Special Instructions (Optional)</label>
        <textarea id="specialInstructions" name="specialInstructions" rows={3} value={formData.specialInstructions} onChange={handleChange} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base" placeholder="Gift message, delivery instructions, etc." />
      </div>
      
      <button type="submit" className="w-full py-2.5 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base">
        Continue to Payment
      </button>
    </form>
  )
}

function PaymentForm({ onSubmit, onBack, total, shippingOption }: { 
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
    await new Promise(resolve => setTimeout(resolve, 1500))
    onSubmit()
    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-cyan-500/20 rounded-lg p-4">
        <div className="flex justify-between text-white mb-2">
          <span className="text-sm sm:text-base">Order Total:</span>
          <span className="text-xl sm:text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
        <div className="text-xs sm:text-sm text-cyan-300">Shipping: {shippingOption.name} ({shippingOption.estimatedDays})</div>
      </div>
      
      <div>
        <label className="block text-white text-sm mb-2">Payment Method *</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
            <input type="radio" name="paymentMethod" value="credit_card" checked={paymentMethod === "credit_card"} onChange={(e) => setPaymentMethod(e.target.value)} className="text-cyan-500" />
            <span className="text-white text-sm sm:text-base">Credit / Debit Card</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
            <input type="radio" name="paymentMethod" value="paypal" checked={paymentMethod === "paypal"} onChange={(e) => setPaymentMethod(e.target.value)} className="text-cyan-500" />
            <span className="text-white text-sm sm:text-base">PayPal</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
            <input type="radio" name="paymentMethod" value="apple_pay" checked={paymentMethod === "apple_pay"} onChange={(e) => setPaymentMethod(e.target.value)} className="text-cyan-500" />
            <span className="text-white text-sm sm:text-base">Apple Pay</span>
          </label>
        </div>
      </div>
      
      {paymentMethod === "credit_card" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-white text-sm mb-1">Card Number</label>
            <input type="text" id="cardNumber" placeholder="4242 4242 4242 4242" className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-white text-sm mb-1">Expiry Date</label>
              <input type="text" id="expiry" placeholder="MM/YY" className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base" />
            </div>
            <div>
              <label htmlFor="cvc" className="block text-white text-sm mb-1">CVC</label>
              <input type="text" id="cvc" placeholder="123" className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base" />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button type="button" onClick={onBack} className="w-full sm:flex-1 py-2.5 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-200 text-sm sm:text-base">Back</button>
        <button type="submit" disabled={isProcessing} className="w-full sm:flex-1 py-2.5 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base">
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : "Complete Order"}
        </button>
      </div>
      
      <p className="text-xs text-gray-400 text-center">This is a demo checkout. No real payment will be processed.</p>
    </form>
  )
}

export function CartClient() {
  const { items, removeItem, addItem, clearCart } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment">("cart")
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[0])
  const [shippingAddress, setShippingAddress] = useState<any>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const liveRegionRef = useRef<HTMLDivElement>(null)

  const { subtotal, itemCount } = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
    return { subtotal, itemCount }
  }, [items])

  const shippingCost = selectedShipping.price
  const total = subtotal + shippingCost

  const handleIncrement = useCallback((item: CartItem) => {
    addItem({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image ?? null })
    announceToScreenReader(`Added one ${item.name} to cart`)
  }, [addItem])

  const handleDecrement = useCallback((itemId: string, itemName: string) => {
    removeItem(itemId)
    announceToScreenReader(`Removed one ${itemName} from cart`)
  }, [removeItem])

  const announceToScreenReader = useCallback((message: string) => {
    if (liveRegionRef.current) liveRegionRef.current.textContent = message
  }, [])

  const handleClearCart = useCallback(() => {
    if (items.length > 0) {
      clearCart()
      announceToScreenReader("Cart cleared. All items removed.")
    }
  }, [clearCart, items.length])

  const handleCheckout = async () => {
    if (items.length === 0) return
    announceToScreenReader("Processing your order. Please wait.")
    try {
      await mockCheckoutAction({ items, shippingAddress, shippingOption: selectedShipping, total })
    } catch (error) {
      console.error("Checkout failed:", error)
      announceToScreenReader("Checkout failed. Please try again.")
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
    if (items.length === 0 && mainRef.current) mainRef.current.focus()
  }, [items.length])

  if (!isMounted) return null
  if (items.length === 0) return <EmptyCart />

  return (
    <div ref={mainRef} tabIndex={-1} className="container mx-auto px-4 py-6 max-w-6xl">
      <div ref={liveRegionRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Summary Section */}
        <div className="w-full">
          <div className="bg-gray-950/25 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-cyan-500/20 px-4 sm:px-6 py-4 border-b border-white/20">
              <h2 id="order-summary-heading" className="text-lg sm:text-xl md:text-2xl text-white font-display">
                Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </h2>
            </div>

            <div className="p-4 sm:p-6">
              {/* Cart Items */}
              <ul className="space-y-4">
                {items.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    item={item}
                    onIncrement={() => handleIncrement(item)}
                    onDecrement={() => handleDecrement(item.id, item.name)}
                  />
                ))}
              </ul>

              {/* Totals */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {checkoutStep !== "cart" && (
                    <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                      <span>Shipping ({selectedShipping.name})</span>
                      <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold text-lg sm:text-xl pt-3 border-t border-white/20 mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {checkoutStep === "cart" && (
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
                  <button onClick={handleClearCart} className="px-4 sm:px-6 py-2 bg-red-500/50 hover:bg-red-500/70 text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base">
                    Clear Cart
                  </button>
                  <button onClick={() => setCheckoutStep("shipping")} className="px-6 sm:px-8 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base">
                    Proceed to Checkout →
                  </button>
                </div>
              )}

              {checkoutStep !== "cart" && (
                <button onClick={() => setCheckoutStep("cart")} className="mt-4 text-cyan-400 hover:text-cyan-300 inline-block text-sm sm:text-base">
                  ← Edit Cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Checkout Form Section */}
        <div className="w-full lg:w-1/3">
          {checkoutStep === "shipping" && (
            <div className="bg-gray-950/25 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-cyan-500/20 px-4 sm:px-6 py-4 border-b border-white/20">
                <h2 className="text-lg sm:text-xl text-white font-display">Shipping Information</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="mb-6">
                  <label className="block text-white text-sm mb-2">Shipping Method *</label>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <label key={option.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" value={option.id} checked={selectedShipping.id === option.id} onChange={() => setSelectedShipping(option)} className="text-cyan-500" />
                          <div>
                            <span className="text-white block text-sm sm:text-base">{option.name}</span>
                            <span className="text-gray-400 text-xs">{option.estimatedDays}</span>
                          </div>
                        </div>
                        <span className="text-white font-semibold text-sm sm:text-base">{option.price === 0 ? "Free" : `$${option.price.toFixed(2)}`}</span>
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
              <div className="bg-cyan-500/20 px-4 sm:px-6 py-4 border-b border-white/20">
                <h2 className="text-lg sm:text-xl text-white font-display">Payment Information</h2>
              </div>
              <div className="p-4 sm:p-6">
                <PaymentForm onSubmit={handlePaymentComplete} onBack={() => setCheckoutStep("shipping")} total={total} shippingOption={selectedShipping} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}