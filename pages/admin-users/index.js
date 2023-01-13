import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import useSWRImmutable from "swr";
import {
  ADMIN_ACCOUNT,
  TABLE_NUM_PAGE,
  USER_ROLES,
  GET_STATUS_URL,
  USER_STAT_ACTIVATED,
  USER_STAT_NOT_ACTIVATED,
  USER_STAT,
} from "../../components/constant/Constants";
import { Modal, Table, Pagination } from "flowbite-react";
import {
  HttpGetAdminUsers,
  HttpRegister,
  HttpUpdateUser,
  HttpGetStatus,
} from "../../components/api/RequestAPI";

const AdminUserPage = () => {
  const dataStatus = useSWRImmutable(GET_STATUS_URL, HttpGetStatus, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [displayUser, setDisplayUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersSize, setUsersSize] = useState(0);
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [userID, setUserID] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [accountTypeId, setAccountTypeId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(2);
  const [displayMSG, setDisplayMSG] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const getUsersHandler = async () => {
    const httpGetAdminUserResponse = await HttpGetAdminUsers({
      url:
        process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
        process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_ADMIN_USERS,
    });
    console.log(httpGetAdminUserResponse?.data?.data);
    setUserList(httpGetAdminUserResponse?.data?.data);
    const startIndex = 0 * TABLE_NUM_PAGE;
    const endIndex = startIndex + TABLE_NUM_PAGE;
    setDisplayUser(
      httpGetAdminUserResponse?.data?.data.slice(startIndex, endIndex)
    );
    setUsersSize(
      Math.ceil(httpGetAdminUserResponse?.data?.data.length / TABLE_NUM_PAGE)
    );
  };

  const onPageChange = (e) => {
    setCurrentPage(e);
    const startIndex = (e - 1) * TABLE_NUM_PAGE;
    const endIndex = startIndex + TABLE_NUM_PAGE;
    setDisplayUser(userList?.slice(startIndex, endIndex));
  };
  useEffect(() => {
    getUsersHandler();
  }, []);

  const deleteUserHandler = async (e) => {
    console.log("deleteUserHandler: ", e);
    setOpenDelete(true);
    setSelectedUser(e);
    setFirstName(e.firstName);
    setLastName(e.lastName);
    setPhone(e.phone);
    setEmail(e.email);
    setUserID(e.userId);
    setUserStatus(e.status);
    setAccountTypeId(e.accountTypeId);
  };

  const onSelectEdit = (e) => {
    setOpenEdit(true);
    console.log("onSelectEdit: ", e);
    setSelectedUser(e);
    setFirstName(e.firstName);
    setLastName(e.lastName);
    setPhone(e.phone);
    setEmail(e.email);
    setUserID(e.userId);
    setUserStatus(e.status);
    setAccountTypeId(e.accountTypeId);
  };
  const clearUserInfo = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setEmail("");
    setUserID("");
    setUserStatus("");
    setAccountTypeId("");
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const addUserButton = () => {
    clearUserInfo();
    setOpen(true);
  };
  const addUserHandler = async (e) => {
    e.preventDefault();

    // if (registrationValidationHandler()) {
    const httpRegisterResponse = await HttpRegister(
      first_name,
      last_name,
      phone,
      email,
      password,
      ADMIN_ACCOUNT
    );
    console.log("addUserHandler httpRegisterResponse: ", httpRegisterResponse);

    if (
      httpRegisterResponse.status === 200 &&
      httpRegisterResponse?.data?.success
    ) {
      getUsersHandler();
      setStatus(1);
      setDisplayMSG(
        "Account registered successfully please check your email to Activate account"
      );
    } else {
      setStatus(0);
      setDisplayMSG(
        httpRegisterResponse?.data?.msg
          ? httpRegisterResponse?.data?.msg
          : "We are experiencing technical difficulties please try again later"
      );
    }
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();
    const httpUserUpdateResponse = await HttpUpdateUser(
      first_name,
      last_name,
      phone,
      email,
      userStatus,
      accountTypeId,
      userID
    );
    console.log(
      "updateUserHandler httpUserUpdateResponse: ",
      httpUserUpdateResponse
    );

    if (
      httpUserUpdateResponse.status === 200 &&
      httpUserUpdateResponse?.data?.success
    ) {
      getUsersHandler();
      setStatus(1);
      setDisplayMSG("Account Updated Successfully");
    } else {
      setStatus(0);
      setDisplayMSG(
        httpRegisterResponse?.data?.msg
          ? httpRegisterResponse?.data?.msg
          : "We are experiencing technical difficulties please try again later"
      );
    }
  };
  const deleteUserHttpHandler = async (e) => {
    e.preventDefault();
    setOpenDelete(false);
  };
  return (
    <section>
      <div className="flex ...">
        <AdminSideBar />
        <div className="flex-auto w-max ...">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="relative text-white text-center	justify-between items-center pb-4 bg-white dark:bg-gray-900 ">
              Users
              <div className="flex">
                <button
                  onClick={addUserButton}
                  type="button"
                  className=" bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center  w-full inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  Add
                </button>
              </div>
            </div>
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Account Type</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {displayUser.map((row) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {" "}
                      {row.firstName} {row.lastName}
                    </Table.Cell>
                    <Table.Cell> {row.email} </Table.Cell>

                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {row?.accountTypeId.id === 1
                        ? "Admin"
                        : row?.accountTypeId.id === 2
                        ? "Agent"
                        : "Photographer"}
                    </Table.Cell>
                    <Table.Cell> {row?.phone} </Table.Cell>
                    <Table.Cell>
                      {" "}
                      <div className="flex items-center">
                        <div
                          className={
                            row?.status.id === USER_STAT_ACTIVATED
                              ? "h-2.5 w-2.5 rounded-full bg-green-400 mr-2"
                              : "h-2.5 w-2.5 rounded-full bg-red-400 mr-2"
                          }
                        ></div>
                        {
                          (dataStatus?.data?.data).filter(
                            (stat) =>
                              stat.type === USER_STAT &&
                              row?.status.id === stat.statusId
                          )[0]?.description
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

                    <Table.Cell>
                      <button onClick={() => deleteUserHandler(row)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
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
                  totalPages={usersSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={open} size="md" popup onClose={() => setOpen(false)}>
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
                value={first_name}
                onChange={onChangeFirstName}
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
                value={last_name}
                onChange={onChangeLastName}
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
                value={email}
                onChange={onChangeEmail}
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
                value={phone}
                onChange={onChangePhone}
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
                value={password}
                onChange={onChangePassword}
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
                value={confirmpassword}
                onChange={onChangeConfirmPassword}
                name="confirmpassword"
                id="confirmpassword"
              />
            </div>
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Account Type
              </label>
              <select
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
              </select>
            </div>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={addUserHandler}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
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
              Update User
            </h3>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                First Name: {selectedUser.firstName}
              </label>

              <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                name="first_name"
                value={first_name}
                onChange={onChangeFirstName}
                id="first_name"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Last Name: {selectedUser.lastName}
              </label>
              <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                name="last_name"
                value={last_name}
                onChange={onChangeLastName}
                id="last_name"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email: {selectedUser.email}
              </label>
              <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                id="email"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Phone: {selectedUser.phone}
              </label>
              <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                name="phone"
                value={phone}
                onChange={onChangePhone}
                id="phone"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                UserID
              </label>
              <input
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={userID}
                disabled={true}
                id="userID"
              />
            </div>
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Account Type
              </label>
              <select
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
              </select>
            </div>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={updateUserHandler}
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

      <Modal
        show={openDelete}
        size="md"
        popup
        onClose={() => setOpenDelete(false)}
      >
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
              Update User
            </h3>
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Delete User: {first_name} {last_name} {phone} {status} {userID}{" "}
                {email}
              </label>
            </div>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={deleteUserHttpHandler}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={() => setOpenDelete(false)}
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

export default AdminUserPage;
