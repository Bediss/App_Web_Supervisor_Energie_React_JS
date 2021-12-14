import React from 'react'
import {FaSpinner} from 'react-icons/fa'
import "../index.css"
const Fetching = () => (
    <div className="fetching" /* style={{ opacity: 0.5 }} */>
        <FaSpinner className="spinner"/>

    </div>
//     <div className="isLoading" >
//         <div className="loading">
//     <div className="loader"></div></div>
// </div>
)
export default Fetching;