import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "flowbite-react";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import {
  HttpAssignOrder,
  HttpGetOrders,
} from "../../components/api/RequestAPI";
import { UserContext } from "../../components/contexts/ContextProvider";

const localizer = momentLocalizer(moment);
const AdminAssignPage = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const { users } = useContext(UserContext);
  const [selectStaff, setSelectStaff] = useState();
  const [events, setEvents] = useState();

  const getOrderHistory = async (userId) => {
    const getOrderHttpRes = await HttpGetOrders(userId, "", 99);
    const filterOrderHistory = [];
    for (let i = 0; i < getOrderHttpRes?.data?.data?.length; i++) {
      let tempProducts = "";
      for (let x = 0; x < getOrderHttpRes.data.data[i].products.length; x++) {
        tempProducts =
          tempProducts +
          getOrderHttpRes.data.data[i].products[x].description +
          " , ";
      }
      let tempTime = new Date(getOrderHttpRes.data.data[i].scheduleTime);
      filterOrderHistory.push({
        orderId: getOrderHttpRes.data.data[i].orderId,
        title:
          getOrderHttpRes.data.data[i].address?.unitNumber +
          " " +
          getOrderHttpRes.data.data[i].address.streetNumber +
          " " +
          getOrderHttpRes.data.data[i].address.streetName +
          " " +
          getOrderHttpRes.data.data[i].address?.city?.name +
          " " +
          getOrderHttpRes.data.data[i].address?.province?.name +
          " " +
          getOrderHttpRes.data.data[i].address.postalCode,
        service: tempProducts,
        // 'start':  getOrderHttpRes.data.data[i].scheduleTime ,
        // 'end':  getOrderHttpRes.data.data[i].scheduleTime,
        start: new Date(
          tempTime.getFullYear(),
          tempTime.getMonth(),
          tempTime.getDate(),
          tempTime.getHours(),
          tempTime.getMinutes()
        ),
        end: new Date(
          tempTime.getFullYear(),
          tempTime.getMonth(),
          tempTime.getDate(),
          tempTime.getHours(),
          tempTime.getMinutes()
        ),
        assignes: getOrderHttpRes.data.data[i].assignee,
      });
    }
    console.log(filterOrderHistory);
    setEvents(filterOrderHistory);
  };

  useEffect(() => {
    getOrderHistory(users.userId);
  }, []);
  const handleSelected = (event) => {
    setSelectStaff("");
    setSelectedEvent(event);
    setOpen(true);
    console.info("[handleSelected - event]", event.assigned);
  };
  const assignOrderHandler = async () => {
    const HttpAssignOrderResponse = await HttpAssignOrder(
      selectedEvent.orderId,
      "62AA90EE0E09843D088C7F15"
    );

    setOpen(false);
    getOrderHistory(users.userId);
  };
  const [isOpen, setOpen] = useState(false);

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
                    services:{" "}
                    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {selectedEvent.service}
                    </label>
                  </label>
                  <label
                    htmlFor="email"
                    className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                  >
                    assignedTo:{" "}
                    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {selectedEvent?.assignes?.photographerFirstName}{" "}
                      {selectedEvent?.assignes?.photographerLastName}
                    </label>
                  </label>

                  <label
                    htmlFor="email"
                    className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                  >
                    Scheduled Time:{" "}
                    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {selectedEvent.start + ""}
                    </label>
                  </label>
                </div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Assign to Staff
                </label>
                <select
                  id="staff"
                  value={selectStaff}
                  onChange={(e) => setSelectStaff(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected></option>
                  <option value="US">Xiao Lin</option>
                  <option value="CA">Even Chen</option>
                  <option value="FR">Bob Joe</option>
                  <option value="DE">Tleus Msk</option>
                </select>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  onClick={assignOrderHandler}
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
        </div>
      </div>
    </section>
  );
};

export default AdminAssignPage;
