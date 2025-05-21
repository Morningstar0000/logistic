import { CheckCircle } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="align-element py-15 " id="about">
      {/* Main Content */}
      <div className=" flex flex-col gap-6 md:flex-row w-full">
        {/* Left side - Image */}
        <div className="max-w-md md:w-1/2 mt-6 md:mt-9 h-72 md:h-96 relative bg-blue-500">
          <img
            src="About.jpg"
            alt="Logistics worker with tablet"
            className="w-full h-full object-cover"
          />
            {/* 20 Years of Experience Blue Box - Responsive positioning */}
            <div className="hidden md:block absolute md:bottom-50 md:-right-30 lg:bottom-49 lg:-right-40 bg-blue-600 text-white py-1 md:py-4 px-3 md:px-4 transform rotate-90 origin-bottom-left">
            <span className="text-xs font-semibold tracking-wider whitespace-nowrap">20 YEARS OF EXPERIENCE</span>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col relative ">
          <div className="text-blue-600 text-sm font-semibold mb-4">ABOUT US</div>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Modern And Trusted Logistics Company
          </h1>

          <p className="text-gray-600 mb-6 md:mb-8 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at facilisis diam, tempus accumsan elit.
            Suspendisse non hendrerit in, vulputate lacus facilisis eu in consequatur. Vitae in duis consectetur
            adipiscing elit. Proin eget sapien dui.
          </p>

          <div className="space-y-3 md:space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-blue-600 h-5 w-5 flex-shrink-0" />
              <span className="text-sm">24/7 Reliable Support</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-blue-600 h-5 w-5 flex-shrink-0" />
              <span className="text-sm">Secure Transportation</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-blue-600 h-5 w-5 flex-shrink-0" />
              <span className="text-sm">World-Wide Rated Shipping Business</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-blue-600 h-5 w-5 flex-shrink-0" />
              <span className="text-sm">Easy And Quick Breakbulk Analysis</span>
            </div>
          </div>

        

          {/* Mobile version of experience box */}
          <div className="md:hidden bg-blue-600 text-white py-3 px-4 mb-6 w-fit">
            <span className="text-xs font-semibold tracking-wider">20 YEARS OF EXPERIENCE</span>
          </div>

          <a
            href="#"
            className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium w-fit hover:bg-blue-700 transition-colors"
          >
            About Us
          </a>
        </div>
      </div>
    </div>
  )
}
