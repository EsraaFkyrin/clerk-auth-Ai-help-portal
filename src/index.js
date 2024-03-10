import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes,useNavigate } from 'react-router-dom';
import ProtectedPage from "./ProtectedPage";



 
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const ClerkWithRoutes=() =>{
  const navigate=useNavigate()
  return (
  <ClerkProvider
  publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
  >
    <Routes>
    <Route path="/" element={<App />} />
    
    <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl={'/protected'} routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl={'/protected'} routing="path" path="/sign-up" />}
        />


        <Route
          path="/custom multi-session"
          element={
            <>
            <SignedIn>
              <ProtectedPage/>
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
            </>
          }
        />

    </Routes>
    
  </ClerkProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes/>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
