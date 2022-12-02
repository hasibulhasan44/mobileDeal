import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Loading from "../../Shared Components/LoadingBtn/Loading";

const EditItem = () => {
  const product = useLoaderData();
  console.log(product);
  const { user } = useContext(AuthContext);
  const [loadedUserData, setLoadedUserData] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user?email=${user?.email}`)
      .then(function (response) {
        console.log(response.data);
        setLoadedUserData(response?.data);
      });
  }, [user]);

  const handleEditProduct = (data) => {
    setLoading(true);
    const selleremail = loadedUserData.email;
    const sellername = loadedUserData.name;
    const sellerimg = loadedUserData.imgURL;
    const sellerverified = loadedUserData.verified;
    const brandname = data.brandname;
    const modelname = data.modelname;
    const devicedetails = data.devicedetails;
    const location = data.location;
    const monthsused = data.monthsused;
    const originalprice = data.originalprice;
    const resaleprice = data.resaleprice;

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const imgbbKey = process.env.REACT_APP_imgbb;
    const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const imageURL = data.data.url;

          const updatedCar = {
            brandname,
            modelname,
            imageURL,
            devicedetails,
            location,
            monthsused,
            originalprice,
            resaleprice,
            selleremail,
            sellername,
            sellerimg,
            sellerverified,
          };

          fetch(`http://localhost:5000/updateitem?id=${product?._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedCar),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                toast.success("Your phone information has been updated");
                navigate("/dashboard/mylistings");
              }
                setLoading(false);
                reset();
            });
        }
      });
  };

  if(loading){
    return <Loading></Loading>
  }

  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-96 md:w-96 p-7">
        <h2 className="text-xl text-center">You Are Now Editing {product?.brandname}-{product?.modelname}'s Information</h2>
        <form onSubmit={handleSubmit(handleEditProduct)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Brand Name</span>
            </label>
            <input
              type="text"
              {...register("brandname", {
                required: "Brand Name is Required",
              })}
              defaultValue={product?.brandname}
              className="input input-bordered border-red-300 w-full max-w-xs"
            />
            {errors?.brandname && (
              <p className="text-red-500">{errors?.brandname?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Model Name</span>
            </label>
            <input
              type="text"
              {...register("modelname", {
                required: "Model Name is Required",
              })}
              defaultValue={product?.modelname}
              className="input input-bordered border-red-300 w-full max-w-xs"
            />
            {errors?.modelname && (
              <p className="text-red-500">{errors?.modelname?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "Image is Required",
              })}
              className="file-input file-input-accent input-bordered border-red-300 w-full max-w-xs"
            />
            {errors?.image && (
              <p className="text-red-500">{errors?.image?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Device Details</span>
            </label>
            <textarea
              type="text"
              {...register("devicedetails", {
                required: "Device Details is required",
              })}
              defaultValue={product?.devicedetails}
              className="textarea textarea-border border-red-300 w-full max-w-xs"
            />
            {errors?.devicedetails && (
              <p className="text-red-500">{errors?.devicedetails?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Your Location</span>
            </label>
            <input
              type="text"
              {...register("location", {
                required: "Location is required",
              })}
              defaultValue={product?.location}
              className="input input-bordered border-red-300 w-full max-w-xs"
            />
            {errors?.location && (
              <p className="text-red-500">{errors?.location?.message}</p>
            )}
          </div>

          <div className="lg:flex form-control w-full max-w-xs">
            <div className="">
              <label className="label">
                {" "}
                <span className="label-text">Months Used</span>{" "}
              </label>
              <select
                className="select select-bordered border-red-300 w-full max-w-xs"
                {...register("monthsused", {
                  required: "This field Type is Required",
                })}
                defaultValue={product?.monthsused}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
              </select>
            </div>
            {errors?.monthsused && (
              <p className="text-red-500">{errors?.monthsused?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">
                Original Price [Please input only numbers]
              </span>
            </label>
            <input
              type="text"
              {...register("originalprice", {
                required: "This field is Required",
              })}
              defaultValue={product?.originalprice}
              className="input input-bordered border-red-300 w-full max-w-xs"
            />
            {errors?.originalprice && (
              <p className="text-red-500">{errors?.originalprice?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">
                Resale Price [Please input only numbers]
              </span>
            </label>
            <input
              type="text"
              {...register("resaleprice", {
                required: "This field is Required",
              })}
              defaultValue={product?.resaleprice}
              className="input input-bordered border-red-300 w-full max-w-xs"
            />
            {errors?.resaleprice && (
              <p className="text-red-500">{errors?.resaleprice?.message}</p>
            )}
          </div>
          <input
            className="btn btn-outline w-full mt-4"
            value="Submit"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default EditItem;
