import Home from '../partial/MainContent.js'
import Homes from '../frontend/Pages/Homes/Homes.js'
import About from '../frontend/Pages/About/About.js';
import Contact from '../frontend/Pages/Constract/Constract.js';
import notFound from '../frontend/Pages/Notfound';
import Accessories from '../frontend/Pages/Accessories/Accessories.js';
import Shop from '../frontend/Pages/Shop/Shop.js';
import Headphone from '../frontend/Pages/Headphone/Headphone.js';
import Audio from '../frontend/Pages/Audio/Audio.js';
import Myaccouct from '../frontend/Pages/MyAcc/Myacc.js'
import Cart from '../frontend/Pages/Cart/Cart.js';
import product from '../frontend/Pages/product/Product.js'
import proDetail from '../frontend/Pages/product/ProductDetail.js'
import category from '../frontend/Pages/product/ProductsByCat.js'
import pk from '../frontend/Pages/product/phukien.js'
import Register from "../frontend/Pages/user/Register.js";
import Login from "../frontend/Pages/user/login.js";
import Logout from "../frontend/Pages/user/logout.js";
import Checkout from '../frontend/Pages/Cart/checkout.js';
import brandPro from '../frontend/Pages/product/ProductByBrand.js'

const FrontendRoute = [
    {'path': '/Home', 'component': product},
    {'path': '/Homes', 'component': Homes},
    {'path': '/About', 'component': About},
    {'path': '/Contact', 'component': Contact},
    {'path': '*', 'component': notFound},
    {'path':'/Accessories','component':Accessories},
    {'path':'/Shop','component':Shop},
    {'path':'/Headphone','component':Headphone},
    {'path':'/Audio','component':Audio},
    {'path':'/MyAcc','component':Myaccouct},
    {'path':'/cart','component':Cart},
    {'path':'/product','component':product},
    {'path':'/detail/:slug','component':proDetail},
    {'path':'/cat/:slug','component':category},
    {'path':'/phu-kien','component':pk},
    {'path':'/re','component':Register},
    {'path':'/Logout','component':Logout},
    {'path':'/Login','component':Login},
    {'path':'/Checkout','component':Checkout},
    {'path':'/brand/:slug','component':brandPro},


    
    
    
];
export default FrontendRoute;