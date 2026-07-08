"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CarouselProps {
    images: string[]
    interval?: number
}

export default function Carousel({ images, interval = 5000 }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const prefersReducedMotion = 
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    useEffect(() => {
        if (!prefersReducedMotion && images.length > 1) {
            timerRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length)
            }, interval)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [images.length, interval, prefersReducedMotion])

    if (!images || images.length === 0) {
        return <div className="w-full h-full bg-gray-400" aria-label="No images available" />
    }

    const getImagePath = (src: string) => {
        if (src.startsWith('http://') || src.startsWith('https://')) {
            return src;
        }
        
        if (src.startsWith('/ecommerce/') || src.startsWith('./')) {
            return src;
        }
        
        if (process.env.NODE_ENV === 'production') {
            return `/ecommerce/${src}`;
        }

        return `/${src}`
    }

    return (
        <div
            className="relative w-full h-full overflow-hidden rounded-2xl"
            role="region"
            aria-label="Image Carousel"
            aria-roledescription="carousel"
        >
            <div
                className="flex h-full"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: prefersReducedMotion ? 'none' : 'transform 500ms ease-in-out'
                }}
            >
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative w-full h-full shrink-0"
                        style={{ minHeight: '100%', minWidth: '100%' }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${index + 1} of ${images.length}`}
                        aria-hidden={index !== currentIndex}
                    >
                        <Image
                            src={src}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover rounded-2xl"
                            sizes="100vw"
                            priority={index === 0}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>

            <div className="sr-only" aria-live="polite" aria-atomic="true">
                Showing slide {currentIndex + 1} of {images.length}
            </div>
        </div>
    )
}