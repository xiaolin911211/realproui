import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import {MobileDateTimePicker} from "@mui/x-date-pickers/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import {useContext} from "react";
import {ContextBookNow} from "../../contexts/context";
import {ACTION_SET_SERVICE_DATE_TIME} from "../../common/constants";
import {MobileDatePicker} from "@mui/x-date-pickers";

const ServiceDate = () =>{
    const  {stateBookNow, dispatchBookNow}  = useContext(ContextBookNow);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <MobileDatePicker
                    label="Date mobile"
                    inputFormat="YYYY-MM-DD"
                    value={stateBookNow.serviceDatetime}
                    onChange={(newValue) =>
                             dispatchBookNow({type: ACTION_SET_SERVICE_DATE_TIME, value: newValue})}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    )
};
export default ServiceDate;