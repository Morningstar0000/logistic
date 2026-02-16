"use client"

import { Facebook, Instagram, Linkedin, Twitter, MapPin, Mail, Phone, ShieldCheck, ShieldAlert } from "lucide-react"
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  // Get services and company items from translations
  const services = t('footer.sections.services.items', { returnObjects: true });
  const company = t('footer.sections.company.items', { returnObjects: true });

  return (
    <footer className="bg-[#050530] text-white py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img src="/logo shipping.png" alt="Deep Blue Cargo" className="h-10 w-auto" />
                <span className="text-2xl font-black tracking-tighter uppercase italic">
                  {t('footer.brand.name_part1')}{' '}
                  <span className="text-orange-500 italic">{t('footer.brand.name_part2')}</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('footer.brand.description')}
              </p>
            </div>

          </div>

          {/* Core Services - Targeted */}
          <div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              {t('footer.sections.services.title')}
            </h3>
            <ul className="space-y-4">
              {Array.isArray(services) && services.map((service, index) => (
                <li key={index}>
                  <span className="text-slate-400 hover:text-orange-500 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500/30 rounded-full" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              {t('footer.sections.company.title')}
            </h3>
            <ul className="space-y-4">
              {Array.isArray(company) && company.map((item, index) => (
                <li key={index}>
                  <span className="text-slate-400 hover:text-orange-500 text-sm transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Global HQ Address */}
          <div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              {t('footer.sections.headquarters.title')}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-orange-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm leading-snug">
                  {t('footer.sections.headquarters.address_line1')}<br />
                  {t('footer.sections.headquarters.address_line2')}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="text-orange-500 shrink-0" size={20} />
                <div className="flex flex-col text-sm text-slate-400">
                  <a href={`mailto:${t('footer.sections.headquarters.email1')}`} className="hover:text-white">
                    {t('footer.sections.headquarters.email1')}
                  </a>
                  <a href={`mailto:${t('footer.sections.headquarters.email2')}`} className="hover:text-white">
                    {t('footer.sections.headquarters.email2')}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="text-orange-500 shrink-0" size={20} />
                <div className="flex flex-col text-sm text-slate-400">
                  <span>{t('footer.sections.headquarters.phone')}</span>
                  <span className="text-orange-500 font-bold">
                    {t('footer.sections.headquarters.support')}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Ownership */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
              {t('footer.legal.copyright', { year: new Date().getFullYear() })}
            </p>
            
            <a
              href="/admin"
              className="group flex items-center gap-1.5 text-slate-600 hover:text-white transition-colors"
              title={t('footer.legal.admin.tooltip')}
            >
              <ShieldAlert size={14} className="group-hover:scale-110 transition-transform" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                {t('footer.legal.admin.text')}
              </span>
            </a>
            
            <div className="flex items-center gap-6">
              <span className="hover:text-white transition-colors">
                {t('footer.legal.links.privacy')}
              </span>
              <span className="hover:text-white transition-colors">
                {t('footer.legal.links.terms')}
              </span>
              <span className="hover:text-white transition-colors">
                {t('footer.legal.links.incoterms')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}