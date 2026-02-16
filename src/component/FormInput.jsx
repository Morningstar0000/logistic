

export function TrackAndTrace() {
    return (
        <>
            {/* Form content */}
            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="tel"
                            placeholder="Your Phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Shipment Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="relative">
                            <select defaultValue="Type of Flight" className="select select-ghost w-full py-2">
                            <option disabled={true}>Type of Flight</option>
                                <option >Type of flight One</option>
                                <option>Type of flight Two</option>
                                <option>Type of flight Three</option>
                                <option>Type of flight Four</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="City of Departure"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Which City"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                        <div className="relative">
                            <select defaultValue="Incomers One" className="select select-ghost w-full py-2">
                                <option>Incomers One</option>
                                <option>Incomers Two</option>
                                <option>Incomers Three</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Width"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Height"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="weight"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Length"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-wrap gap-6 mb-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="relative">
                                <input type="radio" name="shipping" className="radio" defaultChecked />
                            </div>
                            <span>Express Delivery</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="relative">
                                <input type="radio" name="shipping" className=" radio" defaultChecked />
                            </div>
                            <span>Ocean Freight</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="relative">
                                <input type="radio" name="shipping" className=" radio" />
                            </div>
                            <span>Road Freight</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="relative">
                                <input type="radio" name="shipping" className="radio" />
                            </div>
                            <span>Air Freight</span>
                        </label>
                    </div>
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition-colors">
                    Request A Quote
                </button>
            </div>
        </>
    )
}

export function RequestAquote() {
    return (
        <>  <div className="p-6">
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Track Your Shipment</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="relative">
                        <select defaultValue="Shipment Type" className="select select-ghost w-full py-2">
                        <option disabled={true}>Shipment Type</option>
                            <option>Express Delivery</option>
                            <option>Ocean Freight</option>
                            <option>Road Freight</option>
                            <option>Air Freight</option>
                        </select>

                    </div>
                    <textarea
                        placeholder="Tracking Numbers (one per line)"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                    ></textarea>
                </div>
            </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition-colors">
                Track Shipment
            </button>
        </>
    )
}