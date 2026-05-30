import productsData from "./products.json"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  priceId: string
  images: string[]
  category: string
  inStock: boolean
  flavorNotes?: string[]
  dietary?: string[]
  featured: boolean
}

// Mock product service 
export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return productsData.products
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, 50))
  const product = productsData.products.find(p => p.id === id)
  return product || null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return productsData.products.filter(p => p.featured)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return productsData.products.filter(p => p.category === category)
}

export async function getCategories(): Promise<string[]> {
  const categories = new Set(productsData.products.map(p => p.category))
  return Array.from(categories)
}