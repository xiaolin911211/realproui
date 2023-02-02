import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import {
  TABLE_NUM_PAGE,
} from "../../components/constant/Constants";
import { Modal, Table, Pagination } from "flowbite-react";
import {

  HttpUpdateProducts,
  HttpGetProducts,
} from "../../components/api/RequestAPI";

const AdminProductsPage = () => {
  const [displayProduct, setDisplayProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productSize, setProductsSize] = useState(0);
  const [productList, setProductList] = useState([]);
  const [originalProductList, setOriginalProductList] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
    const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productStatus, setProductStatus] = useState();
  const [status, setStatus] = useState(2);
  const [displayMSG, setDisplayMSG] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const getProductsHandler = async () => {
    const httpGetAdminProductsResponse = await HttpGetProducts(
      process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
      process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_PRODUCTS
    );
    const tempAdminProductsResponse = (httpGetAdminProductsResponse?.data?.data.map((row => row.pricing.map(element  => ({
      productId: element.productId,
      propertySize: row.propertySizeName,
      productName: element.productName,
      price: element.price,
      productStatus: element.active,
  }))))).flat();
     
    setOriginalProductList(tempAdminProductsResponse);
    setProductList(tempAdminProductsResponse);
    const startIndex = 0 * TABLE_NUM_PAGE;
    const endIndex = startIndex + TABLE_NUM_PAGE;
    setDisplayProduct(
      tempAdminProductsResponse?.slice(startIndex, endIndex)
    );
    setProductsSize(
      Math.ceil(tempAdminProductsResponse?.length / TABLE_NUM_PAGE)
    );
    console.log('displayProduct' , tempAdminProductsResponse);
  };

const searchProductsHandler = (e) =>{
  console.log('Search Products ', e.target.value);
  const searchValue = e.target.value;
  const startIndex = 0 * TABLE_NUM_PAGE;
  const endIndex = startIndex + TABLE_NUM_PAGE;
  const productListTemp = originalProductList.filter(product => (product.productName).toLowerCase().includes(searchValue.toLowerCase()));
  setProductList(productListTemp);
  setProductsSize(Math.ceil(productListTemp.length/TABLE_NUM_PAGE));
  setCurrentPage(1);
  setDisplayProduct(productListTemp.slice(startIndex, endIndex));
}

  const selectStatusHandler = (e) => {
    console.log('selectStatusHandler ', e)
    const tempStatus = e === "default" ? null : parseInt(e);
    const startIndex = 0 * TABLE_NUM_PAGE;
    const endIndex = startIndex + TABLE_NUM_PAGE;
    const productListTemp = (e == 'default') ? originalProductList:originalProductList.filter(product => product.productStatus == (tempStatus));
    setProductList(productListTemp);
    setProductsSize(Math.ceil(productListTemp.length/TABLE_NUM_PAGE));
    setCurrentPage(1);
    setDisplayProduct(productListTemp.slice(startIndex, endIndex));
  };

 
  const onPageChange = (e) => {
    console.log('onPageChange ', productList);
    setCurrentPage(e);
    const startIndex = (e - 1) * TABLE_NUM_PAGE;
    const endIndex = startIndex + TABLE_NUM_PAGE;
    setDisplayProduct(productList?.slice(startIndex, endIndex));
  };
  useEffect(() => {
    getProductsHandler();
  }, []);

   

  const onSelectEdit = (e) => {
    setOpenEdit(true);
    console.log("onSelectEdit: ", e);
    setSelectedProduct(e);
    setProductName(e.productName);
    setPrice(e.price);
    setProductStatus(e.productStatus);
    setProductId(e.productId)
  };
  const onChangeProductName = (e) => {
    setProductName(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onChangeStatus= (e) => {
    setProductStatus(e.target.value);
  };



  const updateProductHandler = async (e) => {
    e.preventDefault();
    const httpProductUpdateResponse = await HttpUpdateProducts(
      productId,
      productName,
      price,
      productStatus
    );
    console.log(
      "httpProductUpdateResponse : ",
      httpProductUpdateResponse
    );

    if (
      httpProductUpdateResponse.status === 200 &&
      httpProductUpdateResponse?.data?.success
    ) {
      getProductsHandler();
      setStatus(1);
      setDisplayMSG("Account Updated Successfully");
      setOpenEdit(false);
    } else {
       setStatus(0);
      setDisplayMSG(
        httpProductUpdateResponse?.data?.msg
          ? httpProductUpdateResponse?.data?.msg
          : "We are experiencing technical difficulties please try again later"
      );
    }
  };

  return (
    <section>
      <div className="flex ...">
        <AdminSideBar />
        <div className="flex-auto w-64 ...">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  onChange={searchProductsHandler}
                />
              </div>
              <div className="relative">
                <select
                  id="propertyService"
                  required={true}
                  // value={selectProduct}
                  onChange={(e) => selectStatusHandler(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected value={"default"}>
                    Status
                  </option>
                  
                    <option value={1} key={1}>
                      Active
                    </option>
                         <option value={0} key={0}>
                      Not Active
                    </option>

                </select>
              </div>
            </div>
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Property Size</Table.HeadCell>
                <Table.HeadCell>Product Name</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
               </Table.Head>
              <Table.Body className="divide-y">
                {displayProduct?.map((row) => (
                  
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {" "}
                      {row?.productId} 
                    </Table.Cell>
                    <Table.Cell> {row?.propertySize} </Table.Cell>

                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {row?.productName}
                    </Table.Cell>
                    <Table.Cell> {row?.price} </Table.Cell>
                    <Table.Cell>
                 
                      <div className="flex items-center">
                        <div
                          className={
                            row?.productStatus === 1
                              ? "h-2.5 w-2.5 rounded-full bg-green-400 mr-2"
                              : "h-2.5 w-2.5 rounded-full bg-red-400 mr-2"
                          }
                        ></div>
                    {
                            row?.productStatus === 1
                              ? "Active"
                              : "Not Active"
                          }
                          </div>
              
                    </Table.Cell> 

                    <Table.Cell>
                      <button onClick={() => onSelectEdit(row)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </Table.Cell>

                  </Table.Row>
               ))}
              </Table.Body>
            </Table>
            <div className="flex flex-col items-center">
              <span className="text-xl text-gray-700 dark:text-gray-400">
                Page {currentPage}
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <Pagination
                  page={currentPage}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  showIcons={true}
                  totalPages={productSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
       
      <Modal show={openEdit} size="md" popup onClose={() => setOpenEdit(false)}>
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Update Product
            </h3>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >
                ProductID: {selectedProduct.id}
              </label>

            <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                name="productId"
                value={productId}
                disabled={true}
                id="productId"
              /> 
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Product Name
              </label>
              <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                name="productName"
                value={productName}
                onChange={onChangeProductName}
                id="productName"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Price
              </label>
              <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                name="price"
                value={price}
                onChange={onChangePrice}
                id="price"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Status
              </label>
              <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                name="productStatus"
                value={productStatus}
                onChange={onChangeStatus}
                id="productStatus"
              />
            </div>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={updateProductHandler}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={() => setOpenEdit(false)}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

       
    </section>
  );
};

export default AdminProductsPage;
