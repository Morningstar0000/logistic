"use client"

import { useState, useEffect, useRef } from "react";
import { Truck, Search, Package, Calendar, MapPin, CheckCircle, Clock, Home } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useTranslation } from 'react-i18next';

export default function TrackingForm() {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState("");
  const [transformY, setTransformY] = useState(0);
  const sectionRef = useRef(null);

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      setError(t('tracking.error.empty'));
      return;
    }

    setIsLoading(true);
    setError("");
    setPackageData(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('shipments')
        .select(`
          *,
          tracking_events (
            id,
            status,
            location,
            description,
            timestamp
          )
        `)
        .eq('tracking_number', trackingNumber.trim())
        .single();

      if (supabaseError) {
        if (supabaseError.code === 'PGRST116') {
          setError(t('tracking.error.not_found'));
        } else {
          setError(t('tracking.error.fetch_error'));
        }
        console.error(supabaseError);
        return;
      }

      if (data) {
        setPackageData(data);
      }
    } catch (err) {
      setError(t('tracking.error.unexpected'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in_transit':
      case 'in transit':
        return 'text-blue-600 bg-blue-100';
      case 'out for delivery':
        return 'text-purple-600 bg-purple-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'in_transit':
      case 'in transit':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        );
      case 'out_for_delivery':
      case 'out for delivery':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString();
  };

  // ... keep the useEffect for scroll animation ...

  return (
    <div
      id="formrequest"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-50 z-0 overflow-hidden"
        style={{
          transform: `translateY(${transformY}px)`,
          willChange: "transform",
          transition: "transform 0.1s ease-out",
          height: "130%",
          top: "-15%"
        }}
      >
        <picture>
          <source srcSet="/formrequest.avif" type="image/avif" />
          <source srcSet="/formrequest.webp" type="image/webp" />
          <img
            src="/formrequest.jpg"
            alt="Form request background"
            className="object-cover w-full h-full"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0" style={{
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(15, 23, 42, 0.7)"
        }} />
      </div>

      {/* Form container */}
      <div className="bg-white rounded-lg shadow-xl w-full xl:mx-24 mx-7 xl:my-24 my-9 z-10 relative">
        <div className="flex border-b">
          <div className="flex items-center gap-2 py-4 px-6 font-medium text-blue-500 border-b-2 border-blue-500">
            <Truck className="h-5 w-5" />
            {t('tracking.tab_title')}
          </div>
        </div>

        {/* Content area */}
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {t('tracking.title')}
              </h3>
              <p className="text-gray-600">
                {t('tracking.description')}
              </p>
            </div>

            {/* Tracking Input Form */}
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="tracking-number" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tracking.input_label')}
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="tracking-number"
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder={t('tracking.input_placeholder')}
                        className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        disabled={isLoading}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors w-full sm:w-auto h-12"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t('tracking.tracking_loading')}
                        </>
                      ) : (
                        <>
                          <Search className="h-5 w-5" />
                          {t('tracking.track_button')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
                <p className="mt-3 text-sm text-gray-500">
                  {t('tracking.example')}{' '}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">SHIP123456789</span>
                  {', '}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">TRK987654321</span>
                </p>
              </div>
            </form>

            {/* Tracking Results */}
            {packageData && (
              <div className="mt-8 animate-fadeIn">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                  {/* Package Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {t('tracking.results.header')}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600 font-mono">{packageData.tracking_number}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          • {t('tracking.results.created')} {formatDate(packageData.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className={`mt-4 md:mt-0 px-5 py-2.5 rounded-full flex items-center gap-3 ${getStatusColor(packageData.status)}`}>
                      {getStatusIcon(packageData.status)}
                      <span className="font-semibold capitalize">
                        {packageData.status === 'delivered' ? t('tracking.results.status.delivered') :
                         packageData.status === 'in_transit' ? t('tracking.results.status.in_transit') :
                         packageData.status === 'out_for_delivery' ? t('tracking.results.status.out_for_delivery') :
                         packageData.status === 'pending' ? t('tracking.results.status.pending') :
                         packageData.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Route Visualization */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <h5 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      {t('tracking.route.title')}
                    </h5>

                    <div className="space-y-6">
                      {/* Route Progress Bar */}
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
                          <div
                            style={{ width: `${packageData.route_progress || 0}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                          ></div>
                        </div>

                        {/* Moving Current Location Indicator on Progress Bar */}
                        <div
                          style={{
                            left: `${packageData.route_progress || 0}%`,
                            transform: 'translateX(-50%)'
                          }}
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-lg z-20"
                        >
                          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50" style={{ animationDuration: '1.5s' }}></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Origin Marker */}
                        <div className="text-center">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {t('tracking.route.origin')}
                          </span>
                          <p className="text-xs text-gray-500">{packageData.origin_city}</p>
                        </div>

                        {/* Current Location Marker */}
                        <div className="text-center relative -mt-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-2 border-4 border-white shadow-lg relative z-10 animate-pulse">
                              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-blue-600">
                            {t('tracking.route.current_location')}
                          </span>
                          <p className="text-sm font-medium text-gray-800">{packageData.current_location || packageData.origin_city}</p>
                        </div>

                        {/* Destination Marker */}
                        <div className="text-center">
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-2">
                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {t('tracking.route.destination')}
                          </span>
                          <p className="text-xs text-gray-500">{packageData.destination_city}</p>
                        </div>
                      </div>

                      {/* Route Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                        {/* Route Information */}
                        <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
                          <h6 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm sm:text-base">{t('tracking.route_info.title')}</span>
                          </h6>
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">
                                {t('tracking.route_info.distance')}
                              </span>
                              <span className="font-medium text-gray-800 text-sm sm:text-base">
                                {packageData.distance_km ? `${packageData.distance_km.toLocaleString()} km` : '--'}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">
                                {t('tracking.route_info.progress')}
                              </span>
                              <span className="font-medium text-gray-800 text-sm sm:text-base">{packageData.route_progress || 0}%</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">
                                {t('tracking.route_info.carrier')}
                              </span>
                              <span className="font-medium text-gray-800 text-sm sm:text-base">
                                {packageData.carrier || t('tracking.default_values.carrier')}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">
                                {t('tracking.route_info.transport_mode')}
                              </span>
                              <span className="font-medium text-gray-800 text-sm sm:text-base">
                                {packageData.transport_mode || t('tracking.default_values.transport_mode')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Time Information */}
                        <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
                          <h6 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm sm:text-base">{t('tracking.time_info.title')}</span>
                          </h6>
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">
                                {t('tracking.time_info.departure')}
                              </span>
                              <span className="font-medium text-gray-800 text-sm sm:text-base">
                                {formatDate(packageData.departure_date || packageData.created_at)}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">
                                {t('tracking.time_info.arrival')}
                              </span>
                              <span className="font-medium text-gray-800 text-sm sm:text-base">
                                {formatDate(packageData.estimated_arrival || packageData.estimated_delivery)}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">
                                {t('tracking.time_info.transit_days')}
                              </span>
                              <span className="font-medium text-gray-800 text-sm sm:text-base">
                                {packageData.transit_days || '--'} {t('common.days', { count: packageData.transit_days || 0 })}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">
                                {t('tracking.time_info.current_status')}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${packageData.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                                packageData.status === 'out_for_delivery' ? 'bg-purple-100 text-purple-800' :
                                  packageData.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                {packageData.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Package Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {/* Sender Information */}
                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">{t('tracking.sender.title')}</span>
                      </div>
                      <p className="font-bold text-gray-800">{packageData.sender_name || t('tracking.default_values.sender_name')}</p>
                      <p className="text-sm text-gray-600 mt-1">{packageData.sender_address || packageData.origin_city}</p>
                      {packageData.sender_phone && (
                        <p className="text-sm text-gray-500">{packageData.sender_phone}</p>
                      )}
                    </div>

                    {/* Recipient Information */}
                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm font-medium">{t('tracking.recipient.title')}</span>
                      </div>
                      <p className="font-bold text-gray-800">{packageData.recipient_name || t('tracking.default_values.recipient_name')}</p>
                      <p className="text-sm text-gray-600 mt-1">{packageData.recipient_address || packageData.destination_city}</p>
                      {packageData.recipient_phone && (
                        <p className="text-sm text-gray-500">{packageData.recipient_phone}</p>
                      )}
                    </div>

                    {/* Package Details */}
                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-sm font-medium">{t('tracking.package_details.title')}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">{t('tracking.package_details.name')}</span>
                          <span className="font-medium text-gray-800">
                            {packageData.package_name || t('tracking.default_values.package_name')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">{t('tracking.package_details.type')}</span>
                          <span className="font-medium text-gray-800">
                            {packageData.package_type || t('tracking.default_values.package_type')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">{t('tracking.package_details.weight')}</span>
                          <span className="font-medium text-gray-800">{packageData.weight} kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Service & Delivery */}
                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">{t('tracking.service.title')}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">{t('tracking.service.service_type')}</span>
                          <span className="font-medium text-gray-800">{packageData.service_type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">{t('tracking.service.estimated')}</span>
                          <span className="font-medium text-gray-800">
                            {formatDate(packageData.estimated_delivery)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">{t('tracking.service.reference')}</span>
                          <span className="font-medium text-gray-800 text-sm">
                            {packageData.reference_number || t('tracking.default_values.reference')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Package Specifications Section */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-8">
                    <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {t('tracking.specifications.title')}
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {/* Dimensions */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium text-gray-700">{t('tracking.specifications.dimensions')}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs sm:text-sm text-gray-600">{t('tracking.specifications.length')}</div>
                            <div className="font-bold text-gray-800 text-sm sm:text-base">{packageData.dimensions_length || '--'} cm</div>
                          </div>
                          <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs sm:text-sm text-gray-600">{t('tracking.specifications.width')}</div>
                            <div className="font-bold text-gray-800 text-sm sm:text-base">{packageData.dimensions_width || '--'} cm</div>
                          </div>
                          <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs sm:text-sm text-gray-600">{t('tracking.specifications.height')}</div>
                            <div className="font-bold text-gray-800 text-sm sm:text-base">{packageData.dimensions_height || '--'} cm</div>
                          </div>
                        </div>
                      </div>

                      {/* Package Nature & Value */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span className="font-medium text-gray-700">{t('tracking.specifications.nature')}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">{t('tracking.specifications.contents')}</span>
                            <span className="font-medium text-gray-800 text-sm sm:text-base">
                              {packageData.contents || t('tracking.default_values.contents')}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">{t('tracking.specifications.value')}</span>
                            <span className="font-medium text-gray-800 text-sm sm:text-base">
                              {packageData.declared_value ? `$${packageData.declared_value}` : t('tracking.default_values.value')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium text-gray-700">{t('tracking.specifications.additional_info')}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">{t('tracking.specifications.insurance')}</span>
                            <span className={`font-medium text-sm sm:text-base ${packageData.insured ? 'text-green-600' : 'text-gray-600'}`}>
                              {packageData.insured ? t('common.insured_yes') : t('common.insured_no')}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">{t('tracking.specifications.signature_required')}</span>
                            <span className={`font-medium text-sm sm:text-base ${packageData.signature_required ? 'text-blue-600' : 'text-gray-600'}`}>
                              {packageData.signature_required ? t('common.yes') : t('common.no')}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-0">{t('tracking.specifications.priority')}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${packageData.priority === 'express' ? 'bg-purple-100 text-purple-800' :
                              packageData.priority === 'standard' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                              {packageData.priority || t('tracking.default_values.priority')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-4">
                      {t('tracking.timeline.title')}
                    </h5>
                    <div className="space-y-4">
                      {packageData.tracking_events && packageData.tracking_events.length > 0 ? (
                        packageData.tracking_events
                          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                          .map((event, index) => (
                            <div key={event.id} className="flex">
                              <div className="flex flex-col items-center mr-4">
                                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'
                                  }`}></div>
                                {index < packageData.tracking_events.length - 1 && (
                                  <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-gray-800">{event.status.replace('_', ' ')}</p>
                                    <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-gray-600 font-medium">
                                      {new Date(event.timestamp).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(event.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600">{event.location}</span>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500">{t('tracking.timeline.no_events')}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Clear tracking button */}
            {packageData && (
              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setPackageData(null);
                    setTrackingNumber("");
                  }}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                >
                  <svg className="inline h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('tracking.actions.track_another')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}