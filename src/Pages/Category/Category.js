import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Category = (props) => {
  const {brandname,brandimg} = props.category
    
  return (
    <div>
      <div>
        <div className="card w-80 bg-base-100 shadow-xl mt-4 border-4 border-red-200 mx-auto lg:mb-12">
          <figure>
            <img className="border border-gray-200 rounded-xl p-4" src={brandimg} alt="Shoes" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{brandname}</h2>
            <div className="card-actions justify-end">
              <Link to={`/phones/${brandname}`} className="btn btn-primary">See All Products of {brandname}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
