import './App.css';
import HomeComponent from './Home/Home';
import LoginComponent from './Login/Login';
import Registration from './Login/Registration';
import SuccessForm from './Login/SampleForm';
import SampleForm from './Login/SampleForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="background-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeComponent />} />
          <Route path="/Registration" element={<Registration />}></Route>
          {/* <Route path="/LoginComponent" element={<LoginComponent />}></Route> */}
          <Route path="/SuccessForm" element={<SuccessForm />}></Route>

          {/* <Route path="OrderDetails/:id" element={<OrderDetails />} />
        <Route path="/DataComponent" element={<DataComponent />}></Route>
        <Route path="/AddOrder" element={<AddOrder />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
