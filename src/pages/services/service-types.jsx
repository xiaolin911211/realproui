import React from "react";

const ServiceTypes = ({imageUrl, serviceTitle, serviceContent}) =>{
    return(
        <div className="flex justify-center items-center">
        <img
            className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg"
            src={imageUrl}
            alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {serviceTitle}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {serviceContent}
            </p>
        </div>
    </div>);

}
export default ServiceTypes;