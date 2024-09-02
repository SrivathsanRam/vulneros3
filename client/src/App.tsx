import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SingPassDetails from "./components/SingPassDetails";
import MainPageVol from './components/MainPageVol';
import MainPageBen from './components/MainPageBen';
import 'bootstrap/dist/css/bootstrap.css';
import SelectLanguages from './components/SelectLanguages';
import SelectMobility from './components/SelectMobility';
import SelectLovedOnes from './components/SelectLovedOnes';
import VWOdash from './components/VWOdash';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SingPassDetails />} />
        <Route path="/mainpage-vol" element={<MainPageVol />} />
        <Route path="/mainpage-ben" element={<MainPageBen />} />
        <Route path="/select-languages" element={<SelectLanguages />} />
        <Route path="/select-mobility" element={<SelectMobility />} />
        <Route path="/input-loved-ones" element={<SelectLovedOnes />} />
        <Route path="/vwo-dashboard" element={<VWOdash />} />
      </Routes>
    </Router>
  );
}

export default App
