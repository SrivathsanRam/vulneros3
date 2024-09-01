import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingPassMain from "./components/SingPassMain";
import SingPassDetails from "./components/SingPassDetails";
import MainPageVol from './components/MainPageVol';
import MainPageBen from './components/MainPageBen';
import 'bootstrap/dist/css/bootstrap.css';
import SelectLanguages from './components/SelectLanguages';
import SelectMobility from './components/SelectMobility';
import SelectLovedOnes from './components/SelectLovedOnes';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SingPassMain />} />
        <Route path="/mockpassconnector" element={<SingPassDetails />} />
        <Route path="/mainpage_vol" element={<MainPageVol />} />
        <Route path="/mainpage_ben" element={<MainPageBen />} />
        <Route path="/select-languages" element={<SelectLanguages />} />
        <Route path="/select-mobility" element={<SelectMobility />} />
        <Route path="/input-loved-ones" element={<SelectLovedOnes />} />
      </Routes>
    </Router>
  );
}

export default App
