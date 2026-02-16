import { useState, useEffect, useRef } from "react";
import { Play, X } from "lucide-react";
import { Button } from "../component/button";
import { Dialog, DialogContent, DialogClose } from "../component/dialog";
import Navbar from "../component/Navbar";
import { useTranslation } from 'react-i18next';

function Hero() {
    const [videoOpen, setVideoOpen] = useState(false);
    const [transformY, setTransformY] = useState(0);
    const sectionRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const section = sectionRef.current;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;

                const sectionStart = sectionTop - windowHeight;
                const sectionEnd = sectionTop + sectionHeight;

                if (scrollPosition > sectionStart && scrollPosition < sectionEnd) {
                    const progress = (scrollPosition - sectionStart) / (windowHeight + sectionHeight);
                    const maxMovement = sectionHeight * 0.3;
                    setTransformY(progress * maxMovement);
                } else if (scrollPosition <= sectionStart) {
                    setTransformY(0);
                } else if (scrollPosition >= sectionEnd) {
                    setTransformY(maxMovement);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <main className="w-full">
                {/* Hero Section - Fixed width */}
                <div
                    ref={sectionRef}
                    className="relative min-h-screen w-full overflow-hidden"
                >
                    {/* Optimized Background image with controlled parallax */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            transform: `translateY(${transformY}px)`,
                            willChange: 'transform',
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <picture>

                            <img
                                src="/hero-Img.jpg"
                                alt="Logistics transport"
                                className="object-cover w-full h-full"
                                loading="lazy"
                                decoding="async"
                                style={{
                                    height: '130%',
                                    marginTop: '-15%'
                                }}
                            />
                        </picture>
                    </div>

                    {/* Content container - Updated with proper width */}
                    {/* Content container - Updated with proper width */}
                    <div className="relative z-10 w-full h-full flex items-center">
                        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <div className="max-w-2xl">
                                <p className="text-white font-medium mb-4">
                                    {t('hero.welcome')}
                                </p>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    {t('hero.title')}
                                </h1>

                                <p className="text-lg text-white mb-8">
                                    {t('hero.subtitle')}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#quoteform">
                                        <Button
                                            variant="outline"
                                            className="border-gray-100 bg-white/5 text-white px-8 py-4 text-lg h-auto hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg shadow-black/20"
                                        >
                                            {t('hero.get_quote')}
                                        </Button>
                                    </a>

                                    {/* Optional: Add a secondary button */}
                                    <a href="#formrequest">
                                    <Button
                                        variant="outline"
                                        className="border-gray-100 bg-transparent text-white px-8 py-4 text-lg h-auto hover:bg-white/10 transition-all duration-300"
                                    >
                                        {t('hero.track_button')}
                                    </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </main>

        
        </>
    );
}

export default Hero;