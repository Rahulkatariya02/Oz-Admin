import "./App.css";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
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
        {/* <Header /> */}
        <Sidebar />
        {/* <NewSidebar /> */}
        {/* {window.location.pathname !== "/" && <Header /></RequireAuth>}
        {window.location.pathname !== "/" && <Sidebar /></RequireAuth>} */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/SecoSetting" element={<RequireAuth><SecoSetting /></RequireAuth>} />
          <Route path="/email-settings" element={<RequireAuth><Emailsender /></RequireAuth>} />
          <Route path="/sitemap" element={<RequireAuth><Sitemap /></RequireAuth>} />
          <Route path="/cmsmasterlist" element={<RequireAuth><Cms /></RequireAuth>} />
          <Route path="/emailtemplate" element={<RequireAuth><EmailTemplate /></RequireAuth>} />
          <Route path="/cmsmastermanage" element={<RequireAuth><CmsMaster /></RequireAuth>} />
          <Route path="/menumasterlist" element={<RequireAuth><Menu /></RequireAuth>} />
          <Route path="/bannermasterlist" element={<RequireAuth><Banners /></RequireAuth>} />
          <Route path="/bannermastermanage" element={<RequireAuth><AddNewBanner /></RequireAuth>} />
          <Route path="/clientmasterlist" element={<RequireAuth><Clients /></RequireAuth>} />
          <Route path="/specialmasterlist" element={<RequireAuth><Specials /></RequireAuth>} />
          <Route path="/brandmasterlist" element={<RequireAuth><Brands /></RequireAuth>} />
          <Route path="/testimonialmasterlist" element={<RequireAuth><Testimonial /></RequireAuth>} />
          <Route
            path="/testimonialmastermanage"
            element={<RequireAuth><TestiminialForm /></RequireAuth>}
          />
          <Route path="/gallerytypelist" element={<RequireAuth><GalleryType /></RequireAuth>} />
          <Route path="/gallerymasterlist" element={<RequireAuth><GalleryImage /></RequireAuth>} />
          <Route path="/categorymasterlist" element={<RequireAuth><Category /></RequireAuth>} />
          <Route path="/subcategory/:id" element={<RequireAuth><Subcategory /></RequireAuth>} />
          <Route path="/categorymastermanage" element={<RequireAuth><AddnewCategory /></RequireAuth>} />
          <Route path="/subcategorymastermanage/:id" element={<RequireAuth><AddnewsubCategory /></RequireAuth>} />
          <Route path="/productmasterlist" element={<RequireAuth><ProductList /></RequireAuth>} />
          <Route path="/subproductmasterlist" element={<RequireAuth><SubProductList /></RequireAuth>} />
          <Route path="/productmanage" element={<RequireAuth><ProductManage /></RequireAuth>} />
          <Route path="/editproduct" element={<RequireAuth><EditProduct /></RequireAuth>} />
          <Route path="/productform" element={<RequireAuth><ProductForm /></RequireAuth>} />
          <Route path="/packagemastermanage" element={<RequireAuth><Package /></RequireAuth>} />
          <Route path="/packageform" element={<RequireAuth><PackageForm /></RequireAuth>} />
          <Route path="/backofficeconfig" element={<RequireAuth><BackOffice /></RequireAuth>} />
          <Route path="/inquirymasterlist" element={<RequireAuth><ContactInquiry /></RequireAuth>} />
          <Route path="/packageinquierylist" element={<RequireAuth><PackageInquiryList /></RequireAuth>} />
          <Route path="/changepassword" element={<RequireAuth><ChangePassword /></RequireAuth>} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/contactdetails" element={<ContactDetails />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;