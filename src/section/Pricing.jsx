import { Check, X } from "lucide-react"
import { pricingPlans } from "../data/pricingdata"

export default function PricingComparison() {

    // Feature item component
    const FeatureItem = ({ text, included }) => (
        <li className="flex items-start">
            <div
                className={`flex-shrink-0 w-6 h-6 rounded-full border ${included ? "border-[#0088ff]" : "border-red-500"} flex items-center justify-center mr-2`}
            >
                {included ? <Check className="h-4 w-4 text-[#0088ff]" /> : <X className="h-4 w-4 text-red-500" />}
            </div>
            <span className="text-gray-700">{text}</span>
        </li>
    )

    // Ribbon component
    const Ribbon = ({ text }) => (
        <div className="absolute right-0 top-0 -mt-1  rotate-90">
          <div className="ribbon bg-[#0088ff] text-white font-semibold py-2 px-4  flex flex-col items-center">
            <div className="rotate-280 ">
                <span>{text}</span>
            </div>
          </div>
        </div>
      );

    return (
        <section className="align-element py-15">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                <h2 className="text-[#007bff] font-medium text-base sm:text-lg uppercase tracking-wide text-center mb-3 sm:mb-4">
                    OUR PRICING
                </h2>
                <h1 className="text-[#000033] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-6 sm:mb-8 max-w-4xl mx-auto">
                    Our Pricing Plan And All Other Details At A Glance
                </h1>
                <p className="text-[#666666] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-center">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit porro, aliquid reprehenderit iusto inventore
                    sint beatae ipsum impedit in sit numquam illum distinctio sequi quisquam et hic tempore
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {pricingPlans.map((plan) => (
    <div 
      key={plan.id} 
      className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 
                transition-all duration-600 ease-in-out 
                hover:shadow-xl hover:-translate-y-1 hover:border-blue-100"
    >
      <Ribbon text={plan.ribbon} />
      {plan.showBuyNow && <BuyNowButton />}

      <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
      <div className="flex items-baseline mb-6">
        <span className="text-6xl font-bold text-[#0088ff]">${plan.price}</span>
        <span className="text-xl ml-2 text-[#0088ff]">Monthly</span>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <FeatureItem key={index} text={feature.text} included={feature.included} />
        ))}
      </ul>

      <button className="w-full bg-[#0088ff] hover:bg-[#0077ee] text-white py-3 rounded-md text-lg font-medium">
        Start This Plan
      </button>
    </div>
  ))}
</div>
        </section>
    )
}
