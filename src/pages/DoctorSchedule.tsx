import React, { useState, useEffect } from 'react';
import { Clock, Phone, User, AlertCircle, Stethoscope, MapPin } from 'lucide-react';
import axios from 'axios';

// Interface to match backend response structure from schedules.py
interface DoctorSchedule {
  id: number;
  name: string;
  specialization: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  specific_date?: string | null;
  contact_number?: string | null;
  image_filename: string | null;
}

const API_URL = "https://medical-backend-16ms.onrender.com";

const DoctorSchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [animatedElements, setAnimatedElements] = useState<Element[]>([]);

  // Format time from 24-hour to 12-hour
  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${suffix}`;
  };

  // Animation on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            setAnimatedElements(prev => [...prev, entry.target]);
          }
        });
      },
      { threshold: 0.1 }
    );
  
    document.querySelectorAll('.animate-item').forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      observer.disconnect();
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [animatedElements]);

  // Fetch schedules data - once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch schedules directly from the /schedules endpoint
        const schedulesResponse = await axios.get(`${API_URL}/schedules`);
        // Only show available schedules
        const availableSchedules = schedulesResponse.data.filter(
          (schedule: DoctorSchedule) => schedule.is_available
        );
        setSchedules(availableSchedules);
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch doctor schedules. Please try again later.');
        console.error('Error fetching schedules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date for any specific dates
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header section with gradient styling */}
      <div className="text-center mb-12 animate-item">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Available Doctors for This Month
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find and schedule appointments with our team of specialized medical professionals.
        </p>
      </div>
      
      {loading ? (
        <div className="text-center py-16 animate-item">
          <div className="flex justify-center">
            <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading doctors' schedules...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center space-x-3 animate-item">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <p>{error}</p>
        </div>
      ) : schedules.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-lg flex items-center space-x-3 animate-item">
          <AlertCircle className="h-6 w-6 text-yellow-500" />
          <p>No doctors are currently available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule, index) => (
            <div 
              key={schedule.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden group animate-item"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {schedule.image_filename ? (
                    <div className="relative">
                      <img 
                        src={`${API_URL}/uploads/doctors/${schedule.image_filename}`} 
                        alt={schedule.name} 
                        className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-md">
                        <User className="h-10 w-10 text-blue-600" />
                      </div>
                      <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{schedule.name}</h3>
                    <div className="flex items-center text-blue-600 mb-3">
                      <Stethoscope className="h-4 w-4 mr-1" />
                      <span>{schedule.specialization}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="bg-blue-50 px-2 py-1 rounded text-sm">
                          {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                        </span>
                      </div>
                      
                      {schedule.specific_date ? (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-sm">{formatDate(schedule.specific_date)}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-sm">Weekly on {schedule.day_of_week}</span>
                        </div>
                      )}
                      
                      {schedule.contact_number && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{schedule.contact_number}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">JD Medicose, Nokha</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Custom CSS for animations */}
      <style data-jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-item {
          opacity: 0;
        }
      `}</style>
    </div>
    
  );
};

export default DoctorSchedule;