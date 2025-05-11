import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AddCategory from "./pages/Tables/category/AddCategory";
import ListCategory from "./pages/Tables/category/ListCategory";
import EditCategory from "./pages/Tables/category/EditCategory";
import ListProduct from "./pages/Tables/product/ListProduct";
import AddProduct from "./pages/Tables/product/AddProduct";
import EditProduct from "./pages/Tables/product/EditProduct";
import ViewProduct from "./pages/Tables/product/ViewProduct";
import ListUser from "./pages/Tables/user/ListUser";
import AddUser from "./pages/Tables/user/AddUser";
import EditUser from "./pages/Tables/user/EditUser";
import ViewUser from "./pages/Tables/user/ViewUser";
import ListBrand from "./pages/Tables/brand/ListBrand";
import AddBrand from "./pages/Tables/brand/AddBrand";
import EditBrand from "./pages/Tables/brand/EditBrand";
import ListOrder from "./pages/Tables/order/ListOrder";
import ViewOrder from "./pages/Tables/order/ViewOrder";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes (yêu cầu đăng nhập) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} /> 
              <Route path="/dashboard" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              <Route path="/list-category" element={<ListCategory />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />

              <Route path="/list-product" element={<ListProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/view-product/:id" element={<ViewProduct />} />

              <Route path="/list-user" element={<ListUser />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/view-user/:id" element={<ViewUser />} />

              <Route path="/list-brand" element={<ListBrand />} />
              <Route path="/add-brand" element={<AddBrand />} />
              <Route path="/edit-brand/:id" element={<EditBrand />} />

              <Route path="/list-order" element={<ListOrder />} />
              <Route path="/view-order/:id" element={<ViewOrder />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}