import Image from "next/image"
import heroBG from "../../public/macaron-stacks.jpg"
import Carousel from "@/components/carousel";
import fs from 'fs';
import path from 'path';
import { 
  metadata, 
  viewport,
  flavors, 
  testimonials, 
  faqs, 
  benefits,
  heroHeading1,
  heroHeading2,
  heroImageAlt,
  headerTitle,
  headerSubtitle,
  mainTitle,
  introParagraph,
  whyChooseTitle,
  whyChooseParagraph,
  collectionsTitle,
  collectionsParagraph,
  servingTitle,
  servingParagraph,
  artTitle,
  artParagraph,
  ctaTitle,
  ctaParagraph1,
  ctaParagraph2,
  flavorsSectionTitle,
  testimonialsTitle,
  faqTitle,
  bakerySchema,
  serviceSchema
} from "@/content/home"
import Link from "next/link";

export { metadata, viewport }

export default function Home() {
  const productsDir = path.join(process.cwd(), 'public/products');
  
  let images: string[] = [];
  try {
    const files = fs.readdirSync(productsDir);
    images = files
      .filter((file) => file.endsWith('.jpg'))
      .map((file) => `/products/${file}`);
  } catch (error) {
    console.error('Error reading products directory:', error);
  }

  return (
    <main 
      id="home"
      className="w-full min-h-screen py-12 flex flex-col items-center justify-center gap-8 md:gap-12"
    >
      <h1 className="sr-only">{heroHeading1}</h1>
      <h2 className="sr-only">{heroHeading2}</h2>

      <div 
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
          src={heroBG}
          alt={heroImageAlt}
          fill
          className="object-cover opacity-25"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* HEADER */}
      <div className="w-[115vw]">
        <header className="text-center">
          <h1 className="font-haviland-cursive text-cyan-50 text-8xl md:text-9xl text-shadow-lg text-shadow-cyan-500/50">
            {headerTitle}
          </h1>
          <div className="w-full h-80 md:w-xl my-10 mx-auto rounded-2xl shadow-lg shadow-gray-50/50">
            <Link
              href="/products"
            >
              <Carousel images={images} />
            </Link>  
          </div>
          <p className="text-gray-200 text-shadow-md text-shadow-gray-50/50 font-haviland-cursive text-4xl md:text-6xl xl:text-8xl">
            {headerSubtitle}
          </p>
        </header>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center w-full gap-8 md:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 mt-16 md:mt-48">
        <h2 className="text-3xl md:text-4xl text-shadow-lg text-shadow-gray-800/20 text-center font-light fade-on-scroll text-transparent bg-clip-text bg-linear-to-br from-fuchsia-300 via-orange-200 to-green-200">
          {mainTitle}
        </h2>
        
        <div className="text-gray-300 text-base p-4 max-w-6xl mx-auto bg-linear-to-br from-orange-300/20 via-purple-400/20 to-yellow-200/20 backdrop-blur-md rounded-2xl">
          <p className="text-shadow-lg mb-6 md:mb-12">{introParagraph}</p>

          <div className="mb-6 md:mb-12 fade-on-scroll space-y-3">
            <h3 className="text-2xl md:text-3xl mb-2 md:mb-4 font-extralight text-fuchsia-200 text-shadow-lg text-shadow-gray-800/50">
              {whyChooseTitle}
            </h3>
            <p className="text-shadow-lg mb-2 md:mb-4">{whyChooseParagraph}</p>

            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-4 text-transparent bg-clip-text bg-linear-to-br from-yellow-200 via-green-200 to-violet-100">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="text-shadow-lg text-sm">✓ {benefit}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6 md:mb-12 fade-on-scroll space-y-3">
            <h3 className="text-xl md:text-2xl font-light text-shadow-lg text-violet-300">
              {collectionsTitle}
            </h3>
            <p className="text-shadow-lg">{collectionsParagraph}</p>
          </div>

          <div className="mb-6 md:mb-12 fade-on-scroll space-y-3">
            <h3 className="text-2xl md:text-3xl font-light text-orange-200 text-shadow-lg mt-6">
              {servingTitle}
            </h3>
            <p className="text-shadow-lg">{servingParagraph}</p>

            <h3 className="text-2xl md:text-3xl font-light text-green-200 text-shadow-lg mt-6">{artTitle}</h3>
            <p className="text-shadow-lg">{artParagraph}</p>
          </div>

          <div className="mb-6 md:mb-12 fade-on-scroll space-y-3">
            <h3 className="text-2xl md:text-3xl text-shadow-lg font-light text-cyan-200">
              {ctaTitle}
            </h3>
            <div className="space-y-6 mt-6">
              <p className="text-shadow-lg">{ctaParagraph1}</p>
              <p className="text-shadow-lg">{ctaParagraph2}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto my-6 md:my-12 px-4 fade-on-scroll space-y-6 md:space-y-12">
        <h2 className="text-3xl md:text-4xl text-shadow-lg text-shadow-gray-800/20 text-center font-light text-transparent bg-clip-text bg-linear-to-br from-emerald-200 via-indigo-200 to-yellow-100">
          {testimonialsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="p-4 bg-linear-to-br from-orange-300/20 via-purple-400/20 to-yellow-200/20 backdrop-blur-2xl rounded-2xl shadow-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-base sm:text-lg text-shadow-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 text-shadow-md italic text-sm sm:text-base mb-3">"{testimonial.text}"</p>
              <p className="font-extralight text-cyan-200 text-shadow-md text-sm sm:text-base">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="p-4 max-w-6xl mx-auto bg-linear-to-br from-orange-300/20 via-purple-400/20 to-yellow-200/20 backdrop-blur-md rounded-2xl">
        <h2 className="text-3xl md:text-4xl text-shadow-lg text-shadow-gray-800/20 text-center font-light text-transparent bg-clip-text bg-linear-to-br from-lime-300 via-indigo-200 to-cyan-300">
          {faqTitle}
        </h2>
        <div className="space-y-6 md:space-y-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200/50 pb-4">
              <h4 className="text-lg font-light text-emerald-200 text-shadow-lg mb-2">{faq.question}</h4>
              <p className="text-gray-100 text-shadow-lg text-sm md:text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bakerySchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </main>
  )
}