import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import Loading from '../../../Shared Components/LoadingBtn/Loading';
import SingleWishedPhone from './SingleWishedPhone/SingleWishedPhone';

const MyWishlist = () => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState();
    const [phones, setphones] = useState([]);
    const [refetch, setRefetch] = useState(false);

    useEffect(()=> {
        setLoading(true)
        fetch(`http://localhost:5000/mywishedphones?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setphones(data);
        })
        setLoading(false)
    },[user, refetch])

    if(loading){
        return <Loading></Loading>
    }

    return (
        <div>
      {phones?.length > 0 ? (
        <div className="w-11/12 my-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto">
          {phones?.map((phone) => (
            <SingleWishedPhone
              key={phone._id}
              phone={phone}
              setRefetch={setRefetch}
            ></SingleWishedPhone>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">
          You Didn't Added Anything To Your Wishlist Yet
        </p>
      )}
    </div>
    );
};

export default MyWishlist;