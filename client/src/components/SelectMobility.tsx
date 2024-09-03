import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WheelPicker from 'react-wheelpicker';
import styled from 'styled-components';

const Colum = styled.div`
  width: 200 px;
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



const mobilityOptions = ["Cannot leave house", "Short walk", "Able to use public transport"];
const sendOptions = ["Low","Moderate","High"];
const SelectMobility = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nric } = location.state as { nric: string };

  const [mobility, setMobility] = useState<string | null>(null);

  const handleNext = async () => {
    if (!mobility) {
      alert("Please select your mobility status.");
      return;
    }

    // Save mobility status in the database or local storage
    try {
      const response = await fetch('/api/save_mobility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nric,
          mobility,
        }),
      });

      if (response.ok) {
        navigate('/input-loved-ones', { state: { nric } });
      } else {
        alert('Failed to save mobility status. Please try again.');
      }
    } catch (error) {
      console.error('Error saving mobility status:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Select Your Mobility Status</h1>

      <div className="d-flex justify-content-center">
        <Colum>
          <WheelPicker
            animation="flat"
            data={mobilityOptions}
            height={40}
            parentHeight={135}
            fontSize={16} // Larger font size for better readability
            defaultSelection={1}
            updateSelection={(selectedOption) => setMobility(sendOptions[selectedOption])}
            scrollerId="scroll-select-mobility"
          />
        </Colum>
      </div>

      <div className="text-center mt-4">
        <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectMobility;
