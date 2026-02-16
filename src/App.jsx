import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Hero from './section/Hero'
import Navbar from './component/Navbar'
import AboutUs from './section/About'
import { AchievementSection, Ourservice, WhyChooseUs } from './section/Service'
import PricingComparison from './section/Pricing'
import ShippingHero from './section/ShippingHero'
import Testimonial from './section/Testimonial'
import Blog from './section/Blog'
import Footer from './section/Footer'
import LogisticsPartners from './section/Partner'
import TrackingForm from './section/FormRequest'
import AdminPanel from './Admin/AdminPanel'
import TawkToChat from './component/TawkToChat' // REMOVE ChatWidget
import ChatWidget from './component/ChatWidget'
import SecurityProtocol from './section/SecurityProtocol'
import PricingQuote from './section/Pricing'
import FaqSection from './section/FaqSection'
import QuoteForm from './section/QuoteForm'
import ContactSection from './section/Contact'

// Main Landing Page Component
function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Ourservice />
      <WhyChooseUs />
      <SecurityProtocol/>
      <AchievementSection />
      <TrackingForm />
      <PricingQuote/>
      <QuoteForm/>
      <Testimonial />
      <LogisticsPartners />
      <ContactSection/>
      <FaqSection/>
      <Footer />
    </>
  )
}

// Admin Page Component (without main site layout)
function AdminPage() {
  return <AdminPanel />
}

function App() {
  return (
    <Router>
      {/* Only use ONE chat component */}
      <TawkToChat />
      
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin panel - separate route */}
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Optional: Tracking page only if you want it separate */}
        <Route path="/track" element={
          <>
            <Navbar />
            <TrackingForm />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App