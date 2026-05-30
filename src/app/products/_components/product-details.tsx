"use client"

import { Product } from "../_data/product-service"
import Image from "next/image"
import { useCartStore } from "@/store/cart-store"
import { useEffect, useRef, useCallback, useState } from "react"
import Link from "next/link"
import { getImagePath } from "@/lib/path";

interface ProductDetailProps {
    product: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
    const { items, addItem, removeItem } = useCartStore()
    const [isAdding, setIsAdding] = useState(false)
    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 0
    const priceAmount = product.price ? 
                        `$${product.price.toFixed(2)}` : 
                        'Price not available'
    const quantityRef = useRef<HTMLSpanElement>(null)
    const addButtonRef = useRef<HTMLButtonElement>(null)

    const handleAddItem = useCallback(async () => {
        setIsAdding(true)
        addItem({
            id: product.id,
            name: product.name,
            price: product.price, // Store in dollars directly
            image: product.images ? product.images[0] : null,
            quantity: 1,
        })
        const announcement = `${product.name} added to cart`
        const liveRegion = document.getElementById('cart-live-region')
        if (liveRegion) liveRegion.textContent = announcement
        
        setTimeout(() => setIsAdding(false), 300)
    }, [addItem, product.id, product.name, product.images, product.price])

    const handleRemoveItem = useCallback(() => {
        removeItem(product.id)
        setTimeout(() => quantityRef.current?.focus(), 100)
        
        const announcement = `${product.name} removed from cart`
        const liveRegion = document.getElementById('cart-live-region')
        if (liveRegion) liveRegion.textContent = announcement
    }, [removeItem, product.id, product.name])

    useEffect(() => {
        if (quantityRef.current) {
            quantityRef.current.setAttribute('aria-live', 'polite')
            quantityRef.current.setAttribute('aria-atomic', 'true')
        }
    }, [])

    return (
        <>
            <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                    <li aria-hidden="true">/</li>
                    <li><Link href="/products" className="hover:text-cyan-400 transition-colors">Products</Link></li>
                    <li aria-hidden="true">/</li>
                    <li className="text-cyan-200 text-shadow-md font-semibold" aria-current="page">{product.name}</li>
                </ol>
            </nav>

            <article className="container mx-auto px-4 py-6 sm:py-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Product Image */}
                    {product.images && product.images[0] && (
                        <div className="w-full lg:w-1/2">
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                                <Image 
                                    alt={product.name} 
                                    src={getImagePath("/product.images[0]")} 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition duration-300 hover:scale-105"
                                    priority
                                    quality={90}
                                />
                            </div>
                        </div>
                    )}

                    <div className="w-full lg:w-1/2 p-2 md:p-3 bg-transparent backdrop-blur-2xl rounded-2xl">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 font-display text-cyan-200 text-shadow-lg">
                            {product.name}
                        </h1>
                        
                        {product.description && (
                            <p className="text-base sm:text-lg text-gray-100 font-body leading-relaxed">
                                {product.description}
                            </p>
                        )}

                        {product.flavorNotes && product.flavorNotes.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-sm font-semibold text-gray-300 mb-2">Flavor Profile:</h2>
                                <div className="flex flex-wrap gap-2">
                                    {product.flavorNotes.map((note, idx) => (
                                        <span key={idx} className="bg-cyan-100/50 px-3 py-1 rounded-full text-sm">
                                            {note}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.dietary && product.dietary.length > 0 && (
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {product.dietary.map((diet, idx) => (
                                        <span key={idx} className="bg-green-100/50 text-green-700 px-3 py-1 rounded-full text-sm">
                                            {diet}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p 
                                className="text-2xl sm:text-3xl font-bold text-cyan-600"
                                aria-label={`Price: ${priceAmount}`}
                            >
                                {priceAmount}
                            </p>
                        </div>

                        <div className="mt-6">
                            <label id="quantity-label" className="block text-sm font-medium text-gray-100 mb-2">
                                Quantity
                            </label>
                            <div 
                                className="flex items-center gap-4"
                                aria-labelledby="quantity-label"
                            >
                                <button 
                                    onClick={handleRemoveItem}
                                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 
                                             text-gray-700 text-xl font-bold transition-colors duration-200
                                             focus:outline-none focus:ring-2 focus:ring-cyan-300
                                             disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label={`Decrease quantity of ${product.name}`}
                                    disabled={quantity === 0}
                                > 
                                    −
                                </button>
                                <span 
                                    ref={quantityRef}
                                    className="text-2xl font-semibold min-w-12 text-center"
                                    aria-live="polite"
                                    aria-atomic="true"
                                    tabIndex={0}
                                    role="status"
                                >
                                    {quantity}
                                </span>
                                <button 
                                    ref={addButtonRef}
                                    onClick={handleAddItem}
                                    className="w-10 h-10 rounded-full bg-cyan-300 hover:bg-cyan-600 
                                             text-white text-xl font-bold transition-colors duration-200
                                             focus:outline-none focus:ring-2 focus:ring-cyan-400
                                             disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label={`Increase quantity of ${product.name}`}
                                    disabled={isAdding}
                                > 
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button 
                                onClick={handleAddItem}
                                disabled={isAdding}
                                className="w-full py-3 px-6 bg-cyan-300 hover:bg-cyan-600 
                                         text-gray-50 text-shadow-md font-semibold rounded-xl transition-all duration-200
                                         focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={`Add ${product.name} to cart`}
                            >
                                {isAdding ? 'Adding...' : quantity > 0 ? 'Add More to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <div id="cart-live-region" className="sr-only" aria-live="polite" aria-atomic="true"></div>
        </>
    )
}