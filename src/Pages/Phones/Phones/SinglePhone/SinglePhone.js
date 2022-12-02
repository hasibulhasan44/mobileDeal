import React from 'react';
import { Link } from 'react-router-dom';

const SinglePhone = ({phone}) => {
    return (
        <div className='my-5 mx-auto'>
           <div className="card card-compact lg:w-96 md:w-96 h-full bg-base-100 shadow-xl">
        <figure>
          <img className="w-4/5" src={phone?.imgURL} alt="" />
          <hr className='horizontal '></hr>
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl">
            {phone?.brandname}-{phone?.modelname}
          </h2>
          <p className="font-semibold">User: {phone?.monthsused} Months</p>
          <p className="font-semibold text-lg">
            Asking Price: {phone?.resaleprice}৳
          </p>
          <div className="card-actions justify-center">
            <Link
              to={`/phonedetails/${phone?._id}`}
              className="btn w-32"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default SinglePhone;