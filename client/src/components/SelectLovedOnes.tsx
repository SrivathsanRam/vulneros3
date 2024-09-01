import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WheelPicker from 'react-wheelpicker';

const visitFrequencyOptions = ["Living with", "Daily", "Weekly", "Monthly", "Never"];

const InputLovedOnes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nric } = location.state as { nric: string };

  const [lovedOnes, setLovedOnes] = useState<number>(0);
  const [visitFrequency, setVisitFrequency] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (lovedOnes < 0 || !visitFrequency) {
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
        navigate('/beneficiary-main');
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
      <input
        type="number"
        min={0}
        value={lovedOnes}
        onChange={(e) => setLovedOnes(parseInt(e.target.value))}
      />
      <h2>How Often Do They Visit You?</h2>
      <WheelPicker
        data={visitFrequencyOptions}
        onChange={(selectedOption) => setVisitFrequency(selectedOption)}
        height={150}
        width={200}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InputLovedOnes;
