import logo from './logo.svg';
import './App.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/MySidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="card row col-12">
     <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/accounts" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
