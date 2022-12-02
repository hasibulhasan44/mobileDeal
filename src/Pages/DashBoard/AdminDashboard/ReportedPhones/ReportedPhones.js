import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import Loading from "../../../Shared Components/LoadingBtn/Loading";
import SingleReportedPhone from "./SingleReportedPhone/SingleReportedPhone";

const ReportedPhones = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState();
  const [phones, setphones] = useState([]);
  const [refetch, setRefetch] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`https://mobile-deal-server.vercel.app/reportedphones`)
      .then((res) => res.json())
      .then((data) => {
        setphones(data);
      });
    setLoading(false);
  }, [user, refetch]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {phones?.length > 0 ? (
        <div className="w-11/12 my-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto">
          {phones?.map((phone) => (
            <SingleReportedPhone
              key={phone._id}
              phone={phone}
              setRefetch={setRefetch}
            ></SingleReportedPhone>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">
          There Is No Reported Phone To Show.
        </p>
      )}
    </div>
  );
};

export default ReportedPhones;
