
import React, { useState } from 'react';
import { generateMindfulMoment } from '../services/geminiService';
import { PRIMARY_COLOR } from '../constants';

const MindfulMoment = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      const generatedMessage = await generateMindfulMoment();
      setMessage(generatedMessage);
    } catch (err: any) {
      setError(err.message || 'Failed to generate message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="mindful-moment" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat" style={{ color: PRIMARY_COLOR }}>
          Take a Mindful Moment
        </h2>
        <p className="text-gray-600 mb-8">
          In the midst of challenges, a moment of clarity can make all the difference. Click the button below for a short, encouraging message to help you refocus and find your strength.
        </p>
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="text-white font-bold py-3 px-8 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
          style={{ backgroundColor: PRIMARY_COLOR }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a8dc4'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Generating...
            </>
          ) : (
            'Get an Encouraging Message'
          )}
        </button>

        {message && (
          <div className="mt-8 p-6 rounded-r-lg shadow-md" style={{ backgroundColor: `${PRIMARY_COLOR}1a`, borderLeft: `4px solid ${PRIMARY_COLOR}`, color: PRIMARY_COLOR }}>
            <p className="text-lg italic">{message}</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MindfulMoment;