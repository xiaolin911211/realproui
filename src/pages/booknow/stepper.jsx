import {Button} from "flowbite-react";
import {STEP_CONFIRMATION, STEP_PROPERTY_INFO} from "../../common/constants";
import {HiUserAdd} from "react-icons/hi";

export const Stepper = ({steps, heading, itemId}) => {
    return (
        <li className={steps === itemId ? "flex items-center text-blue-600 dark:text-blue-500 space-x-2.5" : "flex items-center text-gray-500 dark:text-gray-400 space-x-2.5"}>
        <span
            className={steps === itemId ?"flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500":"flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400"}>
            {itemId}
        </span>
            <span>
            <h3 className="font-medium leading-tight">{heading}</h3>
        </span>
        </li>
    )
};

export const StepperButton = ({steps, button, onShow,disablePrevious}) => {
    return (
        <>
        {!((steps === STEP_PROPERTY_INFO && button === 'Previous') || (steps === STEP_CONFIRMATION && button === 'Next')) ?
            <Button
                disabled={disablePrevious}
                color="dark"
                pill={true}
                onClick={onShow}
            >
                {button}
            </Button> : <></>}
        </>
    )
};
