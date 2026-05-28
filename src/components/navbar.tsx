"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "../../public/favicon.png";

type NavItemProps = {
    title: string;
    href: string;
}

const NavItems: NavItemProps[] = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Cart", href: "/cart" },
    { title: "Contact", href: "/contact" },
]

export const Navbar = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    // Pre-compute class names to avoid multiline template strings
    const navClass = "w-full fixed top-0 left-0 z-50 bg-gray-950/50 backdrop-blur-xl";
    const linkClass = "relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-body text-base group";
    const activeLinkClass = "relative text-cyan-400 font-semibold transition-colors duration-200 font-body text-base group";
    const buttonClass = "relative w-10 h-10 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400";
    const mobileMenuClass = `fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`;
    const overlayClass = "fixed inset-0 z-35 bg-black/50 md:hidden";

    return (
        <>
            <nav className={navClass} aria-label="Main navigation">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* LOGO */}
                        <div className="shrink-0">
                            <Link 
                                href="/"
                                className="block transition-transform hover:scale-105 duration-200"
                                aria-label="Go to homepage"
                            >
                                <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white rounded-full overflow-hidden shadow-md">
                                    <Image 
                                        src={Logo}
                                        alt="Macaroon Pâtisserie Logo"
                                        fill
                                        className="object-contain p-2"
                                        priority
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* DESKTOP NAVIGATION */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-8">
                                {NavItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={isActive ? activeLinkClass : linkClass}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.title}
                                            {isActive && (
                                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 rounded-full" />
                                            )}
                                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 rounded-full group-hover:w-full ${isActive ? "hidden" : ""}`} />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={buttonClass}
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
                className={mobileMenuClass}
                aria-hidden={!isMobileMenuOpen}
                style={{ top: "5rem" }}
            >
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] space-y-6 p-4">
                    {NavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-2xl font-body transition-all duration-200 hover:text-cyan-400 hover:scale-105 ${isActive ? "text-cyan-400 font-semibold border-b-2 border-cyan-400" : "text-gray-300"}`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                    
                    {/* Mobile menu decorative elements */}
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                        <p className="text-gray-500 text-sm">
                            🍪 Artisanal French Macaroons
                        </p>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div 
                    className={overlayClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                    style={{ top: "5rem" }}
                />
            )}
        </>
    );
};