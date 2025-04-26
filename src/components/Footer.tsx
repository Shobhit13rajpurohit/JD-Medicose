import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [animatedElements, setAnimatedElements] = useState([]);

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  // Animation on scroll effect
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

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
      {/* Wave SVG decoration at top of footer */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
        <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#1f2937" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#1f2937" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#1f2937"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: About */}
            <div className="animate-item transition-all duration-700 ease-in-out transform hover:translate-y-1">
              <h3 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2 inline-block">About JD Medicose</h3>
              <p className="text-gray-400 mb-4">
                Providing quality healthcare services with modern facilities and experienced medical professionals.
                Your health is our top priority.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Contact Us */}
            <div className="animate-item transition-all duration-700 ease-in-out delay-100">
              <h3 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2 inline-block">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center group">
                  <Phone className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-300 transition-colors duration-300" />
                  <div>
                    <p className="text-gray-400">For Appointments & Enquiries:</p>
                    <a href="tel:9461499372" className="text-white hover:text-blue-300 transition-colors duration-300">9461499372</a>
                  </div>
                </li>
                <li className="flex items-center group">
                  <Mail className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-300 transition-colors duration-300" />
                  <div>
                    <p className="text-gray-400">Email Us:</p>
                    <a href="mailto:contact@jdmedicose.com" className="text-white hover:text-blue-300 transition-colors duration-300">contact@jdmedicose.com</a>
                  </div>
                </li>
                <li className="flex items-center group">
                  <MapPin className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-300 transition-colors duration-300" />
                  <div>
                    <p className="text-gray-400">Our Location:</p>
                    <p className="text-white">Opposite to UCO Bank, Bikaner Road, Nokha Bikaner (Raj.) 334803</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Working Hours */}
            <div className="animate-item transition-all duration-700 ease-in-out delay-200">
              <h3 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2 inline-block">Operating Hours</h3>
              <ul className="space-y-3">
                <li className="flex items-center group">
                  <Clock className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-300 transition-colors duration-300" />
                  <div>
                    <p className="text-gray-400">Monday - Saturday:</p>
                    <p className="text-white">9:00 AM - 9:00 PM</p>
                  </div>
                </li>
                <li className="flex items-center group">
                  <Clock className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-300 transition-colors duration-300" />
                  <div>
                    <p className="text-gray-400">Sunday:</p>
                    <p className="text-white">9:00 AM - 8:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 4: Map */}
            <div className="animate-item transition-all duration-700 ease-in-out delay-300">
              <h3 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2 inline-block">Find Us</h3>
              <div className="h-48 bg-gray-700 rounded-lg overflow-hidden relative group">
                {/* Placeholder for Google Map iframe */}
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-blue-500 animate-bounce" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-2 text-center text-xs">
                  Tap to view interactive map
                </div>
                {/* This would be replaced with actual Google Maps */}
                {/* In a real implementation, you'd use a proper Maps API or embed code */}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
       

        {/* Copyright Section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="animate-item">&copy; {new Date().getFullYear()} JD Medicose. All rights reserved.</p>
            <div className="mt-4 md:mt-0 animate-item delay-100">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors mx-3">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors mx-3">Privacy Policy</a>
              
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
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
    </footer>
  );
};

export default Footer;