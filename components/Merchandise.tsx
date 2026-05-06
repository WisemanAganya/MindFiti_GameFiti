import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_COLOR } from '../constants';
import { MerchandiseItem } from '../types';
import { api } from '../services/apiService';
import { useCart } from '../context/CartContext';

interface MerchandiseCardProps {
  item: MerchandiseItem;
}

const MerchandiseCard: React.FC<MerchandiseCardProps> = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? item.images.length - 1 : currentIndex - 1);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(currentIndex === item.images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100 overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={item.images && item.images[currentIndex] ? item.images[currentIndex] : 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'}
          alt={item.title}
          className="w-full h-full object-contain p-4 mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Slider Controls */}
        {item.images && item.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"><i className="fas fa-chevron-left text-xs"></i></button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"><i className="fas fa-chevron-right text-xs"></i></button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {item.images.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-3' : 'bg-gray-300'}`} />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-3 right-3">
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">In Stock</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-base font-bold font-montserrat text-gray-800 leading-tight mb-1 line-clamp-2 min-h-[2.5rem]">{item.title}</h4>
            {item.sku && <p className="text-[10px] text-gray-400 font-mono tracking-wide">{item.sku}</p>}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 min-h-[3em]">{item.description}</p>

        {item.sizes && item.sizes.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {item.sizes.map(size => (
                <span key={size} className="border border-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md hover:border-primary hover:text-primary transition-colors cursor-default">{size}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-gray-50">
          <div className="text-lg font-bold text-gray-900">
            {item.currency ? new Intl.NumberFormat(undefined, { style: 'currency', currency: item.currency }).format(item.price || 0) : `$${(item.price || 0).toFixed(2)}`}
          </div>
          <button
            onClick={() => addToCart(item)}
            className="bg-primary hover:bg-sky-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 flex items-center gap-2"
          >
            Add to Cart <i className="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Merchandise = () => {
  const [items, setItems] = useState<MerchandiseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FALLBACK_ITEMS: MerchandiseItem[] = [
    {
      id: 1,
      images: ['/assets/merch/img/portfolio/3.jpg'],
      title: 'Mindstrong Classic T-Shirt',
      description: 'A comfortable, ethically sourced tee featuring our logo. Soft cotton blend, available in multiple sizes.',
      price: 24.99,
      currency: 'USD',
      sizes: ['S', 'M', 'L', 'XL'],
      sku: 'MSHIRT-001'
    },
    {
      id: 2,
      images: ['/assets/merch/img/portfolio/2.jpg'],
      title: 'Mindstrong Hoodie',
      description: 'Cozy pullover hoodie with embroidered logo — perfect for cool evenings and mindful walks.',
      price: 49.99,
      currency: 'USD',
      sizes: ['S', 'M', 'L', 'XL'],
      sku: 'MHOOD-002'
    },
    {
      id: 3,
      images: ['/assets/merch/img/portfolio/IMG-20250516-WA0006.jpg'],
      title: 'Mindful Mug',
      description: 'Ceramic mug with our signature quote. Microwave and dishwasher safe.',
      price: 12.5,
      currency: 'USD',
      sizes: [],
      sku: 'MMUG-003'
    }
  ];

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const data = await api.getMerchandise();
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          console.warn('Merchandise API returned no items, using fallback content.');
          setItems(FALLBACK_ITEMS);
        }
      } catch (err) {
        console.error(err);
        setError(null);
        setItems(FALLBACK_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchandise();
  }, []);

  return (
    <section id="merchandise" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase font-montserrat" style={{ color: PRIMARY_COLOR }}>Merchandise</h2>
          <h3 className="text-base md:text-lg text-gray-500 italic mt-2">Support the movement — shop now!</h3>
        </div>
        {loading && <div className="text-center"><p>Loading merchandise...</p></div>}
        {error && <div className="text-center"><p className="text-red-500">{error}</p></div>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {items.map((item, index) => (
              <MerchandiseCard key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Merchandise;
