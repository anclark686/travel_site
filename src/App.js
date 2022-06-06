import './App.css';
import {React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, Home } from "./Components/welcome/index"
import { Settings, Account } from "./Components/accounts/index"
import { Search, Details } from "./Components/functionality/index"
import { Login, SignUp } from "./Components/login_reg/index"
import Layout from "./Components/layouts/layout";


function App() {
  return (
    <div className="fullApp" >
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="settings" element={<Settings />} />
        <Route path="search" element={<Search />} />
        <Route path="details" element={<Details />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  </BrowserRouter>

  </div>
  );
}

export default App;
