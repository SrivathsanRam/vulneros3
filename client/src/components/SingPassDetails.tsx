
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingPassDetails = () => {
  type Volunteer = {
    nric: string;
    name: string;
    address: number;
    certifications: Map<string, string>;
    languages: string[];
  };

  type Beneficiary = {
    nric: string,
    name: string,
    sex: string,
    dob: string,
    address: number,
    languages: string[],
    vul_score: number,
    mobility: string,
    preferences: string[],

  }
  

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
      
      if (data && data.type == 'volunteer') {
        const volunteer: Volunteer = {
          nric: data.NRIC,
          name: data.name,
          address: data.address,
          certifications: data.certifications,
          languages: data.languages.Languages,
        };
        navigate('/mainpage-vol', {state: {volunteer}});
      } else if (data && data.type == 'beneficiary'){
        const beneficiary: Beneficiary = {
          nric: data.NRIC,
          name: data.name,
          sex: data.sex,
          dob: data.dob,
          address: data.address,
          languages: data.languages.Languages,
          vul_score: data.vul_score,
          mobility: data.mobility,
          preferences: data.preferences
        };
        navigate('/mainpage-ben', {state: {beneficiary}});
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
        Enter NRIC:
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