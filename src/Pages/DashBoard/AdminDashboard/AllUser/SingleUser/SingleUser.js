import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SingleUser = ({ user, btnName, setRefetch }) => {
  const handleDeleteUser = (id) => {
    const proceed = window.confirm(
      `Are you sure you want to delete this ${btnName}?`
    );
    if (proceed) {
      fetch(`https://mobile-deal-server.vercel.app/deleteuser?id=${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          //   authorization: `bearer ${localStorage.getItem("wheelanesToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success(`Successfully Deleted The ${btnName}`);
            setRefetch(true);
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

  const handleMakeAdmin = (id) => {
    const proceed = window.confirm(`Are you sure to make ${btnName} an admin?`);
    if (proceed) {
      fetch(`https://mobile-deal-server.vercel.app/makeadmin?id=${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          //   authorization: `bearer ${localStorage.getItem("wheelanesToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success(`Successfully Deleted The ${btnName}`);
            setRefetch(true);
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

  const handleVerify = (id) => {
    const proceed = window.confirm(`Are you sure to verify the seller?`);
    if (proceed) {
      fetch(`https://mobile-deal-server.vercel.app/verify?id=${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success(`Successfully Verified The Seller`);
            setRefetch(true);
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
    <div className="mx-auto">
      <div className="card lg:w-96 lg:h-96 bg-base-100 shadow-xl">
        <figure className="px-4 pt-6">
          <img src={user?.imgURL} alt="" className="mask mask-circle w-3/5" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{user?.role}</p>
          <div className="card-actions">
            <Link className="mx-auto">
              <button
                disabled={user?.role === "Admin"}
                onClick={() => handleMakeAdmin(user?._id)}
                className="btn btn-warning btn-sm"
              >
                Make Admin
              </button>
            </Link>
            {user?.role === "Seller" && (
              <Link className="mx-auto">
                <button
                  disabled={user?.role !== "Seller" || user?.verified === true}
                  onClick={() => handleVerify(user?._id)}
                  className="btn btn-warning btn-sm"
                >
                  Verify Seller
                </button>
              </Link>
            )}
            <Link className="mx-auto">
              <button
                disabled={user?.role === "Admin"}
                onClick={() => handleDeleteUser(user?._id)}
                className="btn btn-error btn-sm"
              >
                Delete {btnName}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
