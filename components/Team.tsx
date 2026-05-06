import React, { useState, useEffect } from 'react';
import { PRIMARY_COLOR } from '../constants';
import { api } from '../services/apiService';
import { TeamMember } from '../types';

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FALLBACK_MEMBERS: TeamMember[] = [
    { imgSrc: "/assets/merch/img/team/Leon Nyang' Odour.jpg", name: 'Leon Odour Nyang', role: 'Founder & CEO', social_twitter: '', social_facebook: '', social_linkedin: '' },
    { imgSrc: "/assets/merch/img/team/keng'aya Caroline Bosire.jpg", name: "Keng'aya Caroline Bosire", role: 'Head of Program', social_twitter: '', social_facebook: '', social_linkedin: '' },
    { imgSrc: '/assets/merch/img/team/Elizabeth Maina.jpg', name: 'Elizabeth Maina', role: 'Community Manager', social_twitter: '', social_facebook: '', social_linkedin: '' },
  ];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await api.getTeamMembers();
        if (Array.isArray(data) && data.length > 0) {
          setMembers(data);
        } else {
          console.warn('Team API returned no members, using fallback content.');
          setMembers(FALLBACK_MEMBERS);
        }
      } catch (err) {
        console.error(err);
        // Use fallback content when API fails to improve UX
        setMembers(FALLBACK_MEMBERS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase font-montserrat" style={{ color: PRIMARY_COLOR }}>Our Amazing Team</h2>
          <h3 className="text-md md:text-lg text-gray-500 italic mt-2">Meet the people making a difference.</h3>
        </div>
        {loading && <div className="text-center"><p>Loading team...</p></div>}
        {error && <div className="text-center"><p className="text-red-500">{error}</p></div>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
              {members.map((member, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <img src={member.imgSrc} alt={member.name} className="w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 mx-auto rounded-full object-cover border-4 border-gray-200 shadow-lg" />
                  <h4 className="text-base sm:text-lg md:text-xl font-bold mt-4 sm:mt-6 mb-1 font-montserrat text-white">{member.name}</h4>
                  <p className="text-slate-400 mb-4 text-xs sm:text-sm">{member.role}</p>
                  <div className="flex justify-center space-x-3">
                    {member.social_twitter && <a href={member.social_twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"><i className="fab fa-twitter"></i></a>}
                    {member.social_facebook && <a href={member.social_facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"><i className="fab fa-facebook-f"></i></a>}
                    {member.social_linkedin && <a href={member.social_linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"><i className="fab fa-linkedin-in"></i></a>}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-16 max-w-3xl mx-auto">
              <p className="text-md md:text-lg text-gray-600 italic">"To emphasize the importance of mental well-being in achieving optimal athletic performance, encapsulated in our motto."</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Team;
