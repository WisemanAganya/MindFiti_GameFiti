import React, { useState, useEffect } from 'react';
import { api } from '../services/apiService';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [contactEmail, setContactEmail] = useState('info@projectmindstrong.com');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await api.getSettings();
        if (settings.contact_email) {
          setContactEmail(settings.contact_email);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    try {
      await api.submitContactForm(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);

    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 bg-neutral-800 bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(33,37,41,0.85), rgba(33,37,41,0.85)), url('https://images.unsplash.com/photo-1584964221834-0a52d35639a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920')" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase text-white font-montserrat">Contact Us</h2>
          <h3 className="text-md md:text-lg text-neutral-300 italic mt-2">
            <a href={`mailto:${contactEmail}`} className="hover:text-primary transition-colors">{contactEmail}</a>
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input 
                className="w-full p-4 bg-neutral-100 text-neutral-800 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition disabled:bg-neutral-200" 
                id="name" 
                type="text" 
                placeholder="Your Name *" 
                required 
                value={formData.name}
                onChange={handleChange}
                disabled={submitStatus === 'submitting'}
              />
              <input 
                className="w-full p-4 bg-neutral-100 text-neutral-800 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition disabled:bg-neutral-200" 
                id="email" 
                type="email" 
                placeholder="Your Email *" 
                required 
                value={formData.email}
                onChange={handleChange}
                disabled={submitStatus === 'submitting'}
              />
            <div className="md:col-span-2">
              <input 
                className="w-full p-4 bg-neutral-100 text-neutral-800 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition disabled:bg-neutral-200" 
                id="phone" 
                type="tel" 
                placeholder="Your Phone" 
                value={formData.phone}
                onChange={handleChange}
                disabled={submitStatus === 'submitting'}
              />
            </div>
            <div className="md:col-span-2">
              <textarea 
                className="w-full p-4 bg-neutral-100 text-neutral-800 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition disabled:bg-neutral-200" 
                id="message" 
                placeholder="Your Message *" 
                rows={6} 
                required
                value={formData.message}
                onChange={handleChange}
                disabled={submitStatus === 'submitting'}
              ></textarea>
            </div>
          </div>
          <div className="text-center">
            <button 
              className="bg-primary hover:bg-opacity-80 text-white font-bold uppercase text-lg py-4 px-10 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:transform-none"
              type="submit"
              disabled={submitStatus === 'submitting'}
            >
              {submitStatus === 'submitting' ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-3"></i>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </div>
          
          {submitStatus === 'success' && (
            <div className="mt-6 text-center text-white bg-green-500/90 p-4 rounded-lg animate-fade-in">
              <p className="font-bold">Message Sent!</p>
              <p>Thank you for reaching out. We'll get back to you soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-6 text-center text-white bg-red-500/90 p-4 rounded-lg animate-fade-in">
              <p className="font-bold">Something went wrong!</p>
              <p>Please try again later or email us directly.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
