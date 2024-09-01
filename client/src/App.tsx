import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingPassMain from "./components/SingPassMain";
import SingPassDetails from "./components/SingPassDetails";
import MainPage from "./components/MainPage";
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SingPassMain />} />
        <Route path="/mockpassconnector" element={<SingPassDetails />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App
