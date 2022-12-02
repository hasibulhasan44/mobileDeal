import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";

const ContactModal = ({ phone }) => {
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleSubmitModal = (data) => {
    const buyerName = data.buyerName;
    const buyerEmail = data.buyeremail;
    const buyerNumber = data.buyerNumber;
    const buyerLocation = data.buyerLocation;
    const order = {
      buyerName: buyerName,
      buyerEmail: buyerEmail,
      buyerNumber: buyerNumber,
      buyerLocation: buyerLocation,
      ...phone,
    };

    fetch("https://mobile-deal-server.vercel.app/addorder", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Order placed successfully");
          reset();
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="contactModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="contactModal"
            className="btn btn-xs btn-circle absolute right-5 top-7"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Please give your contact information and take the selller
            information, If you need. The seller will be notified with your
            contact info.
          </h3>
          <div className="lg:w-96 p-8">
            <form onSubmit={handleSubmit(handleSubmitModal)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  {...register("buyerName", {
                    required: "User Name is required",
                  })}
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                />
                {errors.buyerName && (
                  <p
                    className="text-red-500"
                    role="alert"
                  >{`*${errors?.buyerName?.message}`}</p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Put a location you want to meet with the seller.
                  </span>
                </label>
                <input
                  type="text"
                  {...register("buyerLocation", {
                    required: "Your location is required",
                  })}
                  placeholder="Your Location"
                  className="input input-bordered w-full"
                />
                {errors.buyerLocation && (
                  <p
                    className="text-red-500"
                    role="alert"
                  >{`*${errors.buyerLocation?.message}`}</p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Put a location you want to meet with the seller.
                  </span>
                </label>
                <input
                  type="text"
                  {...register("buyerNumber", {
                    required: "Contact number is required",
                  })}
                  placeholder="Your Contact Number"
                  className="input input-bordered w-full"
                />
                {errors.buyerNumber && (
                  <p
                    className="text-red-500"
                    role="alert"
                  >{`*${errors.buyerNumber?.message}`}</p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  {...register("buyeremail", { value: `${user?.email}` })}
                  disabled
                  className="input input-bordered w-full"
                />
                {errors.buyeremail && (
                  <p
                    className="text-red-500"
                    role="alert"
                  >{`*${errors.buyeremail?.message}`}</p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Seller Email</span>
                </label>
                <input
                  type="email"
                  {...register("sellerEmail", {
                    value: `${phone?.selleremail}`,
                  })}
                  disabled
                  className="input input-bordered w-full"
                />
                {errors.sellerEmail && (
                  <p
                    className="text-red-500"
                    role="alert"
                  >{`*${errors.sellerEmail?.message}`}</p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Seller Location</span>
                </label>
                <input
                  type="text"
                  {...register("sellerLocation", {
                    value: `${phone?.location}`,
                  })}
                  disabled
                  className="input input-bordered w-full"
                />
                {errors.sellerLocation && (
                  <p
                    className="text-red-500"
                    role="alert"
                  >{`*${errors.sellerLocation?.message}`}</p>
                )}
              </div>
              <input type="submit" className="btn btn-success mr-3 mt-4" />
              <label htmlFor="contactModal" className="btn">
                Close
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
