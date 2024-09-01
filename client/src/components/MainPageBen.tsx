import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Welcome, {beneficiary.name}!</h1>
      <p><strong>NRIC:</strong> {beneficiary.nric}</p>
      <p><strong>Address:</strong> {beneficiary.address}</p>
      <p><strong>Languages:</strong> {beneficiary.languages.join(', ')}</p>
    </div>
  );
};

export default MainPageBen;