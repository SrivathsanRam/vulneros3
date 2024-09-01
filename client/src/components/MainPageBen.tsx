import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import SideNavigator from './widgets/SideNav';
import Footer from './footer';
import {LearnCard} from './Catogory_cards';
import {CommunityCard} from './Catogory_cards';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


//beneficiary data
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

const MainPageBen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const beneficiary: Beneficiary = location.state.beneficiary;
  useEffect(() => {
    if (!beneficiary.languages || !beneficiary.mobility) {
      navigate('/select-languages', { state: { nric: beneficiary.nric } });
    }
  }, [beneficiary, navigate]);

  console.log(JSON.stringify(beneficiary))


  return (
    <>
    <SideNavigator></SideNavigator>
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome, {beneficiary.name}!</h1>
      <p><strong>NRIC:</strong> {beneficiary.nric}</p>
      <p><strong>Address:</strong> {beneficiary.address}</p>
      <p><strong>Languages:</strong> {beneficiary.languages.join(', ')}</p>
      <h2><strong>What would you like to do?</strong></h2>
    </div>
    <Box  sx={{  
    display: 'flex', 
    justifyContent: 'center', 
  }}>
      <Grid container spacing={10}>
        <Grid>
          <LearnCard></LearnCard>
        </Grid>
        <Grid>
          <CommunityCard></CommunityCard>
        </Grid>
        <Grid>
        </Grid>
      </Grid>
    </Box>
    <Footer></Footer>
    </>
  );
};

export default MainPageBen;