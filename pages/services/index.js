import React, { useEffect, useRef, useState } from "react";
import useSWRImmutable from "swr";
import {
  HttpGetProducts,
} from "../../components/api/RequestAPI";
import { useRouter } from "next/router";
const ServicesPage = () => {
  const router = useRouter();
  const services = useSWRImmutable(
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
      process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_PRODUCTS,
    HttpGetProducts
  );

  const bookNowHandler = () => {
    // console.log("bookNowHandler", data?.data);

    router.push({
      pathname: "/booknow",
    });
  };
  return (
    <div className="min-h-screen dark:bg-gray-900 ">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services?.data?.data?.data.map((item, index) => (
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="rounded-t-lg object-cover h-48 w-96"
                  src={item.image}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.propertySizeName}
                  </h5>
                </a>
                {item.pricing.map((priceItem) => (
                 priceItem.active == 1 ? (<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                   {priceItem.productName} $
                    {priceItem.price}
                  </p>) : null
                ))}
              </div>
              <button
                onClick={bookNowHandler}
                type="button"
                className="text-gray-900 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center  w-full inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img
          className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg"
          src="https://repro.nyc3.digitaloceanspaces.com/photos/order/160622-4680-0001/1655433999959-IMG_20190219_195302.jpg"
          alt=""
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Photo & Video
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            High Dynamic Range (HDR) real estate photos are created by combining
            varying light exposures and taking the best parts of each one to
            create the perfect interior photo. Here at Odyssey3D, our team of
            Highly Trained Professional Photographers capture unlimited HDR
            photos of every listing’s virtual tour. Our photos make your listing
            stand out on Realtor.ca, allowing you to get more offers on your
            listing! We truly understand the importance of excellent real estate
            virtual tours and we ensure consistent results every-time!
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Photo
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            High Dynamic Range (HDR) real estate photos are created by combining
            varying light exposures and taking the best parts of each one to
            create the perfect interior photo. Here at Odyssey3D, our team of
            Highly Trained Professional Photographers capture unlimited HDR
            photos of every listing’s virtual tour. Our photos make your listing
            stand out on Realtor.ca, allowing you to get more offers on your
            listing! We truly understand the importance of excellent real estate
            virtual tours and we ensure consistent results every-time!
          </p>
        </div>
        <img
          className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg"
          src="https://repro.nyc3.digitaloceanspaces.com/photos/order/160622-4680-0001/1655433999959-IMG_20190219_195302.jpg"
          alt=""
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg"
          src="https://repro.nyc3.digitaloceanspaces.com/photos/order/160622-4680-0001/1655433999959-IMG_20190219_195302.jpg"
          alt=""
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Video
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            High Dynamic Range (HDR) real estate photos are created by combining
            varying light exposures and taking the best parts of each one to
            create the perfect interior photo. Here at Odyssey3D, our team of
            Highly Trained Professional Photographers capture unlimited HDR
            photos of every listing’s virtual tour. Our photos make your listing
            stand out on Realtor.ca, allowing you to get more offers on your
            listing! We truly understand the importance of excellent real estate
            virtual tours and we ensure consistent results every-time!
          </p>
        </div>
      </div>
    </div>
  );
};
export default ServicesPage;
