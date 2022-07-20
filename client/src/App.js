import './App.css';
import {React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome, Home, About, Contact } from "./Components/main/index"
import { Settings, Account, Posts } from "./Components/accounts/index"
import { Search, Details, Create, Gallery } from "./Components/functionality/index"
import Layout from "./Components/layouts/layout";
import { useAuth0 } from '@auth0/auth0-react'
import Loading from './Components/layouts/loading'

 
function App() {
  const {isLoading, error } = useAuth0();
  return (
    <div className="fullApp background-image" >
      
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <Loading />}
      {!error && !isLoading && (<BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
          <Route path="search" element={<Search />} />
          <Route path="details" element={<Details />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="create" element={<Create />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>)}

  </div>
  );
}

export default App;
