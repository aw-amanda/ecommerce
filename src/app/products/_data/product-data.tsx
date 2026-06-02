"use client"

import { Product } from "./product-service"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { ProductCard } from "../_components/product-card"

interface ProductDataProps {
    products: Product[]
    className?: string
}

const DEBOUNCE_DELAY = 300

export const ProductData = ({ products }: ProductDataProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("")
    const searchInputRef = useRef<HTMLInputElement>(null)
    const resultsRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, DEBOUNCE_DELAY)

        return () => clearTimeout(timer)
    }, [searchTerm])

    const filteredProducts = useMemo(() => {
        const term = debouncedSearchTerm.toLowerCase().trim()
        if (!term) return products

        return products.filter((product) => {
            const nameMatch = product.name.toLowerCase().includes(term)
            const descriptionMatch = product.description ? 
                product.description.toLowerCase().includes(term) : false
            const flavorMatch = product.flavorNotes?.some(note => 
                note.toLowerCase().includes(term)
            ) || false
            return nameMatch || descriptionMatch || flavorMatch
        })
    }, [products, debouncedSearchTerm])

    useEffect(() => {
        if (resultsRef.current) {
            resultsRef.current.textContent = `${filteredProducts.length} products found`
        }
    }, [filteredProducts.length])

    useEffect(() => {
        searchInputRef.current?.focus()
    }, [])

    const handleClearSearch = useCallback(() => {
        setSearchTerm("")
        searchInputRef.current?.focus()
    }, [])

    const showClearButton = searchTerm.length > 0

    return (
        <section 
            aria-labelledby="products-heading"
            className="flex flex-col items-center justify-center px-4 pb-12"
        >
            {/* Search */}
            <div className="w-full max-w-md mx-auto my-6 sm:my-8 md:my-10 px-4">
                <div className="relative">
                    <label 
                        htmlFor="product-search"
                        className="sr-only"
                    >
                        Search products by name or description
                    </label>
                    
                    <div className="absolute inset-y-0 left-0 pl-3 z-50 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input 
                        id="product-search"
                        ref={searchInputRef}
                        type="text" 
                        value={searchTerm}
                        aria-controls="products-list"
                        aria-describedby="search-results-count"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, description, or flavor notes..."
                        className="w-full py-2.5 pl-10 pr-10 rounded-2xl text-gray-900 placeholder-cyan-50 border border-gray-950
                                 bg-gray-800/25 backdrop-blur-2xl focus:bg-cyan-200/50 focus:outline-none transition-all duration-200"
                    />

                    {showClearButton && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label="Clear search"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <div 
                    id="search-results-count"
                    className="sr-only"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found {searchTerm && `for "${searchTerm}"`}
                </div>
            </div>

            <h2
                id="products-heading"
                ref={resultsRef}
                className="sr-only"
                tabIndex={-1}
            >
                Products
            </h2>

            <ul 
                id="products-list"
                className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            >
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <li 
                            key={product.id}
                            className="w-full"
                            aria-label={`Product ${index + 1} of ${filteredProducts.length}`}
                        >
                            <ProductCard product={product} />
                        </li>
                    ))
                ) : (
                    <li className="col-span-full text-center py-12 sm:py-16">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
                            <svg className="w-16 h-16 mx-auto text-cyan-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-cyan-400 text-xl md:text-2xl font-display mb-2">
                                No products found
                            </p>
                            <p className="text-gray-600">
                                We couldn't find any products matching "{searchTerm}". Try different keywords or browse all our products.
                            </p>
                            <button
                                onClick={handleClearSearch}
                                className="mt-4 px-6 py-2 bg-cyan-500/80 hover:bg-cyan-500 text-white rounded-xl transition-colors duration-200"
                            >
                                Clear Search
                            </button>
                        </div>
                    </li>
                )}
            </ul>

            {filteredProducts.length === 0 && searchTerm && (
                <div className="sr-only" aria-live="polite">
                    No search results found. Try different search terms.
                </div>
            )}
        </section>
    )
}