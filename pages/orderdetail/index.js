import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  OrderContext,
  UserContext,
} from "../../components/contexts/ContextProvider";
import GridGallery from "../../components/photo/grid-gallery";
import { HttpGetOrderDetailByUserIDOrderID } from "../../components/api/RequestAPI";
import { saveAs } from "file-saver";

const OrderDetailPage = () => {
  console.log("Load OrderDetail Page");
  const router = useRouter();
  const { users } = useContext(UserContext);
  const { orders } = useContext(OrderContext);
  const [images, setImages] = useState([]);
  const purchaseHandler = () => {
    router.push({
      pathname: "/purchase",
    });
  };

  const saveFile = () => {
    saveAs(
      "https://nyc3.digitaloceanspaces.com/repro/photos/order/16052022-3332-0004/1654568704794-IMG_20190218_105723.jpg",
      "example.jpg"
    );
  };
  useEffect(async () => {
    console.log("ORDERS ARE: ", orders);
    const getOrderImage = await HttpGetOrderDetailByUserIDOrderID(
      users.userId,
      orders.orderNumber
    );
    console.log(
      "getOrderImage?.data?.data?.images: ",
      getOrderImage?.data?.data?.images
    );
    if (getOrderImage?.data?.data?.images !== undefined) {
      setImages(getOrderImage?.data?.data?.images);
    }
  }, []);

  return (
    <div className="relative ">
      {/*<div>*/}
      {/*    <button onClick={saveFile}>download</button>*/}
      {/*</div>*/}

      <div className="min-h-screen w-full dark:bg-gray-900">
        <div className="flex p-2 mt-4">
          <a
            className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
        hover:bg-teal-600
        bg-teal-600
        text-teal-100
        border duration-200 ease-in-out
        border-teal-600 transition"
            href={"../orderhistory"}
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            back
          </a>

          <div className="flex-auto flex flex-row-reverse">
            <a
              className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
        hover:bg-teal-600
        bg-teal-600
        text-teal-100
        border duration-200 ease-in-out
        border-teal-600 transition"
              onClick={purchaseHandler}
            >
              Purchase
            </a>
          </div>
        </div>
        <GridGallery images={images} paid={0} />
      </div>
    </div>
  );
};
export default OrderDetailPage;
