import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WheelPicker from 'react-wheelpicker';
import styled from 'styled-components';

const Colum = styled.div`
  width: 160px;
  box-sizing: border-box;
  height: auto;
  height: 135px;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

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
        navigate('/onboarded');
      } else {
        alert('Failed to save information. Please try again.');
      }
    } catch (error) {
      console.error('Error saving loved ones and visit frequency:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Input Number of Loved Ones Caring for You</h1>
      
      <div className="d-flex justify-content-center">
        <Colum>
          <WheelPicker
            animation="flat"
            data={numLovedOptions}
            height={40}
            parentHeight={135}
            fontSize={16} // Slightly larger font for readability
            defaultSelection={0}
            updateSelection={(selectedOption) => setLovedOnes(numLovedOptions[selectedOption])}
            scrollerId="scroll-select-num"
            
          />
        </Colum>
      </div>

      <h2 className="text-center mt-4">How Often Do They Visit You?</h2>
      
      <div className="d-flex justify-content-center mt-4">
        <Colum>
          <WheelPicker
            animation="flat"
            data={visitFrequencyOptions}
            height={40}
            parentHeight={135}
            fontSize={16} // Larger font size for better readability
            defaultSelection={0}
            updateSelection={(selectedOption) => setVisitFrequency(visitFrequencyOptions[selectedOption])}
            scrollerId="scroll-select-loved"
            
          />
        </Colum>
      </div>

      <div className="text-center mt-5">
        <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputLovedOnes;
