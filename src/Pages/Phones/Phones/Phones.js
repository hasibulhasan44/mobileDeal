import React from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import SinglePhone from './SinglePhone/SinglePhone';

const Phones = () => {
    const phones = useLoaderData();
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8'>
            {
                phones?.length > 0 &&
                phones?.map(phone => <SinglePhone
                    key={phone?._id}
                    phone={phone}
                ></SinglePhone>)
            }
        </div>
    );
};

export default Phones;