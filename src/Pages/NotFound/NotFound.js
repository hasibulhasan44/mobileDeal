import React from 'react';
import { useContext } from "react";
import { AuthContext } from '../../Context/AuthProvider';
import img from '../../images/notfound404.png'

const NotFound = () => {
    const {myStyle} = useContext(AuthContext);
    return (
        <div style={myStyle} className='h-screen'>
            <img className='mx-auto' src={img} alt="" />
        </div>
    );
};

export default NotFound;