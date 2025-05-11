import React from 'react';
import { Link, Outlet } from "react-router-dom";
import Header from '../Backend/Partial/Header';
import Footer from '../../src/partial/Footer';
import Login from './loginAdmin';

function IndexAdmin() {
  const userAdmin = JSON.parse(localStorage.getItem('userAdmin'));
  if (!userAdmin) {
    return <Login />;
  } else {
    return (
      <div>
        <Header />
        <div className='row'>
          <div className="col-md-3 col-sm-4 col-xs-12">
            <h2 className="toggle-sidebar">Sidebar Left</h2>
            <div className="sidebar">
              <div
                id="woocommerce_product_categories-1"
                className="sidebar-widget widget woocommerce widget_product_categories"
              >
             <h2 className="" style={{textDecoration:"none"}}>Welcome {userAdmin.username}</h2>
                <p className="widget-title"><a href='/admin/logout'>Logout Admin</a></p>
             
               
                <ul className="product-categories">
                  <li className="cat-item cat-item-15">
                    <Link to="/admin/list">Category</Link>
                  </li>
                  <li className="cat-item cat-item-15">
                    <Link to="/admin/products/1">Product</Link>
                  </li>
                  <li className="cat-item cat-item-15">
                    <Link to="/admin/brand">Brand</Link>
                  </li>
                  <li className="cat-item cat-item-15">
                    <Link to="/admin/user">User</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='col-md-9 col-sm-8 col-xs-12 main-left'>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default IndexAdmin;
