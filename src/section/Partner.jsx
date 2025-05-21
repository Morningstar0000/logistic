import Marquee from "react-fast-marquee"
import { logos } from "../data/partner"

export default function LogisticsPartners() {

  return (
    <div className="align-element py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Marquee speed={40} gradientWidth={0} pauseOnHover={true}>
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center space-x-2 text-[#3b5998] mx-12">
              <div className="relative w-10 h-10">{logo.icon}</div>
              <div>
                <p className="font-bold text-lg leading-tight">{logo.name}</p>
                <p className="text-xs leading-tight">{logo.tagline}</p>
              </div>
            </div>
          ))}
          {/* Duplicate the logos to ensure smooth looping */}
          {logos.map((logo, index) => (
            <div key={`duplicate-${index}`} className="flex items-center space-x-2 text-[#3b5998] mx-12">
              <div className="relative w-10 h-10">{logo.icon}</div>
              <div>
                <p className="font-bold text-lg leading-tight">{logo.name}</p>
                <p className="text-xs leading-tight">{logo.tagline}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
