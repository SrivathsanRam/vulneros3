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



const SingPassMain = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/mockpassconnector');
    };

    return (
        <MDBContainer 
        fluid
        style={{
          backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/Others/images/76.webp')",
          height: "100vh",
          opacity: "100%"
        }}
        >
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            
            <MDBCol col='12'>
              <h1 className='text-center'>Find your community</h1>
              
    
              <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                    <MDBBtn 
                    style={{ width: '400px', height: '50px', transition: 'all 0.2s ease-in-out', boxSizing: 'border-box' }}
                    onClick={handleButtonClick} 
                    className="btn btn-danger mb-4" 
                    size='lg'>
                    Login with Singpass
                  </MDBBtn>

                  <text className='mb-4 text-muted text-center'>or Login with</text>
    
                  <MDBInput wrapperClass='mb-4 w-100' label='Email/NRIC/Mobile' id='formControlLg' type='email' size="lg"/>
                  <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>
    
                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
                  <MDBBtn 
                    style={{ width: '400px', height: '50px', transition: 'all 0.2s ease-in-out', boxSizing: 'border-box' }}
                    onClick={handleButtonClick} 
                    className="btn btn-danger mb-4" 
                    size='lg'>
                    Login
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
    }
export default SingPassMain;