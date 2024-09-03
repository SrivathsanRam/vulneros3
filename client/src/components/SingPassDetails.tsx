
import { SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { Button, Modal } from 'react-bootstrap';

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
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (location.state && location.state.from === 'input-loved-ones') {
      setShowModal(true); // Show the modal
    }
  }, [location]);

  const handleClose = () => setShowModal(!showModal);

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
    <MDBContainer fluid>
        <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Successfully Onboarded</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

          <MDBRow className='d-flex justify-content-center align-items-center h-100 bg-light'>
            <MDBCol col='12'>
    
              <MDBCard className='bg-white my-3 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                  <img className='rounded mb-3' src='vulneros_logo_1.png'></img>
                    
                  <MDBInput wrapperClass='mb-4 w-100' label='NRIC' id='formControlLg' type='email' size="lg" value={nric} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setNric(e.target.value)} />
                  <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>
    
                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
                  <MDBBtn 
                    style={{ width: '400px', height: '50px', transition: 'all 0.2s ease-in-out', boxSizing: 'border-box' }}
                    onClick={handleSubmit} 
                    className="btn btn-danger mb-4" 
                    size='lg'>
                    Login With Singpass
                  </MDBBtn>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
};

export default SingPassDetails;