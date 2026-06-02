import { getProducts } from "./_data/product-service"
import { ProductData } from "./_data/product-data"
import Image from "next/image";
import productsBG from "../../../public/cool-blue.jpg"

// ===============
// METADATA
// ===============
export const metadata = {
  title: "Our Macaroon Flavors | Artisanal French Pastries | Macaroon Pâtisserie",
  description: "Explore our rotating selection of gourmet macaroon flavors. From classic vanilla and chocolate to seasonal specialties. Each macaroon handcrafted with premium ingredients.",
  keywords: "macaroon flavors, french macarons, gourmet macaroons, artisanal pastries, macaroon varieties, seasonal macaroons",
  openGraph: {
    title: "Our Macaroon Flavors | Macaroon Pâtisserie | Your City",
    description: "Discover our exquisite collection of handcrafted macaroon flavors. Made fresh daily in Your City.",
    images: [{ url: "/cool-blue.jpg" }],
    type: "website",
  },
  alternates: {
    canonical: "/products",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function ProductsPage() {
    const products = await getProducts()

    return(
        <main className="relative items-center justify-center w-full min-h-screen pt-32">
            <div 
                className="fixed inset-0 -z-10"
                aria-hidden="true"
            >
                <Image
                    src={productsBG}
                    alt=""
                    fill
                    className="object-cover opacity-75"
                    priority={false}
                    sizes="100vw"
                    quality={85}
                />
            </div>

            <h1 className="sr-only">Macaroon Pâtisserie Products</h1>

            <div className="text-center mb-6">
                <h2 
                    id="main-products-heading"
                    className="text-cyan-200 text-shadow-lg text-7xl md:text-9xl my-6 sm:my-8 font-haviland-cursive"
                    tabIndex={-1}
                >
                    Our Macaroons
                </h2>
            </div>

            <div className="max-w-3xl mx-auto text-center mb-8 p-4 bg-transparent backdrop-blur-3xl rounded-2xl">
                <p className="text-cyan-50 text-md md:text-lg">
                    Each week, our pastry team creates thousands of perfect French macaroons in our Your City kitchen. 
                    Every macaroon starts with premium almond flour, organic egg whites, and real butter—never artificial 
                    flavors or preservatives. Browse our current flavor collection below. Note that seasonal specialties 
                    rotate throughout the year, so check back often for new discoveries!
                </p>
            </div>

            <div 
                aria-live="polite" 
                className="sr-only"
            >
                Products loaded successfully. {products.length} products available.
            </div>

            <ProductData 
                products={products}
                aria-labelledby="main-products-heading" 
            />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Macaroon Pâtisserie Products",
                        "description": "Explore our rotating selection of gourmet macaroon flavors. From classic vanilla and chocolate to seasonal specialties.",
                        "numberOfItems": products.length,
                        "itemListElement": products.slice(0, 10).map((product, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "item": {
                                "@type": "Product",
                                "name": product.name,
                                "description": product.description,
                                "image": product.images?.[0],
                                "offers": product.price ? {
                                    "@type": "Offer",
                                    "price": product.price,
                                    "priceCurrency": "USD",
                                    "availability": "https://schema.org/InStock"
                                } : undefined
                            }
                        })).filter(item => item.item.offers)
                    })
                }}
            />

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Are your macaroons gluten-free?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! Traditional French macarons are naturally gluten-free since they're made with almond flour instead of wheat flour."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do you offer vegan macaroons?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We offer a rotating selection of vegan macaroons made without eggs or dairy. Call ahead or check our online menu to see our current vegan options."
                                }
                            }
                        ]
                    })
                }}
            />
        </main>
    )
}