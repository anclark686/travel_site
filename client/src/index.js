import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div id="bg">
    <Container className="p-0 " fluid={true}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={`http://localhost:3000/welcome`}
      >
        <App />
      </Auth0Provider>
    </Container>
  </div>
);

