import IndexAdmin from "../Backend/index";
import catlist from "../Backend/category/list.js";
import DashBoard from "../Backend/DashBoard/DashBoard.js";
import CategoryAdd from "../Backend/category/add.js";
import CategoryEdit from "../Backend/category/edit.js";
import Prolist from "../Backend/products/list.js";



import ProductAdd from "../Backend/products/add.js";
import ProductList from "../Backend/products/list";
import ProductEdit from "../Backend/products/edit.js";

import Brand from "../Backend/Brand/Brandlist.js";
import BrandAdd from "../Backend/Brand/add.js";
import BrandEdit from "../Backend/Brand/edit.js";

import UserList from "../Backend/user/userlist.js";
import Userdetail from "../Backend/user/userdetail.js";

import loginAdmin from"../Backend/loginAdmin.js"
import logoutAdmin from "../Backend/logoutAdmin.js";

const BackendRouter = [

    { path: "/admin/Prolist", component: Prolist },
    { path: "/admin/list", component: catlist },
    { path: "/admin/dashboard", component: DashBoard },
    { path: "/admin/addcategory", component: CategoryAdd },
    { path: "/admin/edit/:id", component: CategoryEdit },

    
    { path: "/admin/products/:page", component: ProductList },
    { path: "/admin/addproduct", component: ProductAdd },
    { path: "/admin/editProduct/:id", component: ProductEdit },

    { path: "/admin/brand", component: Brand },
    { path: "/admin/brandadd", component: BrandAdd },
    { path: "/admin/brandedit/:id", component: BrandEdit },

    { path: "/admin/user", component: UserList },
    { path: "/admin/userdetail/:id", component: Userdetail },

    { path: "/admin/login", component: loginAdmin },
    { path: "/admin/logout", component: logoutAdmin },
    
];
export default BackendRouter;