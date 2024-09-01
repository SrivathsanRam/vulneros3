
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingPassDetails = () => {
  const [nric, setNric] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nric }),
      });

      const data = await response.json();

      if (data.verified) {
        navigate('/mainpage');
      } else {
        setError('Invalid UserID. Please try again.');
      }
    } catch (error) {
      setError(`Error verifying UserID.${error}`);
    }
  };

  return (
    <div>
      <h1>Login with Singpass</h1>
      <label>
        Enter UserID:
        <input 
          type="text" 
          value={nric} 
          onChange={(e) => setNric(e.target.value)} 
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SingPassDetails;