"use client"

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
    Search, Package, Edit, Trash2, Plus, Save, X,
    Truck, User, MapPin, Calendar, Clock, CheckCircle,
    Ruler, Weight, Box, Shield, DollarSign, Signature,
    TrendingUp, Navigation, Globe, Layers
} from "lucide-react";
import AuthGuard from "../component/AuthGuard";

export default function AdminPanel() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingShipment, setEditingShipment] = useState(null);
    const [newTrackingEvent, setNewTrackingEvent] = useState({
        status: "order_created",
        location: "",
        description: ""
    });
    const [showAllShipments, setShowAllShipments] = useState(false);

    // Fetch all shipments or search by tracking number
    // Fetch all shipments or search by tracking number
    const fetchShipments = async () => {
        console.log("🔄 Fetching shipments...");
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            let query = supabase
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
                .order('created_at', { ascending: false });

            if (trackingNumber && !showAllShipments) {
                query = query.eq('tracking_number', trackingNumber.trim());
            }

            const { data, error: supabaseError } = await query;

            if (supabaseError) {
                console.error("Fetch error:", supabaseError);
                setError("Error fetching shipments: " + supabaseError.message);
                return;
            }

            console.log("📦 Fetched shipments:", data?.length || 0);
            setShipments(data || []);

            if (data && data.length > 0) {
                setSuccess(`Found ${data.length} shipment(s)`);
            } else {
                setError("No shipments found");
            }
        } catch (err) {
            console.error("Fetch exception:", err);
            setError("An unexpected error occurred while fetching shipments");
        } finally {
            setLoading(false);
        }
    };

    // Create new shipment
    const createShipment = async () => {
        const newShipment = {
            tracking_number: `SHIP${Date.now().toString().slice(-8)}`,
            status: "order_created",
            sender_name: "",
            sender_address: "",
            sender_phone: "",
            recipient_name: "",
            recipient_address: "",
            recipient_phone: "",
            origin_city: "",
            destination_city: "",
            package_name: "",
            package_type: "General",
            weight: 1.0,
            dimensions_length: 0,
            dimensions_width: 0,
            dimensions_height: 0,
            nature: "general",
            contents: "",
            declared_value: 0,
            insured: false,
            signature_required: false,
            priority: "standard",
            service_type: "Standard",
            reference_number: "",
            carrier: "Standard Carrier",
            transport_mode: "Ground Shipping",
            current_location: "",
            route_progress: 0,
            distance_km: 0,
            departure_date: new Date().toISOString(),
            estimated_arrival: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            transit_days: 7,
            border_crossings: "pending",
            border_location: "",
            customs_status: "Pending"
        };

        setEditingShipment(newShipment);
    };

    // Save shipment (create or update) - SIMPLER VERSION
    // Save shipment (create or update)
    const saveShipment = async () => {
        if (!editingShipment) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Create a clean copy of the shipment data
            const shipmentData = { ...editingShipment };

            // Remove fields that shouldn't be in the shipments table
            delete shipmentData.tracking_events;
            delete shipmentData.created_at;
            delete shipmentData.updated_at;

            // Ensure required fields have values
            if (!shipmentData.tracking_number) {
                throw new Error("Tracking number is required");
            }

            // Check if it's an update or create
            const isUpdate = shipmentData.id && shipments.some(s => s.id === shipmentData.id);

            console.log("Saving shipment:", shipmentData);
            console.log("Is update:", isUpdate);

            if (isUpdate) {
                // Update existing shipment
                const { error } = await supabase
                    .from('shipments')
                    .update(shipmentData)
                    .eq('id', shipmentData.id);

                if (error) {
                    console.error("Update error:", error);
                    throw error;
                }

                setSuccess("Shipment updated successfully!");
            } else {
                // Create new shipment - remove id
                delete shipmentData.id;

                const { error } = await supabase
                    .from('shipments')
                    .insert([shipmentData]);

                if (error) {
                    console.error("Insert error:", error);
                    throw error;
                }

                setSuccess("New shipment created successfully!");
            }

            // Force refresh the shipments list
            await fetchShipments();

            // Close the edit modal
            setEditingShipment(null);

            console.log("Save successful, refreshing list...");

        } catch (err) {
            console.error("Save shipment error:", err);
            setError("Error saving shipment: " + (err.message || "Database error occurred"));
        } finally {
            setLoading(false);
        }
    };

    // Delete shipment
    const deleteShipment = async (id) => {
        if (!confirm("Are you sure you want to delete this shipment? This will also delete all tracking events.")) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const { error } = await supabase
                .from('shipments')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setSuccess("Shipment deleted successfully!");
            await fetchShipments();
        } catch (err) {
            setError("Error deleting shipment: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add tracking event
    const addTrackingEvent = async (shipmentId) => {
        if (!newTrackingEvent.location.trim() || !newTrackingEvent.description.trim()) {
            setError("Please fill in location and description");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const trackingEvent = {
                shipment_id: shipmentId,
                status: newTrackingEvent.status,
                location: newTrackingEvent.location,
                description: newTrackingEvent.description,
                timestamp: new Date().toISOString()
            };

            const { error } = await supabase
                .from('tracking_events')
                .insert([trackingEvent]);

            if (error) throw error;

            // Update shipment's current location and route progress
            const shipment = shipments.find(s => s.id === shipmentId);
            if (shipment) {
                // Create clean shipment update data
                const updateData = {
                    current_location: newTrackingEvent.location,
                    last_location_update: new Date().toISOString(),
                    status: newTrackingEvent.status,
                    route_progress: calculateRouteProgress(newTrackingEvent.status)
                };

                await supabase
                    .from('shipments')
                    .update(updateData)
                    .eq('id', shipmentId);
            }

            setNewTrackingEvent({
                status: "order_created",
                location: "",
                description: ""
            });
            setSuccess("Tracking event added successfully!");
            await fetchShipments();
        } catch (err) {
            setError("Error adding tracking event: " + err.message);
            console.error("Add tracking event error:", err);
        } finally {
            setLoading(false);
        }
    };

    const calculateRouteProgress = (status) => {
        switch (status) {
            case 'order_created': return 0;
            case 'processing': return 10;
            case 'in_transit': return 30;
            case 'arrived_at_hub': return 50;
            case 'customs_clearance': return 60;
            case 'out_for_delivery': return 90;
            case 'delivered': return 100;
            default: return 0;
        }
    };

    // Delete tracking event
    const deleteTrackingEvent = async (eventId, shipmentId) => {
        if (!confirm("Are you sure you want to delete this tracking event?")) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const { error } = await supabase
                .from('tracking_events')
                .delete()
                .eq('id', eventId);

            if (error) throw error;

            setSuccess("Tracking event deleted successfully!");
            await fetchShipments();
        } catch (err) {
            setError("Error deleting tracking event: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Status options for dropdown
    const statusOptions = [
        { value: 'order_created', label: 'Order Created' },
        { value: 'processing', label: 'Processing' },
        { value: 'in_transit', label: 'In Transit' },
        { value: 'arrived_at_hub', label: 'Arrived at Hub' },
        { value: 'customs_clearance', label: 'Customs Clearance' },
        { value: 'out_for_delivery', label: 'Out for Delivery' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'exception', label: 'Exception' }
    ];

    // Initialize - fetch all shipments
    useEffect(() => {
        fetchShipments();
    }, []);

    return (
        <AuthGuard>
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Shipping Logistics Admin Panel</h1>
                    <p className="text-gray-600">Manage shipments and tracking events</p>
                </div>

                {/* Search and Controls */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    placeholder="Search by tracking number"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    onKeyPress={(e) => e.key === 'Enter' && fetchShipments()}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={fetchShipments}
                                disabled={loading}
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <Search className="h-5 w-5" />
                                        Search
                                    </>
                                )}
                            </button>

                            <button
                                onClick={fetchShipments}
                                disabled={loading}
                                className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Refreshing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Refresh
                                    </>
                                )}
                            </button>

                            <button
                                onClick={createShipment}
                                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
                            >
                                <Plus className="h-5 w-5" />
                                New Shipment
                            </button>
                            <button
                                onClick={() => {
                                    setShowAllShipments(!showAllShipments);
                                    setTrackingNumber("");
                                    fetchShipments();
                                }}
                                className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
                            >
                                {showAllShipments ? "Show Recent" : "Show All"}
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-600">{success}</p>
                        </div>
                    )}
                </div>

                {/* Shipment List */}
                <div className="space-y-6">
                    {shipments.map((shipment) => (
                        <div key={shipment.id} className="bg-white rounded-lg shadow overflow-hidden">
                            {/* Shipment Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-gray-800">{shipment.tracking_number}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                                                    shipment.status === 'out_for_delivery' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {shipment.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mt-1">
                                            {shipment.sender_name} → {shipment.recipient_name}
                                        </p>
                                        <div className="flex flex-wrap gap-4 mt-2">
                                            <div className="flex items-center gap-1">
                                                <Ruler className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    {shipment.dimensions_length || 0}×{shipment.dimensions_width || 0}×{shipment.dimensions_height || 0} cm
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Weight className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">{shipment.weight} kg</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <TrendingUp className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">Progress: {shipment.route_progress || 0}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3 md:mt-0">
                                        <button
                                            onClick={() => setEditingShipment(shipment)}
                                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteShipment(shipment.id)}
                                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Shipment Details */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Shipment Info */}
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Package className="h-5 w-5" />
                                            Shipment Details
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Route:</span>
                                                <span className="font-medium">{shipment.origin_city} → {shipment.destination_city}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Package:</span>
                                                <span className="font-medium">{shipment.package_name} ({shipment.weight}kg)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Dimensions:</span>
                                                <span className="font-medium">
                                                    {shipment.dimensions_length || 0}×{shipment.dimensions_width || 0}×{shipment.dimensions_height || 0} cm
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Nature:</span>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${shipment.nature === 'fragile' ? 'bg-red-100 text-red-800' :
                                                    shipment.nature === 'hazardous' ? 'bg-orange-100 text-orange-800' :
                                                        shipment.nature === 'perishable' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {shipment.nature || 'General'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Value:</span>
                                                <span className="font-medium">
                                                    {shipment.declared_value ? `$${shipment.declared_value}` : 'Not declared'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Progress */}
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Navigation className="h-5 w-5" />
                                            Status & Progress
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Current Location:</span>
                                                <span className="font-medium">{shipment.current_location || 'Not set'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Journey Progress:</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full"
                                                            style={{ width: `${shipment.route_progress || 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="font-medium">{shipment.route_progress || 0}%</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Distance:</span>
                                                <span className="font-medium">{shipment.distance_km || 0} km</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Carrier:</span>
                                                <span className="font-medium">{shipment.carrier || 'Standard Carrier'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Service:</span>
                                                <span className="font-medium">{shipment.service_type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Package Specifications */}
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Box className="h-5 w-5" />
                                            Package Specifications
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Package Type:</span>
                                                <span className="font-medium">{shipment.package_type || 'General'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Contents:</span>
                                                <span className="font-medium">{shipment.contents || 'Not specified'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Insurance:</span>
                                                <span className={`font-medium ${shipment.insured ? 'text-green-600' : 'text-gray-600'}`}>
                                                    {shipment.insured ? 'Insured ✓' : 'Not insured'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Signature Required:</span>
                                                <span className={`font-medium ${shipment.signature_required ? 'text-blue-600' : 'text-gray-600'}`}>
                                                    {shipment.signature_required ? 'Yes' : 'No'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Priority:</span>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${shipment.priority === 'express' ? 'bg-purple-100 text-purple-800' :
                                                    shipment.priority === 'standard' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {shipment.priority || 'Standard'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add Tracking Event Form */}
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Plus className="h-5 w-5" />
                                            Add Tracking Event
                                        </h4>
                                        <div className="space-y-3">
                                            <select
                                                value={newTrackingEvent.status}
                                                onChange={(e) => setNewTrackingEvent({ ...newTrackingEvent, status: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            >
                                                {statusOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="Location (e.g., New York Warehouse)"
                                                value={newTrackingEvent.location}
                                                onChange={(e) => setNewTrackingEvent({ ...newTrackingEvent, location: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                            <textarea
                                                placeholder="Description (e.g., Package received at facility)"
                                                value={newTrackingEvent.description}
                                                onChange={(e) => setNewTrackingEvent({ ...newTrackingEvent, description: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                rows="2"
                                            />
                                            <button
                                                onClick={() => addTrackingEvent(shipment.id)}
                                                disabled={loading}
                                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                Add Tracking Event
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Events List */}
                                <div className="mt-8">
                                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Tracking History ({shipment.tracking_events?.length || 0} events)
                                    </h4>
                                    <div className="space-y-3">
                                        {shipment.tracking_events && shipment.tracking_events.length > 0 ? (
                                            shipment.tracking_events
                                                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                                .map((event) => (
                                                    <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <span className={`px-2 py-1 rounded text-xs font-medium ${event.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                    event.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                                                                        event.status === 'out_for_delivery' ? 'bg-purple-100 text-purple-800' :
                                                                            'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                    {event.status.replace('_', ' ')}
                                                                </span>
                                                                <span className="font-medium">{event.location}</span>
                                                            </div>
                                                            <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                                                            <p className="text-gray-500 text-xs mt-1">
                                                                {new Date(event.timestamp).toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => deleteTrackingEvent(event.id, shipment.id)}
                                                            className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                ))
                                        ) : (
                                            <p className="text-gray-500 italic">No tracking events yet</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edit Shipment Modal */}
                {editingShipment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {editingShipment.id ? 'Edit Shipment' : 'Create New Shipment'}
                                    </h2>
                                    <button
                                        onClick={() => setEditingShipment(null)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Sender Information */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            Sender Information
                                        </h3>
                                        <input
                                            type="text"
                                            placeholder="Sender Name"
                                            value={editingShipment.sender_name}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, sender_name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Sender Address"
                                            value={editingShipment.sender_address}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, sender_address: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Sender Phone"
                                            value={editingShipment.sender_phone}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, sender_phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    {/* Recipient Information */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            Recipient Information
                                        </h3>
                                        <input
                                            type="text"
                                            placeholder="Recipient Name"
                                            value={editingShipment.recipient_name}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, recipient_name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Recipient Address"
                                            value={editingShipment.recipient_address}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, recipient_address: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Recipient Phone"
                                            value={editingShipment.recipient_phone}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, recipient_phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    {/* Route Information */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <MapPin className="h-5 w-5" />
                                            Route Information
                                        </h3>
                                        <input
                                            type="text"
                                            placeholder="Origin City"
                                            value={editingShipment.origin_city}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, origin_city: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Destination City"
                                            value={editingShipment.destination_city}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, destination_city: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Distance (km)"
                                            value={editingShipment.distance_km}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, distance_km: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    {/* Package Dimensions */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <Ruler className="h-5 w-5" />
                                            Package Dimensions (cm)
                                        </h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            <input
                                                type="number"
                                                placeholder="Length"
                                                value={editingShipment.dimensions_length}
                                                onChange={(e) => setEditingShipment({ ...editingShipment, dimensions_length: parseFloat(e.target.value) || 0 })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Width"
                                                value={editingShipment.dimensions_width}
                                                onChange={(e) => setEditingShipment({ ...editingShipment, dimensions_width: parseFloat(e.target.value) || 0 })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Height"
                                                value={editingShipment.dimensions_height}
                                                onChange={(e) => setEditingShipment({ ...editingShipment, dimensions_height: parseFloat(e.target.value) || 0 })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="Weight (kg)"
                                            value={editingShipment.weight}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, weight: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Package Name"
                                            value={editingShipment.package_name}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, package_name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    {/* Package Details */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <Box className="h-5 w-5" />
                                            Package Details
                                        </h3>
                                        <select
                                            value={editingShipment.package_type}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, package_type: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="General">General</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Documents">Documents</option>
                                            <option value="Fragile">Fragile</option>
                                            <option value="Hazardous">Hazardous</option>
                                            <option value="Perishable">Perishable</option>
                                        </select>
                                        <select
                                            value={editingShipment.nature}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, nature: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="general">General Goods</option>
                                            <option value="fragile">Fragile</option>
                                            <option value="hazardous">Hazardous</option>
                                            <option value="perishable">Perishable</option>
                                            <option value="liquid">Liquid</option>
                                        </select>
                                        <textarea
                                            placeholder="Contents Description"
                                            value={editingShipment.contents}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, contents: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            rows="2"
                                        />
                                    </div>

                                    {/* Value & Insurance */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <DollarSign className="h-5 w-5" />
                                            Value & Insurance
                                        </h3>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Declared Value ($)"
                                            value={editingShipment.declared_value}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, declared_value: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="insured"
                                                checked={editingShipment.insured}
                                                onChange={(e) => setEditingShipment({ ...editingShipment, insured: e.target.checked })}
                                                className="h-5 w-5"
                                            />
                                            <label htmlFor="insured" className="text-gray-700">Insured</label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="signatureRequired"
                                                checked={editingShipment.signature_required}
                                                onChange={(e) => setEditingShipment({ ...editingShipment, signature_required: e.target.checked })}
                                                className="h-5 w-5"
                                            />
                                            <label htmlFor="signatureRequired" className="text-gray-700">Signature Required</label>
                                        </div>
                                    </div>

                                    {/* Status & Service */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <Truck className="h-5 w-5" />
                                            Status & Service
                                        </h3>
                                        <select
                                            value={editingShipment.status}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, status: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            {statusOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={editingShipment.service_type}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, service_type: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="Standard">Standard</option>
                                            <option value="Express">Express</option>
                                            <option value="Priority">Priority</option>
                                            <option value="International">International</option>
                                            <option value="Same Day">Same Day</option>
                                        </select>
                                        <select
                                            value={editingShipment.priority}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, priority: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="standard">Standard</option>
                                            <option value="express">Express</option>
                                            <option value="priority">Priority</option>
                                        </select>
                                    </div>

                                    {/* Transport & Carrier */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <Globe className="h-5 w-5" />
                                            Transport & Carrier
                                        </h3>
                                        <input
                                            type="text"
                                            placeholder="Carrier"
                                            value={editingShipment.carrier}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, carrier: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <select
                                            value={editingShipment.transport_mode}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, transport_mode: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="Ground Shipping">Ground Shipping</option>
                                            <option value="Air Freight">Air Freight</option>
                                            <option value="Sea Freight">Sea Freight</option>
                                            <option value="Rail">Rail</option>
                                            <option value="Express Air">Express Air</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Reference Number"
                                            value={editingShipment.reference_number}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, reference_number: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    {/* Progress & Location */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5" />
                                            Progress & Location
                                        </h3>
                                        <input
                                            type="text"
                                            placeholder="Current Location"
                                            value={editingShipment.current_location}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, current_location: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-700">Journey Progress:</span>
                                            <div className="flex-1 flex items-center gap-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={editingShipment.route_progress}
                                                    onChange={(e) => setEditingShipment({ ...editingShipment, route_progress: parseInt(e.target.value) || 0 })}
                                                    className="flex-1"
                                                />
                                                <span className="w-12 text-right">{editingShipment.route_progress}%</span>
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Transit Days"
                                            value={editingShipment.transit_days}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, transit_days: parseInt(e.target.value) || 0 })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    {/* Dates */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            Dates
                                        </h3>
                                        <input
                                            type="datetime-local"
                                            value={editingShipment.departure_date ? new Date(editingShipment.departure_date).toISOString().slice(0, 16) : ''}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, departure_date: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="datetime-local"
                                            value={editingShipment.estimated_arrival ? new Date(editingShipment.estimated_arrival).toISOString().slice(0, 16) : ''}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, estimated_arrival: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="datetime-local"
                                            value={editingShipment.estimated_delivery ? new Date(editingShipment.estimated_delivery).toISOString().slice(0, 16) : ''}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, estimated_delivery: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    {/* Border & Customs */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <Layers className="h-5 w-5" />
                                            Border & Customs
                                        </h3>
                                        <select
                                            value={editingShipment.border_crossings}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, border_crossings: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="cleared">Cleared</option>
                                            <option value="not_required">Not Required</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Border Location"
                                            value={editingShipment.border_location}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, border_location: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Customs Status"
                                            value={editingShipment.customs_status}
                                            onChange={(e) => setEditingShipment({ ...editingShipment, customs_status: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                                    <button
                                        onClick={() => setEditingShipment(null)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveShipment}
                                        disabled={loading}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                                    >
                                        <Save className="h-5 w-5" />
                                        {loading ? 'Saving...' : 'Save Shipment'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </AuthGuard>
    );
}