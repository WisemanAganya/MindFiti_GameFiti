import React, { useState, useEffect } from 'react';
import { PRIMARY_COLOR, ACCENT_YELLOW } from '../constants';
import { api } from '../services/apiService';
import { TimelineEvent } from '../types';

const About = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    heading: 'Our Journey',
    text: 'The Story of #MindFitiGameFiti'
  });

  const FALLBACK_EVENTS: TimelineEvent[] = [
    {
      imgSrc: '/assets/merch/img/about/IMG-20250520-WA0006.jpg',
      period: '2019 – 2020',
      title: 'The Spark',
      description: 'After sustaining multiple concussions, our founder began publicly speaking about mental health in sports.'
    },
    {
      imgSrc: '/assets/merch/img/about/IMG-20250520-WA0010.jpg',
      period: '2020 – 2021',
      title: 'Building Community',
      description: 'Launched #MindFitiGameFiti movement with first cohort of athletes, coaches, and mental health advocates.'
    },
    {
      imgSrc: '/assets/merch/img/about/IMG-20250520-WA0011.jpg',
      period: '2022 – 2023',
      title: 'Recognition & Expansion',
      description: 'Gaining national attention with the Tujiamini Silver Award, expanded outreach with mentorship programs.'
    },
    {
      imgSrc: '/assets/merch/img/about/IMG-20250520-WA0007.jpg',
      period: '2024 – Present',
      title: 'Digital Growth',
      description: 'Strategic partnerships to integrate mental wellness into sports institutions, plus e-learning platform and podcast.'
    }
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [eventsData, settingsData] = await Promise.all([
          api.getTimelineEvents().catch(() => null),
          api.getSettings().catch(() => ({}))
        ]);

        if (Array.isArray(eventsData) && eventsData.length > 0) {
          setEvents(eventsData);
        } else {
          setEvents(FALLBACK_EVENTS);
        }

        setSettings({
          heading: settingsData.about_heading || 'Our Journey',
          text: settingsData.about_text || 'The Story of #MindFitiGameFiti'
        });

      } catch (err) {
        console.error(err);
        setEvents(FALLBACK_EVENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="about" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase font-montserrat" style={{ color: PRIMARY_COLOR }}>{settings.heading}</h2>
          <h3 className="text-base md:text-lg text-gray-500 italic mt-2">{settings.text}</h3>
        </div>

        {loading && <div className="text-center py-12"><p className="text-lg text-gray-600">⏳ Loading our journey...</p></div>}
        {!loading && (
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[20%] left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {events.map((event, index) => (
                <div key={index} className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">

                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img src={event.imgSrc} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm shadow-sm">{event.period}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative">
                    {/* Number Badge */}
                    <div className="absolute -top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-primary border border-gray-100 z-10">
                      {index + 1}
                    </div>

                    <h3 className="text-lg font-bold font-montserrat mb-3 text-white leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">{event.description}</p>

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform inline-block">Read more &rarr;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12 md:mt-20">
          <div className="inline-block p-6 md:p-8 rounded-lg shadow-lg" style={{ backgroundColor: ACCENT_YELLOW }}>
            <h4 className="text-white text-center font-bold font-montserrat text-xl md:text-2xl leading-tight">Be Part Of Our Story!</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
