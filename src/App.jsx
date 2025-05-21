import React from 'react'
import './App.css'
import Hero from './section/Hero'
import Navbar from './component/Navbar'
import AboutUs from './section/About'
import {AchievementSection, Ourservice, WhyChooseUs} from './section/Service'
import ShippingForm from './section/FormRequest'
import PricingComparison from './section/Pricing'
import ShippingHero from './section/ShippingHero'
import Testimonial from './section/Testimonial'
import Blog from './section/Blog'
import Footer from './section/Footer'
import LogisticsPartners from './section/Partner'

function App() {
 
  return (
    <>
    <Navbar/>
    <Hero/>
    <AboutUs/>
    <Ourservice/>
    <WhyChooseUs/>
    <AchievementSection/>
    <ShippingForm/>
    <PricingComparison/>
    <ShippingHero/>
    <Testimonial/>
    <LogisticsPartners/>
    <Blog/>
    <Footer/>
    </>
  )
}

export default App
