import React from "react";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import {
  START_YEAR,
  TABLE_NUM_PAGE,
  GET_ORDER_STATUS_URL,
} from "../../components/constant/Constants";
import { useContext, useEffect, useState } from "react";
import { HttpGetOrders, HttpGetStatus } from "../../components/api/RequestAPI";
import { Modal, Table, Pagination } from "flowbite-react";
import useSWRImmutable from "swr";
import { UserContext } from "../../components/contexts/ContextProvider";

const AdminOrdersPage = () => {
  const { users } = useContext(UserContext);
  const currentYear = new Date().getFullYear();
  const totalYear = currentYear - START_YEAR;
  const yearList = [];
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [selectYear, setSelectYear] = useState(null);
  const [selectStatus, setSelectStatus] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const { data, error } = useSWRImmutable(GET_ORDER_STATUS_URL, HttpGetStatus, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log("AdminOrdersPage: ", data);

  for (var index = 0; index <= totalYear; index++) {
    yearList.push(START_YEAR + index);
  }
  useEffect(() => {
    getTableRecords();
  }, []);

  useEffect(() => {
    getTableRecords();
  }, [currentPage, selectYear, selectStatus]);

  const openOrderDetailHandler = (e) => {
    console.log("openOrderDetailHandler", e);
    setOpenEdit(true);
  }

  const selectProductsHandler = (e) => {
    console.log("selectProductsHandler", e);
    const tempStatus = e === "default" ? null : parseInt(e);
    setCurrentPage(1);
    setSelectStatus(tempStatus);
  };
  const selectYearHandler = (e) => {
    const tempYear = e === "default" ? null : parseInt(e);
    console.log("selectYearHandler", tempYear);
    setCurrentPage(1);
    setSelectYear(tempYear);
  };
  const onPageChange = (e) => {
    setCurrentPage(e);
  };

  const getTableRecords = async () => {
    setOrderList([]);
    console.log("Page passed in", currentPage);
    const getOrderHttpRes = await HttpGetOrders(
      users.userId,
      currentPage,
      TABLE_NUM_PAGE,
      selectYear,
      selectStatus
    );

    setTotalPage(getOrderHttpRes.data.totalPages);
    setOrderList(getOrderHttpRes.data.data);
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
                  placeholder="Search "
                />
              </div>
              <div className="relative">
                <select
                  id="propertyService"
                  required={true}
                  // value={selectProduct}
                  onChange={(e) => selectYearHandler(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected value={"default"}>
                    All Years
                  </option>
                  {yearList.map((row) => (
                    <option value={row} key={row}>
                      {row}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <select
                  id="propertyService"
                  required={true}
                  // value={selectProduct}
                  onChange={(e) => selectProductsHandler(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected value={"default"}>
                    All Status Type
                  </option>
                  {data?.data.map((row) => (
                    <option value={row.statusId} key={row.statusId}>
                      {row.description}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Order #</Table.HeadCell>
                <Table.HeadCell>Order Date</Table.HeadCell>
                <Table.HeadCell>Schedule Time</Table.HeadCell>
                <Table.HeadCell>Property Information</Table.HeadCell>
                <Table.HeadCell>Assigned To</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {orderList.map((row) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{row?.orderId}</Table.Cell>
                    <Table.Cell>{row?.created}</Table.Cell>
                    <Table.Cell>{row?.scheduleTime}</Table.Cell>
                    <Table.Cell>
                      {row?.address?.unitNumber +
                        " - " +
                        row?.address?.streetNumber +
                        " " +
                        row.address?.streetName +
                        " , " +
                        row?.address?.city?.name +
                        " , " +
                        row?.address?.province?.name +
                        " " +
                        row?.address?.postalCode}
                    </Table.Cell>
                    <Table.Cell>
                      {row?.assignee?.photographerFirstName}{" "}
                      {row?.assignee?.photographerLastName}
                    </Table.Cell>
                    <Table.Cell>${row?.payment?.total}</Table.Cell>
                    <Table.Cell>{row?.assignee?.photographerEmail}</Table.Cell>
                    <Table.Cell> {row?.status?.name}</Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => openOrderDetailHandler(row?.orderId)}
                      >
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
                  totalPages={totalPage}
                />
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
                Add New User
              </h3>
              <div className="flex flex-col mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  First Name
                </label>

                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="first_name"
                  // value={first_name}
                  // onChange={onChangeFirstName}
                  id="first_name"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="last_name"
                  // value={last_name}
                  // onChange={onChangeLastName}
                  id="last_name"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email
                </label>
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="email"
                  name="email"
                  // value={email}
                  // onChange={onChangeEmail}
                  id="email"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Phone
                </label>
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="phone"
                  // value={phone}
                  // onChange={onChangePhone}
                  id="phone"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Password
                </label>
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="password"
                  // value={password}
                  // onChange={onChangePassword}
                  name="password"
                  id="password"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Confirm Password
                </label>
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="password"
                  // value={confirmpassword}
                  // onChange={onChangeConfirmPassword}
                  name="confirmpassword"
                  id="confirmpassword"
                />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Account Type
                </label>
                {/* <select
                id="accountType"
                required={true}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option selected value={"default"}>
                  Account Type
                </option>
                {USER_ROLES.map((row) => (
                  <option value={row.id} key={row.id}>
                    {row.role}{" "}
                  </option>
                ))}
              </select> */}
              </div>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                // onClick={addUserHandler}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                // onClick={() => setOpen(false)}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
};

export default AdminOrdersPage;
