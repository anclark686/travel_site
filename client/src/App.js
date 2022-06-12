import './App.css';
import {React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome, Home, About, Contact } from "./Components/main/index"
import { Settings, Account } from "./Components/accounts/index"
import { Search, Details, Create } from "./Components/functionality/index"
import { Login, SignUp } from "./Components/login_reg/index"
import Layout from "./Components/layouts/layout";

 
function App() {
  return (
    <div className="fullApp background-image" >
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="settings" element={<Settings />} />
        <Route path="search" element={<Search />} />
        <Route path="details" element={<Details />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="account" element={<Account />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="create" element={<Create />} />
      </Route>
    </Routes>
  </BrowserRouter>

  </div>
  );
}

export default App;
