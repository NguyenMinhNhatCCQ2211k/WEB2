import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../partial/Header.js';
import Main from '../partial/MainContent.js';
import Footer from '../partial/Footer.js';



function Index() {
  return (
    <div>
      <Header />
      <div id='tam' style={{ height: "" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Index;
