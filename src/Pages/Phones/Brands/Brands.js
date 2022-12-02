import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../../Category/Category";

const Brands = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-1">
        {categories?.length > 0 &&
          categories?.map((category) => (
            <Category key={category?._id} category={category}></Category>
          ))}
      </div>
      <Link to="/allphones" className="btn m-4 flex w-72 mx-auto justify-center">See All</Link>
    </div>
  );
};

export default Brands;
