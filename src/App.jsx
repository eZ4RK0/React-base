import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Board from './components/Board';
import Error404 from './components/Error404';
import StyledComponent from './components/StyledComponent';

// eslint-disable-next-line react-refresh/only-export-components
function Home() {
   useEffect(() => {
      document.title = 'Accueil';
   }, []);

   return <h1>Accueil</h1>;
}

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <BrowserRouter
         future={{ v7_relativeSplatPath: true, v7_startTransition: true }} // Pre-test pour la V7 -> Facultatif
      >
         <Navbar />
         <hr />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tic-tac-toe" element={<Board />} />
            <Route path="/style" element={<StyledComponent />} />
            <Route path="*" element={<Error404 />} />
         </Routes>
      </BrowserRouter>
   </StrictMode>
);
