import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/AboutUs";
// import Review from "../components/Review";
import Contact from "../components/ContactUs";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import UploadInvoice from "../components/UploadInvoice";
import AdminDashboard from "../components/AdminDashboard";
import UserRegistration from "../components/UserRegistration";
import UserDashboard from "../components/UserDashboard";
import LeftSidebar from "../components/LeftSidebar";
import { Navbar } from "react-bootstrap";
import Invoices from "../components/Invoices";
import IssueInvoice from "../components/IssueInvoice";
import DueInvoice from "../components/DueInvoice";
import CustomerDashboard from "../components/CustomerDashboard";
import InvoiceDashboard from "../components/InvoiceDashboard";

const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/review" element={<Review />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/upload-invoice" element={<UploadInvoice />} />
      <Route path="/customerdashboard" element={<CustomerDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/issueinvoice" element={<IssueInvoice />} />
      <Route path="/dueinvoice" element={<DueInvoice />} />
      <Route path="/user-registration" element={<UserRegistration />} />
      <Route path="/invoicedashboard" element={<InvoiceDashboard />} />
    </Routes>
  );
};

export default GlobalRoutes;
