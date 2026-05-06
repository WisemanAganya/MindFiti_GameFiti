import React from 'react';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../constants';
import { api } from '../services/apiService';

const Hero = () => {
  const [settings, setSettings] = React.useState({
    bgImage: "/assets/merch/img/theme photo.jpg",
    title: "The Balls To Make \nA Difference",
    subtitle: "#MindFitiGameFiti"
  });

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(prev => ({
          bgImage: data.hero_bg_image || prev.bgImage,
          title: data.hero_title || prev.title,
          subtitle: data.hero_subtitle || prev.subtitle
        }));
      } catch (e) {
        console.error("Failed to load hero settings", e);
      }
    };
    loadSettings();
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to safely render newlines in the title
  const renderTitle = (titleText: string) => {
    return titleText.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {i === titleText.split('\n').length - 1 && titleText.split('\n').length > 1 ? (
          <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">{line}</span>
        ) : (
          line
        )}
      </React.Fragment>
    ));
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-110 ease-out"
        style={{ backgroundImage: `url('${settings.bgImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 mix-blend-overlay" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 text-primary mb-8 shadow-[0_0_20px_rgba(90,172,230,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Welcome To Project MindStrong</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 tracking-tight drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {renderTitle(settings.title)}
        </h1>

        <h3 className="text-xl md:text-2xl font-bold italic mb-12 text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <span className="text-accent drop-shadow-[0_0_10px_rgba(255,60,60,0.3)]">{settings.subtitle}</span>
        </h3>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <button
            onClick={scrollToServices}
            className="group relative inline-flex items-center justify-center font-heading uppercase text-sm font-bold tracking-widest py-4 px-10 rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(90,172,230,0.6)]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-blue-600"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-10 group-hover:rotate-90"></span>
            <span className="relative text-white flex items-center gap-3">
              Tell Me More <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </span>
          </button>
        </div>
      </div>
      
      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>
    </header>
  );
};

export default Hero;