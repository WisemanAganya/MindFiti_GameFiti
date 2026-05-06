import React, { useState, useEffect } from 'react';
import { api } from '../services/apiService';
import { Service } from '../types';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FALLBACK_SERVICES: Service[] = [
    { imgSrc: '/assets/merch/img/services/one-on-one.jpg', title: 'Consultation', description: 'One-on-one mental performance consultations for athletes and coaches.', icon: 'fa-comments' },
    { imgSrc: '/assets/merch/img/services/commmentorship.jpg', title: 'Workshops', description: 'Group workshops on mental resilience and concussion awareness.', icon: 'fa-users' },
    { imgSrc: '/assets/merch/img/services/worskshop.jpg', title: 'E-learning', description: 'Online courses and resources for athletes and support staff.', icon: 'fa-laptop' },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        } else {
          console.warn('Services API returned no entries, using fallback content.');
          setServices(FALLBACK_SERVICES);
        }
      } catch (err) {
        console.error(err);
        // Provide fallback services so the page is usable without backend
        setServices(FALLBACK_SERVICES);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase font-montserrat text-primary">Services</h2>
          <h3 className="text-md md:text-lg text-neutral-500 italic mt-2">MindFitiGameFiti</h3>
        </div>
        {loading && <div className="text-center"><p>Loading services...</p></div>}
        {error && <div className="text-center"><p className="text-red-500">{error}</p></div>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 bg-white rounded-2xl hover:shadow-xl border border-transparent hover:border-gray-100 group">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500"></div>
                  <img src={service.imgSrc} alt={service.title} className="relative z-10 rounded-full w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 object-cover shadow-lg border-4 border-white group-hover:border-primary/20 transition-colors duration-300" />
                  {service.icon && (
                    <div className="absolute bottom-0 right-0 bg-white text-primary w-10 h-10 flex items-center justify-center rounded-full shadow-md z-20 border border-gray-100">
                      <i className={`fas ${service.icon}`}></i>
                    </div>
                  )}
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 font-montserrat text-white group-hover:text-primary transition-colors">{service.title}</h4>
                <p className="text-slate-400 leading-relaxed text-xs sm:text-sm md:text-base max-w-xs">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
