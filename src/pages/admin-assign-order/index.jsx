import SidebarAdmin from "../../navigation/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {UserContext} from "../../contexts/context";
const localizer = momentLocalizer(moment);
const AdminAssignOrder = () =>{
    const [events, setEvents] = useState();
    const {state} = useContext(UserContext);
    return (
        <section>
            <div className="flex ...">
                <SidebarAdmin />
                <div className="dark:bg-gray-900 flex-auto w-64 ...">
                    <div className="dark:bg-gray-100 " style={{ height: "500pt" }}>
                        <Calendar
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            defaultDate={moment().toDate()}
                            localizer={localizer}
                            popup={true}
                            // onSelectEvent={handleSelected}
                            eventPropGetter={(events, start, end, isSelected) => ({
                                start,
                                end,
                                isSelected,
                                style: { backgroundColor: events.assignes ? "grey" : "" },
                            })}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AdminAssignOrder;