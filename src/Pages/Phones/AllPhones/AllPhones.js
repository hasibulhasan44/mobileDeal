import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SinglePhone from '../Phones/SinglePhone/SinglePhone';

const AllPhones = () => {
    const phones = useLoaderData();
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8'>
            {
                phones?.map(phone => <SinglePhone
                key={phone?._id}
                phone={phone}
                ></SinglePhone>)
            }
        </div>
    );
};

export default AllPhones;