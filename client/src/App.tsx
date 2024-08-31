import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingPassMain from "./components/SingPassMain";
import SingPassDetails from "./components/SingPassDetails";
import MainPage from "./components/MainPage";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SingPassMain />} />
        <Route path="/page2" element={<SingPassDetails />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App
