import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WheelPicker from 'react-wheelpicker';
import styled from 'styled-components';

const Colum = styled.div`
  width: 45px;
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
    <div>
      <h1>Select Your Mobility Status</h1>
      <Colum style={{width: 300}}>
      <WheelPicker
        animation='flat'
        data={mobilityOptions}
        height={40}
        parentHeight={150}
        fontSize={13}
        defaultSelection={1}
        updateSelection={(selectedOption) => setMobility(sendOptions[selectedOption])}
        scrollerId="scroll-select-mobility"
      />
      </Colum>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SelectMobility;
