"use server"

import { redirect } from "next/navigation"

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

interface OrderData {
  items: CartItem[]
  shippingAddress: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    specialInstructions?: string
  }
  shippingOption: ShippingOption
  total: number
}

// Generate a random order ID
function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const mockCheckoutAction = async (orderData: OrderData): Promise<void> => {
  // Validate order data
  if (!orderData.items || orderData.items.length === 0) {
    throw new Error("Cart is empty")
  }

  if (!orderData.shippingAddress) {
    throw new Error("Shipping address is required")
  }

  // Validate shipping fields
  const { fullName, email, phone, address, city, state, zipCode } = orderData.shippingAddress
  if (!fullName || !email || !phone || !address || !city || !state || !zipCode) {
    throw new Error("Please fill in all required shipping fields")
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Create order record
  const orderId = generateOrderId()
  const order = {
    id: orderId,
    ...orderData,
    createdAt: new Date().toISOString(),
    status: "pending"
  }

  // Log order for debugging in dev
  if (process.env.NODE_ENV === "development") {
    console.log("Order created:", order)
  }
  
  // Redirect to success page with order ID
  redirect(`/payment_success?order_id=${orderId}`)
}