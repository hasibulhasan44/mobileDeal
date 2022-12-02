import React, { useEffect, useState } from "react";
import SinglePhone from "../../Phones/Phones/SinglePhone/SinglePhone";
import Loading from "../../Shared Components/LoadingBtn/Loading";

const HomePhone = () => {
  const [phones, setphones] = useState([]);
  const [refetch, setRefetch] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/advertisedphones`)
      .then((res) => res.json()) 
      .then((data) => {
        console.log(data);
        setphones(data);
      });
    setLoading(false);
  }, [refetch]);

  if (loading) {
    return <Loading></Loading>;
  }

  return <div>
    {
        phones?.map(phone => <SinglePhone
        key={phone?._id}
        phone={phone}
        ></SinglePhone>)
    }
  </div>;
};

export default HomePhone;
