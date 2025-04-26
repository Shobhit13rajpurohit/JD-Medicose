import React, { useState, useEffect } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import axios from 'axios';
import { Loader, Images, AlertCircle } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string | null;
  description: string | null;
  image_url: string;
  order_index: number;
  is_active: boolean;
}

const API_URL = 'https://medical-backend-16ms.onrender.com';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [animatedElements, setAnimatedElements] = useState<Element[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/gallery`);
        setImages(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load gallery images. Please try again later.');
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Animation on scroll effect (similar to Footer implementation)
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

  // Mock categories for filter functionality
  const categories = ['all', 'facilities', 'equipment', 'team'];

  // Filter images by category (in a real app, this would use actual image categories)
  const filteredImages = images.filter(image => {
    if (activeCategory === 'all') return true;
    // Mock category assignment - in real app, use actual category data
    const mockCategoryMap = {
      facilities: [1, 4, 7],
      equipment: [2, 5, 8],
      team: [3, 6, 9]
    };
    return mockCategoryMap[activeCategory]?.includes(image.id);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header with gradient styling similar to Navbar */}
      <div className="text-center mb-12 animate-item">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Our Facility Gallery
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take a virtual tour of our modern healthcare facility, state-of-the-art equipment, and our dedicated team of medical professionals.
        </p>
      </div>
      
      {/* Filter buttons (similar to Navbar styling) */}
      <div className="flex flex-wrap justify-center mb-8 gap-2 animate-item">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 relative ${
              activeCategory === category 
                ? 'text-blue-600 font-medium' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            <div 
              className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-blue-100' 
                  : 'hover:bg-gray-100'
              }`}
            ></div>
            <span className="relative capitalize">{category}</span>
            {activeCategory === category && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>
      
      {loading ? (
        <div className="text-center py-16 animate-item">
          <div className="flex justify-center">
            <Loader className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
          <p className="mt-4 text-gray-600">Loading our gallery...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center space-x-3 animate-item">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <p>{error}</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-lg flex items-center space-x-3 animate-item">
          <Images className="h-6 w-6 text-yellow-500" />
          <p>No gallery images available in this category.</p>
        </div>
      ) : (
        <PhotoProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 animate-item`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PhotoView src={`${API_URL}${image.image_url}`}>
                  <div className="cursor-pointer aspect-[4/3] overflow-hidden">
                    <img
                      src={`${API_URL}${image.image_url}`}
                      alt={image.title || `Gallery image ${image.id}`}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Image details overlay (inspired by Footer hover effects) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {image.title && (
                        <h3 className="font-medium text-white text-lg">{image.title}</h3>
                      )}
                      {image.description && (
                        <p className="text-gray-200 text-sm mt-1">{image.description}</p>
                      )}
                    </div>
                  </div>
                </PhotoView>
              </div>
            ))}
          </div>
        </PhotoProvider>
      )}

      {/* Custom CSS for animations (similar to Footer) */}
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

export default Gallery;