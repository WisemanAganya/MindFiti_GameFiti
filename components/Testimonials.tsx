import React, { useState, useEffect } from 'react';
import { api } from '../services/apiService';
import { Testimonial } from '../types';
import { PRIMARY_COLOR } from '../constants';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FALLBACK_TESTIMONIALS: Testimonial[] = [
    {
      imgSrc: '/assets/merch/img/portfolio/pic 1.PNG', // Athlete 1
      name: 'Alex Rivera',
      quote: 'Mindstrong helped me build small but powerful daily habits. Their resources are approachable and kind.'
    },
    {
      imgSrc: '/assets/merch/img/portfolio/pic 3.PNG', // Athlete 2
      name: 'Jessie Kim',
      quote: 'The community is supportive and the guided moments have been a huge help in managing stress.'
    },
    {
      imgSrc: '/assets/merch/img/portfolio/pic 2.PNG', // Athlete 3
      name: 'Sam O\'Neill',
      quote: 'Practical, compassionate, and research-informed — exactly what I was looking for.'
    }
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.getTestimonials();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          console.warn('Testimonials API returned no items, using fallback testimonials.');
          setTestimonials(FALLBACK_TESTIMONIALS);
        }
      } catch (err) {
        console.error(err);
        setError(null);
        setTestimonials(FALLBACK_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase font-montserrat" style={{ color: PRIMARY_COLOR }}>Testimonials</h2>
          <h3 className="text-base md:text-lg text-gray-500 italic mt-2">Hear from our community.</h3>
        </div>
        {loading && <div className="text-center py-12"><p className="text-lg text-gray-600">⏳ Loading testimonials...</p></div>}
        {error && <div className="text-center py-12"><p className="text-lg text-red-500">❌ {error}</p></div>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary/10 group-hover:bg-primary transition-colors duration-300"></div>

                  <div className="flex items-center gap-4 mb-4 pl-4">
                    <div className="relative">
                      <img src={testimonial.imgSrc} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full border-2 border-white p-0.5">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white font-montserrat text-sm">{testimonial.name}</h4>
                      <div className="flex text-yellow-400 text-xs mt-0.5">
                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                      </div>
                    </div>
                    <div className="ml-auto text-primary/20 text-4xl font-serif">"</div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed italic pl-4 flex-grow">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10 md:mt-14">
              <p className="text-gray-600 text-sm md:text-lg mb-4">Join our growing community of athletes and wellness enthusiasts! 🌟</p>
              <button className="inline-block px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold text-white transition-all duration-300 hover:scale-110 transform hover:shadow-lg text-sm md:text-base" style={{ backgroundColor: PRIMARY_COLOR }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Share Your Story
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
