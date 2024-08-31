import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingPassDetails = () => {
  const [userID, setUserID] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify', { userID });
      if (response.data.verified) {
        navigate('/main');
      } else {
        setError('Invalid UserID. Please try again.');
      }
    } catch (error) {
      setError(`Error verifying UserID. ${error}`);
    }
  };

  return (
    <div>
      <h1>Page 2</h1>
      <label>
        Enter UserID:
        <input 
          type="text" 
          value={userID} 
          onChange={(e) => setUserID(e.target.value)} 
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SingPassDetails;