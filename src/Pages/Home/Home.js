import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import img1 from '../../images/doodle2.png';
import { BsFillMegaphoneFill } from "react-icons/bs";
import { BiHappyAlt } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Category from "../Category/Category";
import {MdMiscellaneousServices} from 'react-icons/md'
import HomePhone from "./Homephones/HomePhone";

const Home = () => {
  const {user} = useContext(AuthContext);
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categorieshome")
    .then(res => res.json())
    .then(data => {     
       setcategories(data)})
  },[])
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url("${img1}")` }}
      >
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Hello there</h1>
            <p className="mb-5 text-white">
              We warmly Welcome you to the best website to buy used mobile
              phones. Here you will find the phones of Apple, One plus, Samsung
              and Infinix brand. You can buy them in an affordable price without
              any kind of hesitation.
            </p>
            <button className="btn btn-primary">Explore Mobile Phones</button>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-xl text-center p-2">
          Product categories By Brand Name
        </h1>
        <div className="lg:grid lg:grid-cols-3">
          {
            categories?.map((category, idx) => <Category 
            key = {idx}
            category = {category}
            ></Category>)
          }
        </div>
      </div>

      <div className="divider divide-red-400 m-0">X</div>

      <div className="w-full">
        <div className="flex flex-col-reverse items-center w-1/4 mx-auto p-12">
          <h1 className="text-xl text-center p-2">
            Our Services and Works
          </h1>
          <MdMiscellaneousServices className="mt-4 h-16 w-16"></MdMiscellaneousServices>
        </div>
        <div className="lg:grid lg:grid-cols-3 mt-2 p-4 gap-4">
          <div
           
            className="border-4 border-red-200 p-4 rounded-lg mb-4"
          >
            <div className="flex flex-col-reverse items-center justify-center">
              <h1 className="text-lg text-center mb-2">Advirtisement</h1>
              <BsFillMegaphoneFill className="h-12 w-12 ml-4" />
            </div>
            <p>
              We can help you advirtise your product for resale. If there is a
              phone with you which has no need, you can easily advirtise that
              thorough us to resale.
            </p>
          </div>
          <div
           
            className="border-4 border-red-200 p-4 rounded-lg mb-4"
          >
            <div className="flex flex-col-reverse items-center justify-center">
              <h1 className="text-lg text-center mb-2">Affordable Price</h1>
              <RiMoneyDollarCircleFill className="h-12 w-12 ml-4" />
            </div>
            <p>
              We assure you that you will not find any better site who will
              offer you resale products in that price range that we offer you.
              We value your Capability.
            </p>
          </div>
          <div
           
            className="border-4 border-red-200 p-4 rounded-lg"
          >
            <div className="flex flex-col-reverse items-center justify-center">
              <h1 className="text-lg text-center mb-2">
                100% Customer Satisfaction
              </h1>
              <BiHappyAlt className="h-12 w-12 ml-4" />
            </div>
            <p>
              Customer Satisfaction is our first priority. We always keep
              attention to the need of the customers.
            </p>
          </div>
        </div>
      </div>
      <HomePhone></HomePhone>
    </div>
  );
};

export default Home;
