import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
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
import Header from "./Layout/Header";
import Package from "./Packages/Package";
import PackageForm from "./Packages/PackageForm";
import BackOffice from "./BackOfficeSetting/BackOffice";
import ContactInquiry from "./Reports/ContactInquiry";
import PackageInquiryList from "./Reports/PackageInquiryList";
import ChangePassword from "./Admin/ChangePassword";
import Login from "./Admin/Login";
import Forgotpassword from "./Admin/Forgotpassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SecoSetting from "./Masters/SecoSetting";
import AddnewsubCategory from "./Product/AddnewsubCategory";
import SubProductList from "./Product/SubProductList";
import Sitemap from "./Masters/Sitemap";
import Emailsender from "./Masters/Emailsender";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        {window.location.pathname !== "/" && <Header />}
        {window.location.pathname !== "/" && <Sidebar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SecoSetting" element={<SecoSetting />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/email-settings" element={<Emailsender />} />
          <Route path="/cmsmasterlist" element={<Cms />} />
          <Route path="/emailtemplate" element={<EmailTemplate />} />
          <Route path="/cmsmastermanage" element={<CmsMaster />} />
          <Route path="/menumasterlist" element={<Menu />} />
          <Route path="/bannermasterlist" element={<Banners />} />
          <Route path="/bannermastermanage" element={<AddNewBanner />} />
          <Route path="/clientmasterlist" element={<Clients />} />
          <Route path="/specialmasterlist" element={<Specials />} />
          <Route path="/brandmasterlist" element={<Brands />} />
          <Route path="/testimonialmasterlist" element={<Testimonial />} />
          <Route
            path="/testimonialmastermanage"
            element={<TestiminialForm />}
          />
          <Route path="/gallerytypelist" element={<GalleryType />} />
          <Route path="/gallerymasterlist" element={<GalleryImage />} />
          <Route path="/categorymasterlist" element={<Category />} />
          <Route path="/subcategory/:id" element={<Subcategory />} />
          <Route path="/categorymastermanage" element={<AddnewCategory />} />
          <Route path="/subcategorymastermanage/:id" element={<AddnewsubCategory />} />
          <Route path="/productmasterlist" element={<ProductList />} />
          <Route path="/subproductmasterlist" element={<SubProductList />} />
          <Route path="/productmanage" element={<ProductManage />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/packagemastermanage" element={<Package />} />
          <Route path="/packageform" element={<PackageForm />} />
          <Route path="/backofficeconfig" element={<BackOffice />} />
          <Route path="/inquirymasterlist" element={<ContactInquiry />} />
          <Route path="/packageinquierylist" element={<PackageInquiryList />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;