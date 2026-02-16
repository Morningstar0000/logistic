import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "./button"
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t } = useTranslation()

  return (
    <>
      {/* Top blue bar with contact info (non-sticky) */}
      <div className="w-full bg-blue-500 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row md:space-x-6 lg:space-x-8 space-y-2 md:space-y-0 items-center md:items-start mb-2 md:mb-0">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-xs md:text-sm">{t('navbar.address')}</span>
              </div>
             
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-xs md:text-sm">{t('navbar.email')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky navigation bar */}
      <div className="w-full sticky top-0 z-50 bg-white shadow-md">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Mobile dropdown (visible only on mobile) */}
              <div className="dropdown md:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <ul 
                  tabIndex={0} 
                  className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow-lg rounded-box w-64"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <li><a href="#" className="text-gray-700 hover:bg-gray-100/50 hover:text-blue-600">{t('navbar.home')}</a></li>
                  <li><a href="#about" className="text-gray-700 hover:bg-gray-100/50 hover:text-blue-600">{t('navbar.about')}</a></li>
                  <li><a href="#service" className="text-gray-700 hover:bg-gray-100/50 hover:text-blue-600">{t('navbar.services')}</a></li>
                  <li><a href="#formrequest" className="text-gray-700 hover:bg-gray-100/50 hover:text-blue-600">{t('navbar.track')}</a></li>
                  <li><a href="#contact" className="text-gray-700 hover:bg-gray-100/50 hover:text-blue-600">{t('navbar.contact')}</a></li>
                  {/* <li><a href="/admin" className="text-gray-700 hover:bg-gray-100/50 hover:text-blue-600">{t('navbar.admin')}</a></li> */}
                </ul>
              </div>
              
              {/* Logo */}
              <a href="/" className="flex items-center">
                <div className="flex items-center space-x-2">
                  <img src="./logo shipping.png" alt="logo" width={110}height={100}/>
                </div>
              </a>
            </div>

            {/* Desktop Navigation (hidden on mobile) */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {t('navbar.home')}
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {t('navbar.about')}
              </a>
              <a href="#service" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {t('navbar.services')}
              </a>
               
                <a href="#formrequest" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {t('navbar.track')}
              </a>

              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {t('navbar.contact')}
              </a>
             
            </nav>

            {/* Desktop Get A Quote Button (hidden on mobile) */}
            {/* <div className="hidden md:block">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 transition-all hover:shadow-lg">
                {t('navbar.get_quote')}
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}