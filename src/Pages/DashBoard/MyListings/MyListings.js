import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider";
import SingleItem from "./SingleItem/SingleItem";
import Loading from "../../Shared Components/LoadingBtn/Loading";
const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [phones, setphones] = useState([]);
  const [seller, setSeller] = useState();
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/user?email=${user?.email}`)
      .then(function (response) {
        console.log(response);
        setSeller(response?.data);
      });
  }, [user, refetch]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/mylistings?email=${seller?.email}`)
      .then(function (response) {
        console.log(response);
        setphones(response.data);
        setLoading(false);
      });
    setLoading(false);
  }, [seller]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {phones?.length > 0 ? (
        <div className="w-11/12 my-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto">
          {phones?.map((phone) => (
            <SingleItem
              key={phone._id}
              phone={phone}
              setRefetch={setRefetch}
            ></SingleItem>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">
          You Didn't have Listed Anything For Sale
        </p>
      )}
    </div>
  );
};

export default MyListings;
