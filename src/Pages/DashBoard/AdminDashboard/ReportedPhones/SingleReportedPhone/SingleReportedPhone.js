import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SingleReportedPhone = ({ phone, setRefetch }) => {
  const handleDeleteReportedPhone = (id) => {
    const proceed = window.confirm("Remove This Phone From Website?");
    if (proceed) {
      fetch(
        `https://mobile-deal-server.vercel.app/dashboard/deletereportedphone/${phone?.phoneId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            // authorization: `bearer ${localStorage.getItem("wheelanesToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            setRefetch();
            toast.success(`Phone Removed From Wishlist`);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(
            "Something is wrong. Please try to log out and log in again."
          );
        });
    }
  };

  return (
    <div className="my-5 mx-auto">
      <div className="card card-compact lg:w-96 md:w-96 h-full bg-base-100 shadow-xl">
        <figure>
          <img className="w-4/5" src={phone?.imgURL} alt="" />
          <hr className="horizontal "></hr>
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl">
            {phone?.brandname}-{phone?.modelname}
          </h2>
          <p className="font-semibold">User: {phone?.monthsused} Months</p>
          <p className="font-semibold text-lg">
            Asking Price: {phone?.resaleprice}৳
          </p>
          <div className="card-actions justify-center">
            <Link to={`/phonedetails/${phone?._id}`} className="btn w-32">
              Details
            </Link>
            <Link
              onClick={() => handleDeleteReportedPhone(phone?._id)}
              className="btn"
            >
              Remove From Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReportedPhone;
