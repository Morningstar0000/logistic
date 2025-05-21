import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "./button"

export default function Navbar() {
  return (
    <>
      {/* Top blue bar with contact info (non-sticky) */}
      <div className=" align-element bg-blue-500 text-white">
        <div className="mx-auto px-4 flex flex-col md:flex-row justify-between items-center py-2">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 items-center md:items-start">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">9170 Millbrook Rd, Newark, IL 60541</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">+1 (123) 456 7890</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-sm">hello@ezio.com</span>
            </div>
          </div>
            <div className="flex">
              <div className="rounded w-10 h-auto mr-2">
              <img src="USA.png" alt="USA Flag"  className="" />
              </div>
              <span className="text-sm font-medium">USA</span>
            </div>
        </div>
      </div>

      {/* Sticky navigation bar - separated from the flex container */}
      <div className="align-element sticky top-0 z-50 bg-white shadow-md">
        <div className="navbar py-4">
          <div className="navbar-start">
          {/* Mobile dropdown (visible only on mobile) */}
<div className="dropdown md:hidden">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  </div>
  <ul 
    tabIndex={0} 
    className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow-lg rounded-box w-100"
    style={{
      backgroundColor: 'rgba(230, 228, 228, 0.95)', // 95% opaque white
      backdropFilter: 'blur(8px)', // Adds frosted glass effect
      border: '1px solid rgba(0, 0, 0, 0.1)', // subtle border
      opacity: 0.9,
      fontWeight: "bold"
    }}
  >
    <li><a href="#"  className="text-gray-700 hover:bg-gray-100/50">Home</a></li>
    <li><a href="#about"  className="text-gray-700 hover:bg-gray-100/50">About</a></li>
    <li><a href="#service" className="text-gray-700 hover:bg-gray-100/50">Services</a></li>
    <li><a href="#pricing" className="text-gray-700 hover:bg-gray-100/50">Pricing</a></li>
    <li><a href="#blog" className="text-gray-700 hover:bg-gray-100/50">Blog</a></li>
    <li><a className="text-gray-700 hover:bg-gray-100/50">Contact Us</a></li>
  </ul>
</div>
            
            {/* Logo */}
            <a href="/" className="flex items-center ml-4 md:ml-0">
              <div className="text-blue-500 font-bold text-3xl flex items-center">
                <span className="text-blue-500 mr-2">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 30L30 10M10 10L30 30" stroke="#1E88E5" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
                <span>Ezio</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation (hidden on mobile) */}
          <nav className="navbar-center hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center text-blue-500 font-medium">
              Home
            </a>
            <a href="#about" className="flex items-center text-gray-700 font-medium">
              About
            </a>
            <a href="#service" className="flex items-center text-gray-700 font-medium">
              Services
            </a>
            <a href="#pricing" className="text-gray-700 font-medium">
             Pricing
            </a>
            <a href="#blog" className="flex items-center text-gray-700 font-medium">
              Blog
            </a>
            <a href="#contact" className="text-gray-700 font-medium">
              Contact Us
            </a>
          </nav>

          {/* Desktop Get A Quote Button (hidden on mobile) */}
          <div className="navbar-end">
            <Button className="hidden md:flex bg-blue-500 hover:bg-blue-600 text-white px-6">
              Get A Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}