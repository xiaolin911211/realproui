import React from "react";
import Layout from "./navigation/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Services from "./pages/services";
import Protected from "./navigation/protected";
import Registration from "./pages/registration";
import BookNow from "./pages/booknow";
import {BookNowProvider, OrderProvider} from "./contexts/context";
import ForgotPassword from "./pages/forgot-password";
import OrderHistory from "./pages/order-history";
import OrderDetail from "./pages/order-detail";
import {Breadcrumb} from "flowbite-react";
import MakePayment from "./pages/make-payment";
import AdminOrder from "./pages/admin-order";
import AdminProducts from "./pages/admin-products";
import AdminUsers from "./pages/admin-users";
import AdminDashboard from "./pages/admin-dashboard";
import Profile from "./pages/profile";
import AdminAssignOrder from "./pages/admin-assign-order";
import Activation from "./pages/activation";
import ResetPassword from "./pages/reset-password";

const App = () => {

    return (

        <BrowserRouter>
            <OrderProvider>
                <BookNowProvider>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="resetpassword/:email/:token" element={<ResetPassword/>}/>
                        <Route path="activation/:token" element={<Activation/>}/>
                        <Route path="forgotpassword" element={<ForgotPassword/>}/>
                        <Route path="services" element={
                            <Services/>
                        }/>
                        <Route path="booknow" element={
                            <Protected>

                                    <BookNow/>

                            </Protected>
                        }/>
                        <Route path="registration" element={<Registration/>}/>


                        <Route path="orderhistory" element={
                            <Protected>
                                <OrderHistory/>
                            </Protected>
                        }/>
                        <Route path="orderdetail" element={
                            <Protected>
                                <OrderDetail/>
                            </Protected>
                        }/>
                        <Route path="payment" element={
                            <Protected>
                                <MakePayment/>
                            </Protected>
                        }/>
                        <Route path="adminorder" element={
                            <Protected>
                                <AdminOrder/>
                            </Protected>
                        }/>
                        <Route path="adminproducts" element={
                            <Protected>
                                <AdminProducts/>
                            </Protected>
                        }/>
                        <Route path="adminusers" element={
                            <Protected>
                                <AdminUsers/>
                            </Protected>
                        }/>
                        <Route path="admindashboard" element={
                            <Protected>
                                <AdminDashboard/>
                            </Protected>
                        }/>
                        <Route path="profile" element={
                            <Protected>
                                <Profile/>
                            </Protected>
                        }/>
                        <Route path="adminassignorder" element={
                            <Protected>
                                <AdminAssignOrder/>
                            </Protected>
                        }/>


                    </Route>
                </Routes>
                </BookNowProvider>
            </OrderProvider>
        </BrowserRouter>


    );
};

export default App;
