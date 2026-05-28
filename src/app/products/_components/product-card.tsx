import Link from "next/link"
import { Product } from "../_data/product-service"
import Image from "next/image"

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const priceAmount = product.price ? 
                        `$${product.price.toFixed(2)}` : 
                        'Price not available'

    // Static class names to prevent hydration mismatches
    const cardClasses = "h-full flex flex-col rounded-2xl overflow-hidden bg-linear-to-br from-gray-100/75 to-gray-300/75 backdrop-blur-xl transition-all duration-300 hover:shadow-xl"
    const contentClasses = "bg-transparent backdrop-blur-2xl border rounded-xl p-3 sm:p-4 flex-1 flex flex-col justify-between font-body text-black"
    const buttonClasses = "inline-block w-full py-2 px-4 bg-black/40 rounded-xl cursor-pointer text-gray-50 text-sm sm:text-md font-body font-light text-center group-hover:bg-cyan-600/40 transition-all duration-300"

    return (
        <article className="h-full group">
            <Link 
                href={`/products/${product.id}`} 
                className="block h-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-2xl"
                aria-labelledby={`product-${product.id}-title product-${product.id}-price`}
                aria-describedby={`product-${product.id}-desc`}
            >
                <div className={cardClasses}>
                    {product.images && product.images[0] && (
                        <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden bg-gray-200">
                            <Image 
                                alt={product.name} 
                                src={product.images[0]} 
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    )}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col">
                        <h3 
                            id={`product-${product.id}-title`}
                            className="mb-2 text-xl md:text-2xl text-center text-shadow-lg font-light text-cyan-200 line-clamp-2"
                        >
                            {product.name}
                        </h3>
                        <div 
                            id={`product-${product.id}-desc`}
                            className={contentClasses}
                        >
                            <p className="text-sm sm:text-base line-clamp-3">
                                {product.description}
                            </p>
                            
                            {/* Flavor Notes */}
                            {product.flavorNotes && product.flavorNotes.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {product.flavorNotes.slice(0, 2).map((note, idx) => (
                                        <span key={idx} className="text-xs bg-cyan-100/50 px-2 py-0.5 rounded-full">
                                            {note}
                                        </span>
                                    ))}
                                </div>
                            )}
                            
                            <div className="mt-3 sm:mt-4 space-y-3">
                                <p 
                                    id={`product-${product.id}-price`}
                                    className="text-lg sm:text-xl text-gray-900 font-body font-semibold"
                                    aria-label={`Price: ${priceAmount}`}
                                >
                                    {priceAmount}
                                </p>
                                <span 
                                    className={buttonClasses}
                                    aria-hidden="true"
                                >
                                    View Details
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    )
}