import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import ListAnItem from "../../Pages/DashBoard/ListAnItem/ListAnItem";
import DashboardLayout from "../../Layout/Main/DashboardLayout/DashboardLayout";
import MyListings from "../../Pages/DashBoard/MyListings/MyListings";
import EditItem from "../../Pages/DashBoard/EditItem/EditItem";
import Brands from "../../Pages/Phones/Brands/Brands";
import PhoneDetails from "../../Pages/Phones/PhoneDetails/PhoneDetails";
import AllPhones from "../../Pages/Phones/AllPhones/AllPhones";
import Phones from "../../Pages/Phones/Phones/Phones";
import MyCustomers from "../../Pages/DashBoard/MyCustomers/MyCustomers";
import AllUser from "../../Pages/DashBoard/AdminDashboard/AllUser/AllUser";
import AllBuyer from "../../Pages/DashBoard/AdminDashboard/AllBuyer/AllBuyer";
import AllSeller from "../../Pages/DashBoard/AdminDashboard/AllSeller/AllSeller";
import ReportedPhones from "../../Pages/DashBoard/AdminDashboard/ReportedPhones/ReportedPhones";
import MyOrders from "../../Pages/DashBoard/BuyerDashboard/MyOrders/MyOrders";
import MyWishlist from "../../Pages/DashBoard/BuyerDashboard/MyWishlist/MyWishlist";
import SellerRoute from "../SellerRoute/SellerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import NotFound from "../../Pages/NotFound/NotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/phones",
        element: <Brands></Brands>,
      },
      {
        path: "/phonedetails/:id",
        element: <PhoneDetails></PhoneDetails>,
        loader: async ({ params }) =>
          await fetch(
            `https://mobile-deal-server.vercel.app/phonedetails/${params?.id}`
          ),
      },
      {
        path: "/allphones",
        element: <AllPhones></AllPhones>,
        loader: async () =>
          await fetch("https://mobile-deal-server.vercel.app/allphones"),
      },
      {
        path: "/phones/:brandname",
        element: <Phones></Phones>,
        loader: async ({ params }) =>
          await fetch(
            `https://mobile-deal-server.vercel.app/phones/${params.brandname}`
          ),
      },
      {
        path:'*',
        element:<NotFound></NotFound>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/listanitem",
        element: (
          <SellerRoute>
            <ListAnItem></ListAnItem>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/mylistings",
        element: (
          <SellerRoute>
            <MyListings></MyListings>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/edititem/:id",
        element: (
          <SellerRoute>
            <EditItem></EditItem>
          </SellerRoute>
        ),
        loader: async ({ params }) =>
          await fetch(
            `https://mobile-deal-server.vercel.app/item/${params.id}`
          ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <SellerRoute>
            <MyCustomers></MyCustomers>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myorders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/mywishlist",
        element: (
          <PrivateRoute>
            <MyWishlist></MyWishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/alluser",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allbuyer",
        element: (
          <AdminRoute>
            <AllBuyer></AllBuyer>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allseller",
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reportedphones",
        element: (
          <AdminRoute>
            <ReportedPhones></ReportedPhones>,
          </AdminRoute>
        ),
        loader: async () =>
          await fetch("https://mobile-deal-server.vercel.app/reportedphones"),
      },
    ],
  },
]);

export default routes;
