import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

const Logo = ({ logoUrl }: { logoUrl?: string }) => {
  if (logoUrl) {
    return <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />;
  }

  return (
    <svg width="40" height="40" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M105 200C157.467 200 200 157.467 200 105C200 52.5329 157.467 10 105 10C52.5329 10 10 52.5329 10 105C10 157.467 52.5329 200 105 200Z" stroke="#5aace6" strokeWidth="20" />
      <path d="M70 140C83.8071 140 95 128.807 95 115C95 101.193 83.8071 90 70 90C56.1929 90 45 101.193 45 115C45 128.807 56.1929 140 70 140Z" stroke="#5aace6" strokeWidth="16" />
      <path d="M140 95C153.807 95 165 83.8071 165 70C165 56.1929 153.807 45 140 45C126.193 45 115 56.1929 115 70C115 83.8071 126.193 95 140 95Z" stroke="#5aace6" strokeWidth="16" />
    </svg>
  );
};


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const observer = useRef<IntersectionObserver | null>(null);
  const { itemCount, setIsCartOpen } = useCart();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.current?.observe(section));

    return () => observer.current?.disconnect();
  }, []);

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const isHomePage = location.pathname === '/';

  const navLinkClasses = (href: string) => {
    const isActive = isHomePage && `#${activeSection}` === href;
    return `relative text-sm font-medium tracking-wide uppercase px-1 py-2 group transition-colors duration-300 ${isActive ? 'text-primary' : 'text-slate-300 hover:text-white'}`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-4 px-4 ${isScrolled ? 'translate-y-0' : 'translate-y-0'}`}>
      <div className={`mx-auto max-w-7xl transition-all duration-500 ${isScrolled ? 'glass-panel shadow-2xl shadow-primary/5 rounded-full px-6 py-3' : 'bg-transparent py-4'}`}>
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 text-xl md:text-2xl font-heading font-bold uppercase tracking-widest text-white transition-transform duration-300 hover:scale-105 group">
            <div className="group-hover:animate-glow rounded-full transition-all">
              <Logo logoUrl={settings.site_logo} />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">MindStrong</span>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => {
                e.preventDefault();
                const sectionId = link.href.replace('#', '');
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }} className={navLinkClasses(link.href)}>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            <div className="flex items-center gap-6 pl-6 border-l border-slate-700">
              <button onClick={() => setIsCartOpen(true)} className="relative text-slate-300 hover:text-white transition-colors duration-300 group p-2">
                <i className="fas fa-shopping-cart text-lg group-hover:scale-110 transition-transform"></i>
                {itemCount > 0 && <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-accent text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg shadow-accent/50 animate-pulse-slow">{itemCount}</span>}
              </button>

              <Link to="/admin-login" className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-all duration-300 px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(90,172,230,0.1)] hover:shadow-[0_0_20px_rgba(90,172,230,0.4)]">
                <i className="fas fa-lock text-xs"></i><span>Login</span>
              </Link>
            </div>
          </div>
          
          <div className="lg:hidden flex items-center gap-5">
            <button onClick={() => setIsCartOpen(true)} className="relative text-white hover:text-primary transition-colors">
              <i className="fas fa-shopping-cart text-xl"></i>
              {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg">{itemCount}</span>}
            </button>

            <Link to="/admin-login" className="text-primary text-sm font-bold flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20">
              <i className="fas fa-lock"></i>
            </Link>
            
            <button className="text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div className={`lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 z-40 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}></div>
      
      {/* Mobile Menu Drawer */}
      <div className={`lg:hidden fixed top-0 right-0 w-[80%] max-w-sm h-full glass-panel border-l border-white/10 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 flex flex-col`}>
        <div className="flex justify-end p-6 border-b border-white/10">
          <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-primary transition-colors">
            <i className="fas fa-times text-3xl"></i>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
          {NAV_LINKS.map((link, i) => (
            <a key={link.label} href={link.href} style={{ transitionDelay: `${i * 50}ms` }} onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const sectionId = link.href.replace('#', '');
              setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
            }} className={`text-white text-2xl font-heading font-bold hover:text-primary transition-all duration-300 uppercase transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="p-6 border-t border-white/10">
          <Link to="/admin-login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-primary text-white font-bold uppercase tracking-wider shadow-lg shadow-primary/30">
            <i className="fas fa-lock"></i> Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;