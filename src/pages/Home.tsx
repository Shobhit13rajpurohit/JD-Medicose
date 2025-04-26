import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Brain, MessageSquare, Clock, Phone, Award, 
  ChevronFirst as FirstAid, Stethoscope, Activity, ArrowLeft, 
  ArrowRight, Star, PhoneCall, ChevronLeft, ChevronRight,
  Bookmark, Map, Users, CheckCircle
} from 'lucide-react';
import DoctorSchedule from './DoctorSchedule'; 

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isCallBallVisible, setIsCallBallVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const heroSliderRef = useRef(null);
  
  // Enhanced doctor information with dates
  const doctors = [
    { 
      name: "Dr. Achyut Trivedi", 
      specialization: "Psychiatrist", 
      timing: "1:00 PM - 5:00 PM", 
      status: "Available",
      dates: "1st Sunday of each month",
      image: "/api/placeholder/100/100",
      experience: "25+ years"
    },
    { 
      name: "Dr. Praveen Chhimpa", 
      specialization: "ENT Specialist", 
      timing: "11:00 AM - 2:00 PM", 
      status: "Available",
      dates: "1st, 3rd & 5th Monday Each Month",
      image: "/api/placeholder/100/100",
      experience: "12+ years"
    },
    { 
      name: "Dr. Srikant Meena", 
      specialization: "Dermatologist (Skin)", 
      timing: "3:00 PM - 5:00 PM", 
      status: "Available",
      dates: "1st & 3rd Thursday of each month", 
      image: "/api/placeholder/100/100",
      experience: "10+ years"
    }
  ];

  // Enhanced patient reviews data
  const patientReviews = [
    {
      name: "Priya Sharma",
      image: "/api/placeholder/60/60",
      rating: 5,
      review: "The doctors at JD Medicose are extremely professional and caring. Dr. Sharma diagnosed my condition accurately when other doctors couldn't. The staff is very supportive and the facilities are excellent.",
      date: "March 15, 2025"
    },
    {
      name: "Rahul Verma",
      image: "/api/placeholder/60/60",
      rating: 5,
      review: "My experience with Dr. Patel was outstanding. She took time to understand my health issues and provided a comprehensive treatment plan. The clinic is clean and well-maintained.",
      date: "February 22, 2025"
    },
    {
      name: "Anita Desai",
      image: "/api/placeholder/60/60",
      rating: 4,
      review: "Great medical care in a friendly environment. The doctors are knowledgeable and the appointment system is efficient. I've been coming here for my family's healthcare needs for years.",
      date: "March 28, 2025"
    }
  ];

  // Enhanced features with more relevant icons and descriptions
  const features = [
    { 
      icon: FirstAid, 
      title: "Primary Care", 
      description: "Comprehensive healthcare services for individuals and families" 
    },
    { 
      icon: Stethoscope, 
      title: "Specialist Consultation", 
      description: "Access to expert medical specialists across multiple disciplines" 
    },
    { 
      icon: Activity, 
      title: "Modern Diagnostics", 
      description: "Advanced diagnostic equipment for accurate medical assessments" 
    },
    { 
      icon: Clock, 
      title: "Complete Pharmacy", 
      description: "Full-service pharmacy with all essential medications available" 
    }
  ];

  // Enhanced hero slides with better descriptions
  const slides = [
    {
      title: "Your Health is Our Priority",
      description: "Experience comprehensive healthcare with our team of specialists in a modern, patient-focused environment.",
      image: "bg-gradient-to-r from-blue-700 to-blue-900",
      ctaText: "Meet Our Doctors"
    },
    {
      title: "Specialized Medical Care",
      description: "Our doctors provide evidence-based, personalized treatment plans tailored to your specific health needs.",
      image: "bg-gradient-to-r from-indigo-600 to-purple-700",
      ctaText: "Check Symptoms"
    },
    {
      title: "Complete Family Healthcare",
      description: "From preventive care to specialized treatments, we provide comprehensive health services for your entire family.",
      image: "bg-gradient-to-r from-teal-500 to-emerald-700",
      ctaText: "Book Appointment"
    }
  ];

  // Improved slider timing (reduced from 5000ms to 4000ms)
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [slides.length, isPaused]);

  // Auto-slider effect for reviews with improved timing (reduced from 8000ms to 6000ms)
  useEffect(() => {
    if (!isPaused) {
      const reviewInterval = setInterval(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % patientReviews.length);
      }, 6000);
      return () => clearInterval(reviewInterval);
    }
  }, [patientReviews.length, isPaused]);

  // Scroll indicator effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsCallBallVisible(true);
      } else {
        setIsCallBallVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function for next/prev slides
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Helper function for reviews navigation
  const goToReview = (index) => {
    setCurrentReviewIndex(index);
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % patientReviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + patientReviews.length) % patientReviews.length);
  };

  // Enhanced call button functionality
  const handleCallButtonClick = () => {
    window.location.href = "tel:9461499372";
  };

 

  return (
    <div className="bg-gray-50 relative">
      {/* Enhanced Floating Voice Call Button with tooltip */}
      {isCallBallVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
          <div className="bg-white text-gray-800 text-sm px-3 py-1 rounded-lg shadow-md mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Call for assistance
          </div>
          <button 
            onClick={handleCallButtonClick}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300 group relative"
            aria-label="Voice Call"
          >
            <PhoneCall size={24} />
            <span className="absolute -top-10 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Call: 9461499372
            </span>
          </button>
        </div>
      )}

      {/* Enhanced Hero Section with hover pause */}
      <div 
        ref={heroSliderRef}
        className={`relative h-[500px] md:h-[600px] transition-all duration-700 ${slides[currentSlide].image}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white w-full max-w-3xl animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 transition-transform duration-500 transform translate-y-0 opacity-100">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl transition-transform duration-500 transform translate-y-0 opacity-100">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/doctor-schedule')}
                className="bg-white text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-100 transition-all duration-300 flex items-center font-semibold transform hover:scale-105 shadow-lg"
              >
                <Calendar className="mr-2" size={20} /> {slides[currentSlide].ctaText}
              </button>
              <button
                onClick={() => navigate('/symptoms-checker')}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center font-semibold transform hover:scale-105"
              >
                <Brain className="mr-2" size={20} /> Check Symptoms
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Slider Controls with visual feedback */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-12 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-100 w-16' : 'bg-gray-400 bg-opacity-60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Enhanced Arrow Navigation */}
        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ArrowRight size={24} />
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

    <div>  
      <DoctorSchedule />
    </div>

      {/* Enhanced Doctors Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Specialists</h2>
              <p className="text-gray-600">Meet our team of experienced healthcare professionals</p>
            </div>
            <button 
              onClick={() => navigate('/doctors')}
              className="hidden md:flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View all doctors <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="h-28 bg-gradient-to-r from-blue-500 to-blue-700 relative">
                  <div className="absolute -bottom-10 left-6">
                    <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      doctor.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doctor.status}
                    </span>
                  </div>
                </div>
                <div className="pt-12 px-6 pb-6">
                  <div className="mb-1">
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      {doctor.timing}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      {doctor.dates}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-blue-500" />
                      Experience: {doctor.experience}
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <button 
              onClick={() => navigate('/all-doctors')}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View all doctors <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
  {/* Enhanced Features Section */}
  <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose JD Medicose</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience healthcare excellence with our comprehensive medical services and dedicated team of professionals.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="bg-blue-50 p-4 rounded-full inline-block mb-6 group-hover:bg-blue-100 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Patient Reviews Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">What Our Patients Say</h2>
            <p className="text-blue-100">Hear from our satisfied patients about their healthcare experience</p>
          </div>
          
          <div className="relative" 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}>
              {patientReviews.map((review, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-500">
                        <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{review.review}"</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced Review Navigation Controls */}
            <div className="flex justify-center mt-8 gap-3">
              {patientReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToReview(index)}
                  className={`w-10 h-2 rounded-full transition-all duration-300 ${
                    currentReviewIndex === index ? 'bg-white scale-100 w-14' : 'bg-blue-300'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={prevReview} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-100 transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextReview} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-100 transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats & Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-8 flex items-center text-gray-900 border-b pb-4">
              <Award className="h-6 w-6 mr-2 text-blue-600" />
              Our Achievements
            </h2>
            <div className="grid grid-cols-2 gap-y-10">
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
                <p className="text-gray-600 font-medium">Expert Specialists</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">5k+</div>
                <p className="text-gray-600 font-medium">Happy Patients</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <p className="text-gray-600 font-medium">Success Rate</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
                <p className="text-gray-600 font-medium">Years Experience</p>
              </div>
            </div>
          </div>

         
        </div>
      </div>

      
      
    </div>
  );
};

export default Home;