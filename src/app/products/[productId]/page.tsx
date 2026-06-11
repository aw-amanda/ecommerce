import { getProductById, getProducts } from "../_data/product-service"
import { ProductDetail } from "../_components/product-details"
import { notFound } from "next/navigation"
import Image from "next/image"
import productsBG from "../../../../public/cool-blue.jpg"

interface PageProps {
  params: Promise<{ productId: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { productId } = await params
  
  const product = await getProductById(productId)
  
  if (!product) {
    return {
      title: "Product Not Found | Macaron Pâtisserie",
      description: "The requested product could not be found.",
    }
  }
  
  const priceAmount = product.price ? `$${product.price.toFixed(2)}` : ''
  
  return {
    title: `${product.name} | Macaron Pâtisserie`,
    description: product.description || `Shop ${product.name} at Macaron Pâtisserie. Artisanal French macaroons made fresh daily.`,
    openGraph: {
      title: `${product.name} | Macaron Pâtisserie`,
      description: product.description || `Shop ${product.name} at Macaron Pâtisserie.`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { productId } = await params
  
  const product = await getProductById(productId)

  if (!product) {
    notFound()
  }
  
  return (
    <main className="relative min-h-screen pt-32 pb-12">
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
      
      <ProductDetail product={product} />
      
      {product.price && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "description": product.description,
              "image": product.images?.[0],
              "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `https://domain.com/products/${product.id}`
              },
              "brand": {
                "@type": "Brand",
                "name": "Macaron Pâtisserie"
              },
              "category": product.category
            })
          }}
        />
      )}
    </main>
  )
}

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    productId: product.id,
  }))
}