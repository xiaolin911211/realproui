import SidebarAdmin from "../../navigation/sidebar";
import React, {useContext, useEffect, useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {UserContext} from "../../contexts/context";
import {httpCommonGet, httpCommonPost} from "../../api/http-request";
import {
    ACCOUNT_TYPE_ADMIN, ACCOUNT_TYPE_STAFF, DISPLAY_INIT,

    MESSAGE_SERVER_ERROR, MESSAGE_SUCCESS_UPDATE,
    MESSAGE_UNAUTHORIZED, STATUS_ACTIVE,

    UNAUTHORIZED_CODE
} from "../../common/constants";
import {useNavigate} from "react-router-dom";
import AssignOrderModal from "./modal-edit";
import {DisplayMessage, DisplayMessagesToUI, UnauthorizedLogout} from "../../common/sharedComponent";

const localizer = momentLocalizer(moment);
const AdminAssignOrder = () => {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [events, setEvents] = useState();
    const [assignOpen, setAssignOpen] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const {state} = useContext(UserContext);
    const [pagination, setPagination] = useState({
        year: new Date().getFullYear(),
        userId: state.userId
    });
    const navigate = useNavigate();
    useEffect(()=>{
        fetchOrderAndUserData();
    },[pagination]);
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);


    const fetchOrderAndUserData = async () => {
        setDisplayMessage({...displayMessage, 'loading': true});
        const fetchOrderDataResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_GET_ORDER, pagination, state.sessionToken);
        const getUserListResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_GET_ADMIN_USERS, {}, state.sessionToken);
        const [userIsSuccess, userList] = [getUserListResponse?.data?.success, getUserListResponse?.data?.data];
        const [isSuccess, isMessage, isCode, isData] = [fetchOrderDataResponse?.data?.success, fetchOrderDataResponse?.data?.msg, fetchOrderDataResponse?.data?.code, fetchOrderDataResponse?.data?.data];
        setDisplayMessage({...displayMessage, 'loading': false});

        if (isSuccess && userIsSuccess) {
            const filterOrderHistory = [];
            setUserLists(userList.filter(user => (user.accountTypeId.id === ACCOUNT_TYPE_STAFF) && (user.status.id === STATUS_ACTIVE)));
            for (let i = 0; i < isData.length; i++) {
                let tempProducts = "";
                for (let x = 0; x < isData[i].products.length; x++) {
                    tempProducts =
                        tempProducts +
                        isData[i].products[x].description +
                        " , ";
                }
                let tempTime = new Date(isData[i].scheduleTime);
                filterOrderHistory.push({
                    orderId: isData[i].orderId,
                    title:
                        isData[i].address?.unitNumber +
                        " " +
                        isData[i].address.streetNumber +
                        " " +
                        isData[i].address.streetName +
                        " " +
                        isData[i].address?.city?.name +
                        " " +
                        isData[i].address?.province?.name +
                        " " +
                        isData[i].address.postalCode,
                    service: tempProducts,
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
                    assignes: isData[i].assignee,
                });
            }
            setEvents(filterOrderHistory);
        } else {
            DisplayMessagesToUI({setDisplayMessage,isDisplay: true, isSuccess : isSuccess,isCode,isMessage,customPageMessage:MESSAGE_SERVER_ERROR,navigate});
        }
    };
    const onSelectCalendar = (e) =>{
        //check if same year else reload data
        if (pagination.year !== moment(e).toDate().getFullYear()){
            setPagination({...pagination,year: moment(e).toDate().getFullYear()});
        }
    };
    const onSelectEventHandler = (e) =>{

        const selectEventValue = e;
        selectEventValue.assignStaff = '';
        setSelectedEvent(selectEventValue);
        setAssignOpen(true);
    };

    const onClickUpdateAssign = async () =>{
        setAssignOpen(false);
        const updateParam = {
            orderId: selectedEvent.orderId,
            photographerId: selectedEvent.assignStaff,
        };

        setDisplayMessage({...displayMessage, loading: true});
        const updateAssignOrderResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_POST_ASSIGN_ORDER, updateParam , state.sessionToken);
        const [isSuccess, isMessage, isCode] = [updateAssignOrderResponse?.data?.success, updateAssignOrderResponse?.data?.msg, updateAssignOrderResponse?.data?.code];
        if (isSuccess){
            setPagination({
                year: new Date().getFullYear(),
                userId: state.userId
            })
        }
        DisplayMessagesToUI({setDisplayMessage,isDisplay: true, isSuccess : isSuccess,isCode,isMessage,customPageMessage:MESSAGE_SUCCESS_UPDATE,navigate});
    };
    return (
        <section>
            <div className="flex ...">
                <SidebarAdmin/>
                <div className="dark:bg-gray-900 flex-auto w-64 ...">
                    <div className="dark:bg-gray-100 " style={{height: "500pt"}}>
                        <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage} isSuccess={displayMessage.isSuccess}/>
                        <Calendar
                            events={events}
                            startAccessor="start"
                            onNavigate={(e)=>onSelectCalendar(e)}
                            endAccessor="end"
                            defaultDate={moment().toDate()}
                            localizer={localizer}
                            popup={true}
                            onSelectEvent={onSelectEventHandler}
                            eventPropGetter={(events, start, end, isSelected) => ({
                                start,
                                end,
                                isSelected,
                                style: {backgroundColor: events.assignes ? "grey" : ""},
                            })}
                        />
                    </div>
                    <AssignOrderModal onClose={()=>setAssignOpen(false)} assignOpen={assignOpen} selectedEvent={selectedEvent} setSelectedEvent={(payload)=>setSelectedEvent(payload)} userList={userLists} onClickUpdateAssign={onClickUpdateAssign}   />
                  </div>
            </div>
        </section>
    );
};
export default AdminAssignOrder;