import { useState, useEffect, useRef } from "react";
import { ArrowUp, Leaf } from "lucide-react";

const ShippingHero = () => {
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
          // Calculate progress through the section (0 to 1)
          const progress = (scrollPosition - sectionStart) / (windowHeight + sectionHeight);
          // Limit the parallax movement to prevent going too far
          const maxMovement = sectionHeight * 0.3;
          setTransformY(progress * maxMovement);
        } else if (scrollPosition <= sectionStart) {
          setTransformY(0); // Reset when above section
        } else if (scrollPosition >= sectionEnd) {
          setTransformY(maxMovement); // Stop at max when past section
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="align-element relative min-h-screen overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            transform: `translateY(${transformY}px)`,
            willChange: "transform",
            transition: "transform 0.1s ease-out"
          }}
        >
           <picture>
          <source 
            srcSet="/shipping.avif" 
            type="image/avif" 
          />
          <source 
            srcSet="/shipping.webp" 
            type="image/webp" 
          />
           <img
            src="shipping.jpg"
            alt="Shipping containers background"
            className="h-full w-full object-cover"
            style={{
              height: "130%",
              marginTop: "-8%"
            }}
          />
        </picture>
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-20" id="contact">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-400 font-medium tracking-wide mb-4">SHIPMENT</p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Are You A Shipper? Please Knock Us On The Below Button
          </h1>

          <p className="text-white/90 text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iste facere, unde nesciunt ratione amet
            voluptatibus aut, iure magnam accusantium consequatur voluptatum nam ipsum in soluta consectetur temporibus
            nobis itaque!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 md:px-8 md:py-2 text-base md:text-lg transition-colors">
              Make A Shipment
            </button>
            <button className="border-2 border-blue-400 text-blue-400 hover:border-blue-300 hover:text-blue-300 px-6 py-3 md:px-8 md:py-2 text-base md:text-lg transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingHero;