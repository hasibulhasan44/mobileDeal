import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SingleItem = ({ phone, setRefetch }) => {

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure to delete this phone?')
        console.log(id);
        if(proceed){
            fetch(`http://localhost:5000/deleteitem?id=${id}`, {
                method:'DELETE',
                headers: {
                  'content-type': 'application/json', 
                  authorization: `bearer ${localStorage.getItem('wheelanesToken')}`
              }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                  toast.success('Successfully Deleted')
                  setRefetch()
                }
              })
            .catch(err => console.error(err))
        }
  }

  const handleAdvertise = id => {
    fetch(`http://localhost:5000/advertiseitem/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json', 
        // authorization: `bearer ${localStorage.getItem('mobileToken')}`
    }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.acknowledged){
        toast.success('Successfully Advertised')
        setRefetch();
      }
    })
  }

  const handleChangeStatus = ( id, event ) => {
    const proceed = window.confirm('Are You Sure To Change Status?')
    console.log(id);
    if(proceed){
        fetch(`http://localhost:5000/changeStatus?id=${id}`, {
            method:'PUT',
            headers: {
              // 'content-type': 'application/json', 
              // authorization: `bearer ${localStorage.getItem('wheelanesToken')}`,
              status: event
          }
        })
        .then(data => console.log(data))
        .catch(err => {
          console.error(err)
          toast.error('Something is wrong. Please try to log out and log in again.')
        })
    }
}

  return (
    <div className="mx-auto">
      <div className="card card-compact lg:w-96 md:w-96 h-full bg-base-100 shadow-xl">
        <figure>
          <img className="w-3/5" src={phone?.imgURL} alt="" />
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
            <Link to={`/phonedetails/${phone?._id}`} className="btn btn-sm">Details</Link>
            <button onClick={()=>handleDelete(phone?._id)} className="btn btn-sm">Delete</button>
            <Link
              to={`/dashboard/edititem/${phone?._id}`}
              className="btn btn-sm btn-xs"
            >
              Edit phone
            </Link>
            <button disabled={phone?.advertise} onClick={() => handleAdvertise(phone?._id)} className="btn btn-sm">{
                phone?.advertise ?
                "Advertised"
                :
                "Advertise"
            }</button>

            <select onChange={(event) => handleChangeStatus(phone?._id, event?.target.value)} defaultValue={phone?.status} className="select select-bordered select-sm">
              <option value={"Available"}>Available</option>
              <option value={"Sold"}>Sold</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
