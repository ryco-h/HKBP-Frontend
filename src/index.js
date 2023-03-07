import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Routers from './services/routes';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { HelmetProvider } from 'react-helmet-async';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0HWuO4BYldeP1DNa_HR_Sdk8y2yFDSsQ",
  authDomain: "hkbp-front.firebaseapp.com",
  projectId: "hkbp-front",
  storageBucket: "hkbp-front.appspot.com",
  messagingSenderId: "664134866565",
  appId: "1:664134866565:web:8c70781992ac171dfdbbec",
  measurementId: "G-2CX0K3R757"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, 'notification_received');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <ProSidebarProvider>
        <Routers/>
      </ProSidebarProvider>
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
