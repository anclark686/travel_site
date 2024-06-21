import "./App.css";
import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome, Home, About, Contact } from "./Components/main/index";
import { Settings, Account, Posts } from "./Components/accounts/index";
import {
  Search,
  Details,
  Create,
  Gallery,
  Success,
} from "./Components/functionality/index";
import { Login, Register } from "./Components/login_reg/index";
import Layout from "./Components/layouts/layout";

function App() {
  return (
    <div className="fullApp background-image">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="account" element={<Account />} />
            <Route path="success" element={<Success />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<Search />} />
            <Route path="details" element={<Details />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="create" element={<Create />} />
            <Route path="posts" element={<Posts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
