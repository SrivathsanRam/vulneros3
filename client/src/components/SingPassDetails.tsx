
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

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
    <MDBContainer 
    fluid
    style={{
      backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/Others/images/76.webp')",
      height: "100vh",
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }}
    >
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
        <h1 className='text-center'>Find your community</h1>
          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h3 className='mb-4'>Log In</h3>

              

              <MDBInput 
              wrapperClass='mb-4 w-100' 
              label='Singpass ID'
              type="text" 
              value={nric} 
              onChange={(e) => setNric(e.target.value)}
              size="lg"
              />
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn 
                style={{ width: '400px', height: '50px', transition: 'all 0.2s ease-in-out', boxSizing: 'border-box' }}
                onClick={handleSubmit} 
                className="btn btn-danger mb-4" 
                size='lg'>
                Login
              </MDBBtn>
              {error && <p style={{ color: 'red' }}>{error}</p>}

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );





  {/*return (
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
  );*/}


};

export default SingPassDetails;