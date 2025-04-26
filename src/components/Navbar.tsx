import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X, Home, Calendar, Brain, Image, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/doctor-schedule', label: 'Doctors', icon: <Calendar className="w-5 h-5" /> },
    { path: '/symptoms-checker', label: 'AI Checker', icon: <Brain className="w-5 h-5" /> },
    { path: '/gallery', label: 'Gallery', icon: <Image className="w-5 h-5" /> },
    { path: '/feedback', label: 'Feedback', icon: <MessageSquare className="w-5 h-5" /> }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <Stethoscope className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute -inset-1 bg-blue-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                JD Medicose
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 rounded-lg transition-all duration-300"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div 
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    isActive(link.path) 
                      ? 'bg-blue-100' 
                      : hoverIndex === index 
                        ? 'bg-gray-100 scale-105' 
                        : 'bg-transparent'
                  }`}
                ></div>
                <div className="relative flex items-center justify-center space-x-1">
                  <span className="transition-transform duration-300 transform-gpu">
                    {link.icon}
                  </span>
                  <span 
                    className={`font-medium transition-colors duration-300 ${
                      isActive(link.path) ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </span>
                </div>
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full transform-gpu"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-600 transform-gpu translate-x-2'
                    : 'text-gray-700 hover:bg-gray-100 hover:translate-x-2'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-blue-600">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;