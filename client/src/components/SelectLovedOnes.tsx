import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WheelPicker from 'react-wheelpicker';

const numLovedOptions = ['0','1','2','3','3+'];
const visitFrequencyOptions = ["Living with", "Daily", "Weekly", "Monthly", "Never"];

const InputLovedOnes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nric } = location.state as { nric: string };

  const [lovedOnes, setLovedOnes] = useState<string | null>(null);
  const [visitFrequency, setVisitFrequency] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!lovedOnes || !visitFrequency) {
      alert("Please provide all required information.");
      return;
    }

    // Save loved ones and visit frequency in the database or local storage
    try {
      const response = await fetch('/api/save_loved_ones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nric,
          lovedOnes,
          visitFrequency,
        }),
      });

      if (response.ok) {
        navigate('/mainpage-ben');
      } else {
        alert('Failed to save information. Please try again.');
      }
    } catch (error) {
      console.error('Error saving loved ones and visit frequency:', error);
    }
  };

  return (
    <div>
      <h1>Input Number of Loved Ones Caring for You</h1>
      <WheelPicker
        animation='flat'
        data={numLovedOptions}
        height={40}
        parentHeight={150}
        fontSize={13}
        defaultSelection={0}
        updateSelection={(selectedOption) => setLovedOnes(numLovedOptions[selectedOption])}
        scrollerId='scroll-select-num'
      />
      <h2>How Often Do They Visit You?</h2>
      <WheelPicker
        animation='flat'
        data={visitFrequencyOptions}
        height={40}
        parentHeight={150}
        fontSize={13}
        defaultSelection={0}
        updateSelection={(selectedOption) => setVisitFrequency(visitFrequencyOptions[selectedOption])}
        scrollerId='scroll-select-loved'
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InputLovedOnes;
