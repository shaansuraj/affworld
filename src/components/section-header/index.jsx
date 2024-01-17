import React from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const SectionHeader = ({ topic, arrowNav }) => {
    return (
        <div className='flex flex-row justify-between'>
            <div className='flex'>
                {
                    arrowNav &&
                    <Link to={arrowNav} className='my-auto mx-2' >
                        <IoIosArrowBack className='text-purple-500 text-2xl' />
                    </Link>
                }
                <h3 className='text-yellow-500 text-2xl mx-1' >
                    {topic}
                </h3>
            </div>
            <div className='flex' >
                <span class="dot dot-primary"></span>
                <span class="dot dot-secondary mx-1"></span>
                <span class="dot dot-error"></span>
            </div>
        </div>
    )
}

export default SectionHeader
