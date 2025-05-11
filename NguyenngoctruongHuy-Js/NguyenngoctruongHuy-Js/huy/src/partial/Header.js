import '../frontend/assets/css/style.css';
import { Link } from 'react-router-dom';
import apiCategory from '../api/apiCategory';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../frontend/context/userContext';

function Header() {
  const { user, cart } = useContext(UserContext);
  const [subMenu, setSubMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiCategory
      .getAll()
      .then((res) => {
        console.log('Raw API response:', res);
        // Kiểm tra dữ liệu trả về
        if (!res || !Array.isArray(res.content)) {
          throw new Error('Dữ liệu danh mục không hợp lệ');
        }
        setSubMenu(res.content);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Lỗi tải danh mục');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div id="header" className="header-visual" style={{ minHeight: 136 }}>
      <div className="container">
        {loading && <p className="text-center">Đang tải danh mục...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div
          data-vc-full-width="true"
          data-vc-full-width-init="true"
          className="vc_row wpb_row vc_custom_1463715486379 vc_row-has-fill"
          style={{
            position: 'relative',
            left: '-320.5px',
            boxSizing: 'border-box',
            width: 1841,
            paddingLeft: '320.5px',
            paddingRight: '320.5px',
            backgroundColor: '#404040',
          }}
        >
          <div className="wpb_column column_container col-sm-8">
            <p style={{ height: '5px' }}></p>
            <div className="vc_column-inner">
              <div className="wpb_wrapper">
                <div className="wpb_text_column wpb_content_element vc_custom_1463714504888">
                  <div className="wpb_wrapper">
                    <div className="top-nav">
                      <ul>
                        <li>
                          <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li>
                          <Link to="/contact">Liên hệ</Link>
                        </li>
                        <li>
                          <Link to="#">Dịch vụ</Link>
                        </li>
                        <li style={{ color: 'lightgray' }}>
                          {user ? <span>{user.username}</span> : <Link to="/login">Đăng nhập</Link>}
                        </li>
                        {user && (
                          <li>
                            <a href="/logout">Đăng xuất</a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap-language-cart wpb_column column_container col-sm-4 vc_hidden-xs">
            <div className="vc_column-inner">
              <div className="wpb_wrapper">
                <div className="mini-cart-box mini-cart">
                  <p style={{ height: '40px' }}></p>
                  <Link to="/cart" className="mini-cart-link">
                    <span className="mini-cart-icon">
                      <i className="fa fa-shopping-basket" aria-hidden="true" />
                    </span>
                    <span className="mini-cart-number cart-item-count">
                      {cart && cart.amount ? cart.amount : 0}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vc_row-full-width vc_clearfix" />
        <div
          data-vc-full-width="true"
          data-vc-full-width-init="true"
          className="vc_row wpb_row vc_custom_1463715714875 vc_row-has-fill"
          style={{
            position: 'relative',
            left: '-320.5px',
            boxSizing: 'border-box',
            width: 1841,
            paddingLeft: '320.5px',
            paddingRight: '320.5px',
            backgroundColor: '#404040',
          }}
        >
          <div className="wpb_column column_container col-sm-12 col-has-fill">
            <div className="vc_column-inner vc_custom_1463715534797">
              <div className="wpb_wrapper" />
            </div>
          </div>
        </div>
        <div className="vc_row-full-width vc_clearfix" />
        <div
          data-vc-full-width="true"
          data-vc-full-width-init="true"
          className="vc_row wpb_row header-fixed vc_custom_1465187234153 vc_row-has-fill"
          style={{
            position: 'relative',
            left: '-320.5px',
            boxSizing: 'border-box',
            width: 1841,
            paddingLeft: '320.5px',
            paddingRight: '320.5px',
            backgroundColor: '#404040',
          }}
        >
          <div className="wpb_column column_container col-sm-12 col-md-3 col-xs-8">
            <div className="vc_column-inner vc_custom_1465195559376">
              <div className="wpb_wrapper">
                <Link className="logo" to="/Home">
                  <img
                    src="https://necshop.7uptheme.net/wp-content/uploads/2016/05/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="wpb_column column_container col-sm-9 col-md-7 col-xs-4">
            <div className="vc_column-inner">
              <div className="wpb_wrapper">
                <nav className="main-nav">
                  <ul id="menu-main-menu" className="main-menu">
                    <li className="main-menu-item menu-item-has-children">
                      <a>DANH MỤC</a>
                      <ul className="sub-menu menu-odd menu-depth-1">
                        {subMenu.length > 0 ? (
                          subMenu.map((item) => (
                            <li className="menu-item" key={item.categoryId}>
                              <Link
                                to={`/category/${item.categoryId}`}
                                className="menu-link sub-menu-link"
                              >
                                {item.categoryName}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li className="menu-item">
                            <span>Không có danh mục</span>
                          </li>
                        )}
                      </ul>
                    </li>
                    <li className="main-menu-item menu-item-even menu-item-depth-0 menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                      <a href="#" className="menu-link main-menu-link" style={{ color: 'white' }}>
                        Thương hiệu
                      </a>
                      <ul className="sub-menu menu-odd menu-depth-1">
                        <li className="menu-item">
                          <Link to="/brand/apple" className="menu-link sub-menu-link">
                            Apple
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/brand/asus" className="menu-link sub-menu-link">
                            Asus
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/brand/lenovo" className="menu-link sub-menu-link">
                            Lenovo
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/brand/samsung" className="menu-link sub-menu-link">
                            Samsung
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/brand/xiaomi" className="menu-link sub-menu-link">
                            Xiaomi
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/brand/logitech" className="menu-link sub-menu-link">
                            Logitech
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="main-menu-item menu-item-even menu-item-depth-0 menu-item menu-item-type-custom menu-item-object-custom">
                      <Link to="#" className="menu-link main-menu-link">
                        Pages
                      </Link>
                    </li>
                    <li className="main-menu-item menu-item-even menu-item-depth-0 menu-item menu-item-type-post_type menu-item-object-page">
                      <Link to="/product" className="menu-link main-menu-link">
                        Shop
                      </Link>
                    </li>
                  </ul>
                  <a href="#" className="toggle-mobile-menu">
                    <span>Menu</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div className="wpb_column column_container col-sm-3 col-md-2 col-xs-12">
            <div className="vc_column-inner">
              <div className="wpb_wrapper">
                <form className="search-form home1" action="">
                  <input
                    type="text"
                    name="s"
                    defaultValue=""
                    onFocus={(e) => {
                      if (e.target.value === e.target.defaultValue) e.target.value = '';
                    }}
                    onBlur={(e) => {
                      if (e.target.value === '') e.target.value = e.target.defaultValue;
                    }}
                  />
                  <input type="hidden" name="post_type" defaultValue="product" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="vc_row-full-width vc_clearfix" />
      </div>
    </div>
  );
}

export default Header;