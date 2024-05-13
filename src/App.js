import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Cms from "./Masters/Cms";
import Sidebar from "./Layout/Sidebar";
import CmsMaster from "./Masters/CmsMaster";
import Menu from "./Masters/Menu";
import Banners from "./Masters/Banners";
import AddNewBanner from "./Masters/AddNewBanner";
import Clients from "./Masters/Clients";
import EmailTemplate from "./Masters/EmailTemplate";
import Specials from "./Masters/Specials";
import Brands from "./Masters/Brands";
import Testimonial from "./Masters/Testimonial";
import TestiminialForm from "./Masters/TestiminialForm";
import GalleryType from "./Masters/GalleryType";
import GalleryImage from "./Masters/GalleryImage";
import Category from "./Product/Category";
import Subcategory from "./Product/Subcategory";
import AddnewCategory from "./Product/AddnewCategory";
import ProductList from "./Product/ProductList";
import ProductManage from "./Product/ProductManage";
import EditProduct from "./Product/EditProduct";
import ProductForm from "./Product/ProductForm";
import Package from "./Packages/Package";
import PackageForm from "./Packages/PackageForm";
import BackOffice from "./BackOfficeSetting/BackOffice";
import ContactInquiry from "./Reports/ContactInquiry";
import PackageInquiryList from "./Reports/PackageInquiryList";
import ChangePassword from "./Admin/ChangePassword";
import Login from "./Admin/Login";
import Forgotpassword from "./Admin/Forgotpassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SecoSetting from "./Masters/SecoSetting";
import AddnewsubCategory from "./Product/AddnewsubCategory";
import SubProductList from "./Product/SubProductList";
import Sitemap from "./Masters/Sitemap";
import Emailsender from "./Masters/Emailsender";
import ContactDetails from "./Reports/ContactDetails";

function RequireAuth({ children }) {
  let accessToken = localStorage.getItem("accessToken");
  let token = localStorage.getItem("token");
  if (!accessToken || !token) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/seo-settings"
            element={
              <RequireAuth>
                <SecoSetting />
              </RequireAuth>
            }
          />
          <Route
            path="/email-settings"
            element={
              <RequireAuth>
                <Emailsender />
              </RequireAuth>
            }
          />
          <Route
            path="/sitemap"
            element={
              <RequireAuth>
                <Sitemap />
              </RequireAuth>
            }
          />
          <Route
            path="/cms-master-list"
            element={
              <RequireAuth>
                <Cms />
              </RequireAuth>
            }
          />
          <Route
            path="/email-template"
            element={
              <RequireAuth>
                <EmailTemplate />
              </RequireAuth>
            }
          />
          <Route
            path="/cms-master-manage"
            element={
              <RequireAuth>
                <CmsMaster />
              </RequireAuth>
            }
          />
          <Route
            path="/menu-master-list"
            element={
              <RequireAuth>
                <Menu />
              </RequireAuth>
            }
          />
          <Route
            path="/banner-master-list"
            element={
              <RequireAuth>
                <Banners />
              </RequireAuth>
            }
          />
          <Route
            path="/banner-master-manage"
            element={
              <RequireAuth>
                <AddNewBanner />
              </RequireAuth>
            }
          />
          <Route
            path="/client-master-list"
            element={
              <RequireAuth>
                <Clients />
              </RequireAuth>
            }
          />
          <Route
            path="/special-master-list"
            element={
              <RequireAuth>
                <Specials />
              </RequireAuth>
            }
          />
          <Route
            path="/brand-master-list"
            element={
              <RequireAuth>
                <Brands />
              </RequireAuth>
            }
          />
          <Route
            path="/testimonial-master-list"
            element={
              <RequireAuth>
                <Testimonial />
              </RequireAuth>
            }
          />
          <Route
            path="/testimonial-master-manage"
            element={
              <RequireAuth>
                <TestiminialForm />
              </RequireAuth>
            }
          />
          <Route
            path="/gallery-type-list"
            element={
              <RequireAuth>
                <GalleryType />
              </RequireAuth>
            }
          />
          <Route
            path="/gallery-master-list"
            element={
              <RequireAuth>
                <GalleryImage />
              </RequireAuth>
            }
          />
          <Route
            path="/category-master-list"
            element={
              <RequireAuth>
                <Category />
              </RequireAuth>
            }
          />
          <Route
            path="/subcategory/:id"
            element={
              <RequireAuth>
                <Subcategory />
              </RequireAuth>
            }
          />
          <Route
            path="/category-master-manage"
            element={
              <RequireAuth>
                <AddnewCategory />
              </RequireAuth>
            }
          />
          <Route
            path="/sub-category-master-manage/:id"
            element={
              <RequireAuth>
                <AddnewsubCategory />
              </RequireAuth>
            }
          />
          <Route
            path="/product-master-list"
            element={
              <RequireAuth>
                <ProductList />
              </RequireAuth>
            }
          />
          <Route
            path="/sub-product-master-list"
            element={
              <RequireAuth>
                <SubProductList />
              </RequireAuth>
            }
          />
          <Route
            path="/product-manage"
            element={
              <RequireAuth>
                <ProductManage />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-product"
            element={
              <RequireAuth>
                <EditProduct />
              </RequireAuth>
            }
          />
          <Route
            path="/product-form"
            element={
              <RequireAuth>
                <ProductForm />
              </RequireAuth>
            }
          />
          <Route
            path="/package-master-manage"
            element={
              <RequireAuth>
                <Package />
              </RequireAuth>
            }
          />
          <Route
            path="/package-form"
            element={
              <RequireAuth>
                <PackageForm />
              </RequireAuth>
            }
          />
          <Route
            path="/back-office-config"
            element={
              <RequireAuth>
                <BackOffice />
              </RequireAuth>
            }
          />
          <Route
            path="/inquiry-master-list"
            element={
              <RequireAuth>
                <ContactInquiry />
              </RequireAuth>
            }
          />
          <Route
            path="/package-inquiery-list"
            element={
              <RequireAuth>
                <PackageInquiryList />
              </RequireAuth>
            }
          />
          <Route
            path="/change-password"
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/contact-details" element={<ContactDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
