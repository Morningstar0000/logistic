"use client"

import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, MapPin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#050530] text-white py-12 ">
      {/* Top section with Buy Now button */}
      <div className="align-element">

        {/* Main footer content */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {/* Logo and description */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="text-[#0088FF] text-3xl font-bold flex items-center">
                <span className="text-[#0088FF] text-4xl mr-1">✕</span> Ezio
              </div>
            </div>
            <p className="text-gray-300 mt-4">
              Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua consec.
            </p>
            <div className="flex mt-6 space-x-2">
              <a
                href="#"
                className="w-8 h-8 border border-gray-600 flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-gray-600 flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-gray-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-gray-600 flex items-center justify-center hover:bg-blue-400 transition-colors"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {["Sea Freight", "Air Freight", "Road Freight", "Local Delivery", "Bus Freight", "Car Freight"].map(
                (service) => (
                  <li key={service} className="flex items-start">
                    <div className="min-w-4 h-4 bg-[#0088FF] mr-3 mt-1.5"></div>
                    <a href="#" className="hover:text-[#0088FF] transition-colors">
                      {service}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Team", "FAQ", "Blog", "Privacy Policy", "Terms And Conditions"].map((item) => (
                <li key={item} className="flex items-start">
                  <div className="min-w-4 h-4 bg-[#0088FF] mr-3 mt-1.5"></div>
                  <a href="#" className="hover:text-[#0088FF] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Address</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-[#0088FF] mr-3 h-5 w-5 flex-shrink-0 mt-1" />
                <span>9170 Millbrook Rd, Newark, IL 60541</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-[#0088FF] mr-3 h-5 w-5 flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span>hello@ezio.com</span>
                  <span>info@ezio.com</span>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="text-[#0088FF] mr-3 h-5 w-5 flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span>+1 (123) 456 7890</span>
                  <span>+1 (514) 312-6678</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p>
            © Ezio is Proudly Owned by{" "}
            <a href="#" className="text-[#0088FF]">
              Miracle Osaro.
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
