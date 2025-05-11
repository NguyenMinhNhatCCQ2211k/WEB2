import React from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './frontend/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontendRoute from './routers/Frontend';
import BackendRouter from './routers/Backend';
import Header from './partial/Header';
import Footer from './partial/Footer';
import { UserProvider } from './frontend/context/userContext';
import store from './redux/store';
import { Provider } from 'react-redux';
import IndexAdmin from './Backend';

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          {/* <ToastContainer> */}
          <Routes>
            <Route path="/" element={<Index />}>
              {FrontendRoute.map((router, index) => {
                const Page = router.component;
                return (
                  <Route key={index} path={router.path} element={<Page />} />
                );
              })}
            </Route>
            <Route path="/admin" element={<IndexAdmin/>}>
              {BackendRouter.map((router, index) => {
                const Page = router.component;
                return (
                  <Route key={index} path={router.path} element={<Page />} />
                );
              })}
            </Route>
            
          </Routes>
          
          {/* </ToastContainer> */}
        </BrowserRouter>

       
           
            
         
        
      </UserProvider>
    </Provider>

    
  );
}

export default App;
