import { Avatar, Button, Modal, Tabs } from "flowbite-react";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import moment from "moment";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  HttpGetAdminUsers,
  HttpCommonGetSWR,
} from "../../components/api/RequestAPI";

import { USER_TYPE_STAFF } from "../../components/constant/Constants";

const AdminSchedulerPage = () => {
  const localizer = momentLocalizer(moment);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState();
  const [isOpen, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [staff, setStaff] = useState();
  const handlerStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };
  const handlerEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };
  const dataStaffTime = useSWR(
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
      process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_STAFF_UNAVA_TIME,
    HttpCommonGetSWR,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const dataAdminStaff = useSWR(
    {
      url:
        process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
        process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_ADMIN_USERS,
      accountTypeId: USER_TYPE_STAFF,
    },
    HttpGetAdminUsers,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const filterEventsHandler = () => {
    const filterOrderHistory = [];

    for (let i = 0; i < dataStaffTime?.data?.data?.data?.length; i++) {
      let tempStartTime = new Date(
        dataStaffTime?.data?.data?.data[i].startTime
      );
      let tempEndTime = new Date(dataStaffTime?.data?.data?.data[i].endTime);
      filterOrderHistory.push({
        orderId: dataStaffTime?.data?.data?.data[i]?.orderId,
        title: dataStaffTime?.data?.data?.data[i]?.photographerId,
        start: new Date(
          tempStartTime.getFullYear(),
          tempStartTime.getMonth(),
          tempStartTime.getDate(),
          tempStartTime.getHours(),
          tempStartTime.getMinutes()
        ),
        end: new Date(
          tempEndTime.getFullYear(),
          tempEndTime.getMonth(),
          tempEndTime.getDate(),
          tempEndTime.getHours(),
          tempEndTime.getMinutes()
        ),
      });
    }
    console.log(filterOrderHistory);
    setEvents(filterOrderHistory);
  };
  useEffect(() => {
    console.log(dataStaffTime?.data?.data.success);
    console.log(dataAdminStaff?.data?.data?.data);
    if (
      dataStaffTime?.data?.data.success &&
      dataAdminStaff?.data?.data?.success
    ) {
      if (events === undefined) {
        filterEventsHandler();
      }
    }
  }, [dataStaffTime, dataAdminStaff]);

  const handleSelected = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };
  const selectStaffHandler = (e) =>{
    console.log('Select Staff',e)
    setStaff(e);
  };
  const addSchedulerHandler = (e) => {
    
  }
  return (
    <section>
      <div className="flex ...">
        <AdminSideBar />
        <div className="dark:bg-gray-900 flex-auto w-64 ...">
          <div className="dark:bg-gray-100 " style={{ height: "500pt" }}>
            <Calendar
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              localizer={localizer}
              popup={true}
              onSelectEvent={handleSelected}
              eventPropGetter={(events, start, end, isSelected) => ({
                start,
                end,
                isSelected,
                style: { backgroundColor: events.assignes ? "grey" : "" },
              })}
            />
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={() => setAddOpen(true)}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Add Scheduler Time
            </button>
          </div>
          <Modal show={isOpen} size="md" popup onClose={() => setOpen(false)}>
            <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 rounded-lg">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {selectedEvent.title}
                </h3>
                <div className="p-6 text-left">
                  <label
                    htmlFor="email"
                    className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                  >
                    OrderId:{" "}
                    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {selectedEvent.orderId}
                    </label>
                  </label>
                  <label
                    htmlFor="email"
                    className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                  >
                    StartTime:{" "}
                    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {selectedEvent.start + ""}
                    </label>
                  </label>
                  <label
                    htmlFor="email"
                    className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                  >
                    EndTime:{" "}
                    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {selectedEvent.end + ""}
                    </label>
                  </label>
                </div>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  // onClick={assignOrderHandler}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Confirm
                </button>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  cancel
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            show={addOpen}
            size="md"
            popup
            onClose={() => setAddOpen(false)}
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
                  Add New Scheduler
                </h3>
                <div className="flex flex-col mb-4">

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DateTimePicker
                        label="Start Date Time"
                          value={startTime}
                          onChange={handlerStartTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <div className="flex flex-col mb-4">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DateTimePicker
                        label="End Date Time"
                          value={endTime}
                          onChange={handlerEndTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <select
                  id="stafflist"
                     value={staff}
                     onChange={(e) => selectStaffHandler(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected value={"default"}>
                    Choose Staff For Time Off
                  </option>
                  {dataAdminStaff?.data?.data?.data.map((row) => (
                    <option value={row.userId} key={row.userId}>
                      {row.firstName + " " + row.lastName}
                    </option>
                  ))}
                </select>
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
                  onClick={() => setAddOpen(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default AdminSchedulerPage;
