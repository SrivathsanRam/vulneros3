import { useLocation } from 'react-router-dom';

type Volunteer = {
  nric: string;
  name: string;
  address: number;
  certifications: Record<string, string>;
  languages: string[];
};

const MainPageVol = () => {
  const location = useLocation();
  const volunteer: Volunteer = location.state.volunteer;

  return (
    <div>
      <h1>Welcome, {volunteer.name}!</h1>
      <p><strong>NRIC:</strong> {volunteer.nric}</p>
      <p><strong>Address:</strong> {volunteer.address}</p>
      <p><strong>Languages:</strong> {volunteer.languages.join(', ')}</p>
      <p><strong>Certifications:</strong></p>
      <ul>
        {Object.entries(volunteer.certifications).map(([institution, certification], index) => (
          <li key={index}>{institution}: {certification}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainPageVol;