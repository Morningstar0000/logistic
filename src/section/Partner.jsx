import Marquee from "react-fast-marquee"
import { logos } from "../data/partner"

export default function LogisticsPartners() {
  return (
    <div className="w-full py-16 bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Added a subtle section label */}
        <p className="text-center text-slate-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-12">
          Global Strategic Network & Carrier Partners
        </p>

        <Marquee speed={50} gradient={true} gradientColor="white" gradientWidth={100} pauseOnHover={true}>
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 mx-16 group cursor-pointer transition-all duration-500"
            >
              {/* Logo Container */}
              <div className="relative w-12 h-12 flex items-center justify-center filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <img 
                  src={logo.imageUrl} 
                  alt={logo.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <p className="font-black text-slate-800 text-sm tracking-tighter leading-tight group-hover:text-blue-600 transition-colors uppercase">
                  {logo.name}
                </p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                  {logo.tagline}
                </p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}