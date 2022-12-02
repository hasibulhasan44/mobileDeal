import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useToken from "../../Hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createUser, updateUser, logOut } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState('')
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  if(token){
      navigate('/');
  }

  const handleSignUp = (data) => {
    setSignUPError("");
    console.log(data);
    const name = data.name
    const email = data.email;
    const password = data.password;
    const accountType = data.accountType;
    const verified = false

    const imageHostKey = process.env.REACT_APP_imgbb;
    const image = data.image[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const imgURL = data.data.url;
        createUser(email, password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            const userInfo = {
              displayName: data.name,
              photoURL: imgURL,
            };
            updateUser(userInfo)
              .then(() => {
                saveUser(name, email, imgURL, accountType, verified);
              })
              .catch((err) => console.log(err));
          })
          .catch((error) => {
            console.log(error);
            setSignUPError(error?.message);
          });
      });
  };

  const saveUser = (name, email, imgURL, role, verified) => {
    const user = { name, email, imgURL, role, verified };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Successfully Signed Up");
          reset();
          navigate('/')
          setCreatedUserEmail(email);
        }
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-96 md:w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">
                Name
              </span>
            </label>
            <input
             
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered border-red-300 w-full max-w-xs"
            />
            {errors?.name && (
              <p className="text-red-500">{errors?.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">
                Image
              </span>
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
              <span className="label-text">
                Email
              </span>
            </label>
            <input
             
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="input input-borde border-red-300 w-full max-w-xs"
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">
                Password
              </span>
            </label>
            <input
             
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
              })}
              className="input input-bordered border-red-300 w-full max-w-xs"
            />
            {errors?.password && (
              <p className="text-red-500">{errors?.password?.message}</p>
            )}
          </div>

          <div className="lg:flex form-control w-full max-w-xs">
            <div className="">
              <label className="label">
                {" "}
                <span className="label-text">
                  Select Account Type
                </span>{" "}
              </label>
              <select
               
                className="select select-bordered border-red-300 w-full max-w-xs"
                {...register("accountType", {
                  required: "Account Type is Required",
                })}
              >
                <option>Buyer</option>
                <option>Seller</option>
              </select>
            </div>
            {errors?.name && (
              <p className="text-red-500">{errors?.accountType?.message}</p>
            )}
          </div>
          <input
           
            className="btn btn-outline w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p>
          Already have an account{" "}
          <Link className="text-secondary ml-4" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
