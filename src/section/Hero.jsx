import { useState, useEffect, useRef } from "react";
import { Play, X } from "lucide-react";
import { Button } from "../component/button";
import { Dialog, DialogContent, DialogClose } from "../component/dialog";
import Navbar from "../component/Navbar";

function Hero() {
    const [videoOpen, setVideoOpen] = useState(false);
    const [transformY, setTransformY] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const section = sectionRef.current;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;

                // Calculate when the section enters the viewport
                const sectionStart = sectionTop - windowHeight;
                const sectionEnd = sectionTop + sectionHeight;

                // Only apply parallax when section is in view
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
            <main className="">
                {/* Hero Section with proper containment */}
                <div 
                    ref={sectionRef}
                    className="align-element relative min-h-screen overflow-hidden"
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
                        {/* Modern image loading with multiple formats */}
                        <picture>
                            {/* First try AVIF format (best compression) */}
                            <source 
                                srcSet="/Logistic.avif" 
                                type="image/avif" 
                            />
                            {/* Fallback to WebP */}
                            <source 
                                srcSet="/Logistic.webp" 
                                type="image/webp" 
                            />
                            {/* Final fallback to PNG */}
                            <img
                                src="/Logistic.png"
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

                    {/* Content overlay - now properly contained */}
                    <div className="relative z-10 container mx-auto py-16 md:py-24 h-full flex items-center">
                        <div className="max-w-2xl">
                            <p className="text-blue-500 font-medium mb-4">WELCOME TO EZIO</p>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Get The Best Transport And Logistics Support
                            </h1>
                            <p className="text-lg text-gray-700 mb-8">
                                Join the millions getting bargain deals on shipping cars, furniture, freight, and more
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg h-auto">
                                    Get A Free Quote
                                </Button>
                                <Button variant="outline" className="border-gray-100 bg-opacity-5 text-white px-8 py-4 text-lg h-auto">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Play button */}
                    <div className="absolute bottom-1/2 right-10 md:right-20 transform translate-y-1/2 z-20">
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-full bg-blue-500/20 animate-pulse"></div>
                            <div className="absolute -inset-8 rounded-full bg-blue-500/10 animate-pulse"></div>
                            <button
                                onClick={() => setVideoOpen(true)}
                                className="relative bg-white rounded-full p-4 shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <Play className="h-8 w-8 text-blue-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Video Modal */}
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogContent className="sm:max-w-4xl p-0 bg-black overflow-hidden">
                    <div className="relative pt-[56.25%] w-full">
                        <video
                            className="absolute top-0 left-0 w-full h-full"
                            controls
                            autoPlay
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            preload="metadata" // Optimized video loading
                            playsInline // Better mobile behavior
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <DialogClose className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Hero;