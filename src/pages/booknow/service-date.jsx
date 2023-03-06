import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {ACTION_SET_SERVICE_ARRIVE_TIME, ACTION_SET_SERVICE_DATE_TIME} from "../../common/constants";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {Alert} from "flowbite-react";
import {FcHighPriority} from "react-icons/fc";
import {INPUT_BLUE_BG} from "../../common/css-constant";

const ServiceDate = ({propertyData, serviceDates, setServiceDates}) => {

    const selectedDate = new Date(serviceDates?.serviceDatetime);


    const minDate = new Date();
    const maxDate = new Date();
    minDate.setDate(minDate.getDate() + propertyData?.minDateFromToday);
    maxDate.setDate(maxDate.getDate() + propertyData?.maxDateFromToday);
    const shouldDisableDate = date => {
        const blackoutDates = propertyData.disabledDate;
        return blackoutDates.includes(date.toISOString().split('T')[0]);
    };
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <MobileDatePicker
                        label="Prefer Date and Time"
                        inputFormat="YYYY-MM-DD"
                        shouldDisableDate={shouldDisableDate}
                        value={serviceDates?.serviceDatetime}
                        minDate={minDate}
                        maxDate={maxDate}
                        className={INPUT_BLUE_BG}
                        onChange={(newValue) =>
                            setServiceDates({type: ACTION_SET_SERVICE_DATE_TIME, value: newValue})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
            <select
                value={serviceDates?.serviceArriveTime}
                onChange={(e) => setServiceDates({type: ACTION_SET_SERVICE_ARRIVE_TIME, value: e.target.value})}
                className={INPUT_BLUE_BG}
            >
                <option value={"default"}>
                    Choose Arrive Time
                </option>
                {propertyData?.businessHour[selectedDate.getDay()]?.arriveTime?.map((row) => (
                    <option
                        value={row}
                        key={row}
                    >
                        {row}
                    </option>
                ))}
            </select>
            {serviceDates?.serviceArriveTime !==''?<Alert

                color="failure"
                icon={FcHighPriority}
            >
  <span>

      {' '}The chosen preferred service time is not confirmed at this point, we will email/call you to confirm or adjust base on our availability asap during our business hours.
  </span>
            </Alert>:<></>}
        </>
    )
};
export default ServiceDate;