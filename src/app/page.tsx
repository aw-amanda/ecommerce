import Image from "next/image";
import heroBG from "../../public/macaron-stacks.jpg";
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
} from "@/content/home";

export { metadata, viewport };

export default function Home() {
  return (
    <main 
      id="home"
      className="w-full min-h-screen pt-32 py-2 flex flex-col items-center justify-center"
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
          className="object-cover opacity-85"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* HEADER */}
      <div className="mb-20 p-2 md:p-6 bg-gray-300/30 backdrop-blur-lg border-none rounded-2xl shadow-2xl">
        <header className="flex flex-col items-center text-center p-4">
          <h2 className="mb-2 font-haviland-cursive text-cyan-200 text-7xl md:text-9xl text-shadow-lg">
            {headerTitle}
          </h2>
          <p className="text-gray-700 text-lg lg:text-xl">
            {headerSubtitle}
          </p>
        </header>
      </div>

      {/* CONTENT */}
      <div className="mb-20 flex flex-col items-center justify-center gap-5 max-w-4xl mx-auto p-2 md:p-6 bg-gray-300/30 backdrop-blur-3xl border-none rounded-2xl shadow-2xl">
        <div className="text-2xl md:text-3xl font-medium text-cyan-200 text-shadow-lg text-center">
          {mainTitle}
        </div>
        
        <div className="text-gray-900 text-md p-4 space-y-6">
          <p className="text-gray-900 text-shadow-md">{introParagraph}</p>

          <h3 className="text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg mt-6">{whyChooseTitle}</h3>
          <p className="text-gray-900 text-shadow-md">{whyChooseParagraph}</p>

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 mb-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="text-gray-900 text-shadow-md text-sm">✓ {benefit}</li>
            ))}
          </ul>

          <h3 className="text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg mt-6">{collectionsTitle}</h3>
          <p className="text-gray-900 text-shadow-md">{collectionsParagraph}</p>

          <h3 className="text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg mt-6">{servingTitle}</h3>
          <p className="text-gray-900 text-shadow-md">{servingParagraph}</p>

          <h3 className="text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg mt-6">{artTitle}</h3>
          <p className="text-gray-900 text-shadow-md">{artParagraph}</p>
        </div>
      </div>

      <div className="mb-20 w-full max-w-6xl mx-auto p-2 md:p-6 bg-gray-300/30 backdrop-blur-3xl border-none rounded-2xl shadow-2xl">
        <h3 className="text-3xl font-medium text-cyan-200 text-shadow-lg text-center mb-4">
          {ctaTitle}
        </h3>
        <p className="text-center text-gray-900 text-shadow-md">{ctaParagraph1}</p>
        <p className="text-center text-gray-900 text-shadow-md mb-4 md:mb-8">{ctaParagraph2}</p>
        
        <h3 className="mb-6 text-xl md:text-2xl font-light text-cyan-100 text-shadow-lg text-center">
          {flavorsSectionTitle}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {flavors.map((flavor, idx) => (
            <div key={idx} className="bg-cyan-100/30 rounded-lg p-2 text-center">
              <span className="text-gray-900 text-shadow-md text-sm">{flavor}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20 w-full max-w-6xl mx-auto p-2 md:p-6 bg-gray-300/30 backdrop-blur-3xl border-none rounded-2xl shadow-2xl">
        <h3 className="mb-6 text-3xl font-medium text-cyan-200 text-shadow-lg text-center">
          {testimonialsTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-cyan-200/40 rounded-xl p-5">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-800 text-shadow-md italic mb-3">"{testimonial.text}"</p>
              <p className="font-semibold text-cyan-200 text-shadow-md">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20 w-full max-w-4xl mx-auto p-2 md:p-6 bg-gray-300/30 backdrop-blur-3xl border-none rounded-2xl shadow-2xl">
        <h3 className="mb-6 text-3xl font-medium text-cyan-200 text-shadow-lg text-center">
          {faqTitle}
        </h3>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200/50 pb-4">
              <h4 className="text-xl font-medium text-cyan-100 text-shadow-lg mb-2">{faq.question}</h4>
              <p className="font-geist-sans text-gray-900 text-shadow-md">{faq.answer}</p>
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
  );
}