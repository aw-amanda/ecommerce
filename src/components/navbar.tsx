"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Logo from "../../public/favicon.png"

type NavItemProps = {
    title: string
    href: string
}

const NavItems: NavItemProps[] = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Cart", href: "/cart" },
    { title: "Contact", href: "/contact" },
]

export const Navbar = () => {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMobileMenuOpen])

        const isLinkActive = (href: string) => {
        if (href === "/") {
            return pathname === "/"
        }
        return pathname === href || pathname?.startsWith(`${href}/`)
    }

    return (
        <>
            <nav 
                className="w-full fixed top-0 left-0 z-50 bg-gray-950/70 backdrop-blur-xl"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-8">
                    <div className="flex items-center justify-between h-20">
                        {/* LOGO */}
                        <div className="shrink-0">
                            <Link 
                                href="/"
                                className="block transition-transform hover:scale-105 duration-200"
                                aria-label="Go to homepage"
                            >
                                <div className="relative w-12 h-12 md:w-14 md:h-14 bg-transparent rounded-full overflow-hidden shadow-md">
                                    <Image 
                                        src={Logo} 
                                        alt="Macaron Pâtisserie Logo" 
                                        fill 
                                        className="object-contain" 
                                        priority sizes="56px" 
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* DESKTOP NAVIGATION */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-8">
                                {NavItems.map((item) => {
                                    const isActive = isLinkActive(item.href)
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`${isActive ? "relative text-cyan-400 font-medium text-base" : "relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-base font-light text-shadow-lg"}`}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.title}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <div className="md:hidden px-2">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="relative w-10 h-10 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {!isMobileMenuOpen ? (
                                        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBILE NAVIGATION MENU */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 z-40 bg-linear-to-br from-orange-900/90 via-cyan-900/90 to-purple-900/90 backdrop-blur-3xl transform transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                aria-hidden={!isMobileMenuOpen}
                style={{ top: "5rem" }}
            >
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] space-y-6 p-4">
                    {NavItems.map((item) => {
                        const isActive = isLinkActive(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-2xl transition-all duration-200 ${isActive ? "text-cyan-400" : "font-light text-gray-300"}`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {item.title}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-35 bg-black/50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                    style={{ top: "5rem" }}
                />
            )}
        </>
    )
}