import React, { useEffect, useState } from "react";
import SinglePhone from "../../Phones/Phones/SinglePhone/SinglePhone";
import Loading from "../../Shared Components/LoadingBtn/Loading";

const HomePhone = () => {
  const [phones, setphones] = useState([]);
  const [refetch, setRefetch] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`https://mobile-deal-server.vercel.app/advertisedphones`)
      .then((res) => res.json())
      .then((data) => {
        setphones(data);
      });
    setLoading(false);
  }, [refetch]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <p className="text-xl font-semibold text-center">
        Here Are Some Most Viewed Products On Our Website
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {phones?.map((phone) => (
          <SinglePhone key={phone?._id} phone={phone}></SinglePhone>
        ))}
      </div>
      ;
    </div>
  );
};

export default HomePhone;
