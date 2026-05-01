import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
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


const Footer = () => {
  const location = useLocation();
  const { settings } = useSettings();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <Logo logoUrl={settings.site_logo} />
              <span className="text-2xl font-bold font-heading uppercase text-white tracking-widest">Project MindStrong</span>
            </div>
            <p className="text-slate-400 leading-relaxed pr-8 mb-8">Championing mental wellness for athletes through advocacy, mentorship, and community. <span className="text-primary font-medium block mt-2">#MindFitiGameFiti</span></p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/project.mindstrong?utm_source=qr&igsh=MXdlOGt2Y3o3ZmtqdQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 bg-slate-850 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(90,172,230,0.3)] transition-all duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://www.tiktok.com/@mindfitigamefiti?_r=1&_t=ZM-92x7lwwZJDH" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-12 h-12 bg-slate-850 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(90,172,230,0.3)] transition-all duration-300">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const sectionId = link.href.replace('#', '');
                      const el = document.getElementById(sectionId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-slate-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="text-slate-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-slate-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">Stay Connected</h4>
            <p className="text-slate-400 leading-relaxed mb-6">Subscribe to our newsletter for the latest updates and stories.</p>
            <form className="relative max-w-sm">
              <input type="email" placeholder="Enter your email" className="w-full pl-6 pr-16 py-4 bg-slate-850 border border-slate-700 rounded-full focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-200 placeholder-slate-500 transition-all outline-none" required />
              <button type="submit" className="absolute right-2 top-2 bottom-2 bg-primary text-white font-bold w-12 rounded-full hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(90,172,230,0.4)] transition-all duration-300 flex items-center justify-center">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">Copyright &copy; {new Date().getFullYear()} Project MindStrong. All Rights Reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <span className="hover:text-primary transition-colors cursor-pointer">Design Perfected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;