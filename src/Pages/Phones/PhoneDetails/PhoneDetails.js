import React, { useContext, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import "react-photo-view/dist/react-photo-view.css";
import ContactModal from "../ContactModal/ContactModal";
import Loading from "../../Shared Components/LoadingBtn/Loading";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";
import { GoVerified } from "react-icons/go";

const PhoneDetails = () => {
  const { user } = useContext(AuthContext);
  const phone = useLoaderData();
  const [contact, setContact] = useState(false);
  const [reporter, setReporter] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://mobile-deal-server.vercel.app/user?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setReporter(data);
        });
    }
  }, [user]);

  const handleReportPhone = () => {
    const proceed = window.confirm(
      "Are you sure to report to the admin about this phone?"
    );

    const reportedphone = {
      ...phone,
      phoneId: phone?._id,
      reporterName: reporter?.name,
      reporterEmail: reporter?.email,
      reporterRole: reporter?.role,
    };

    if (proceed) {
      setLoading(true);
      fetch("https://mobile-deal-server.vercel.app/reportphone", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(reportedphone),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.insertedId) {
            toast.success("Successfully Reported The Phone");
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  const handleAddToWishlist = () => {
    const wishedPhone = {
      userEmail: user?.email,
      userName: user?.displayName,
      ...phone,
    };

    fetch("https://mobile-deal-server.vercel.app/addtowishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishedPhone),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId) {
          toast.success("Successfully Added The Phone To Your Wishlist");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <div>
          <PhotoProvider>
            <PhotoView src={phone?.imgURL}>
              <img
                className="m-0 mx-auto rounded-xl"
                src={phone?.imgURL}
                alt="phone"
              />
            </PhotoView>
          </PhotoProvider>

          <h2 className=" mt-4 text-center">
            <span className="font-semibold text-2xl">
              {phone?.brandname}-{phone?.modelname}
            </span>
            <br />
            <span className="">{phone?.brandname}</span>
          </h2>
          <div>
            <p className="font-semibold">Seller :</p>
            <div className="flex flex-col gap-y-4 lg:flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  className="w-14 rounded-full"
                  src={phone?.sellerimg}
                  alt=""
                />
                <p className="text-xl font-semibold">
                  <span className="flex items-center h-2">
                    {phone?.sellername}
                    {phone?.sellerverified && (
                      <GoVerified size={18} className="lg:ml-3"></GoVerified>
                    )}
                  </span>
                  <br />
                  <span className="text-sm">{phone?.selleremail}</span>
                </p>
              </div>
              <span className="flex gap-3 items-center">
                <button
                  disabled={!user?.uid}
                  onClick={handleAddToWishlist}
                  className="tooltip tooltip-left"
                  data-tip={
                    !user?.uid
                      ? "please log in to add a phone to your wishlist"
                      : "Add To Wishlist"
                  }
                >
                  <FiHeart size={25}></FiHeart>
                </button>
                <p>{phone?.postdate}</p>
              </span>
            </div>
            <p className="my-2">Description: {phone?.devicedetails}</p>
            <p className="my-2">{phone?.monthsused} Months Used</p>
          </div>
          <p className="text-lg">Location: {phone?.location}</p>

          <p className="font-semibold text-2xl">
            Original Price: <span>{phone?.originalprice}$</span>
          </p>
          <p className="font-semibold text-2xl">
            Resale Price: <span>{phone?.resaleprice}$</span>
          </p>
        </div>
        {user?.uid ? (
          <>
            <label
              onClick={() => setContact(phone)}
              htmlFor="contactModal"
              className="btn btn-primary mx-auto mt-4 mr-4 mb-5"
            >
              Contact Seller
            </label>
            <Link className="btn btn-error ml-4" onClick={handleReportPhone}>
              Report To Admin
            </Link>
          </>
        ) : (
          <p className="text-warning mb-5">
            Please log in to contact the seller.
          </p>
        )}
        {contact && <ContactModal phone={phone}></ContactModal>}
      </div>
    </div>
  );
};

export default PhoneDetails;
