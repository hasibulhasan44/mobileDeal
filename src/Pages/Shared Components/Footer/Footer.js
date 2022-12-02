import React from "react";
import img from "../../../images/navbar-logo.png";

const Footer = () => {
  return (
    <div className="bg-slate-700">
      <div className="lg:grid lg:grid-cols-4 grid grid-cols-2 p-2">
        <div className="lg:flex hidden">
          <img src={img} alt="" />
        </div>
        <div className="text-white">
          <h1 className="text-xl lg:mb-4 lg:mt-12 ">Services:</h1>
          <ul className="">
            <li>Marketing</li>
            <li>Branding</li>
            <li>Advirtisement</li>
          </ul>
        </div>
        <div className="text-white">
          <h1 className="text-xl lg:mb-4 lg:mt-12">Mobile-Deals:</h1>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Address</li>
          </ul>
        </div>
        <div className="text-white">
          <h1 className="text-xl lg:mb-4 lg:mt-12 mt-4">
            Terms and Legalities:
          </h1>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="text-red-200 text-center p-2">
        <p>Copyright © 2022 | All Rights Reserved By Hasibul Hasan</p>
      </div>
    </div>
  );
};

export default Footer;
