import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleUser from "./SingleUser/SingleUser";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    axios
      .get("https://mobile-deal-server.vercel.app/dashboard/alluser")
      .then(function (response) {
        setUsers(response.data);
      });
  }, [refetch]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-auto w-full">
      {users?.map((user) => (
        <SingleUser
          key={user?._id}
          user={user}
          btnName={`user`}
          setRefetch={setRefetch}
        ></SingleUser>
      ))}
    </div>
  );
};

export default AllUser;
