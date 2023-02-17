import {useContext} from "react";
import {ContextBookNow} from "../../contexts/context";
import {
    ACTION_SET_ADDITIONAL_COMMENTS,
    ACTION_SET_LOCKBOX_PWD,
    ACTION_SET_POSTAL_CODE,
    ACTION_SET_PROPERTY_SERVICE,
    ACTION_SET_STREET_NAME,
    ACTION_SET_STREET_NUMBER,
    ACTION_SET_UNIT_NUMBER, ACTION_SET_VACANT
} from "../../common/constants";

const ContactInfo = () =>{
    const  {stateBookNow, dispatchBookNow}  = useContext(ContextBookNow);
    return (
        <>
            <form
                id="detail-form"
                className={"block w-full p-3 rounded-lg dark:bg-gray-900"}
            >
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                    <div>
                        <label
                            htmlFor="unitNumber"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Unit Number
                        </label>
                        <input
                            type="text"
                            id="unitNumber"
                            value={stateBookNow.unitNumber}
                            onChange={(e) => dispatchBookNow({type: ACTION_SET_UNIT_NUMBER, value: e.target.value})}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="streetNumber"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Street Number
                        </label>
                        <input
                            type="number"
                            id="streetNumber"
                            value={stateBookNow.streetNumber}
                            onChange={(e) => dispatchBookNow({type: ACTION_SET_STREET_NUMBER, value: e.target.value})}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="streetName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Street Name
                        </label>
                        <input
                            type="text"
                            id="streetName"
                            value={stateBookNow.streetName}
                            onChange={(e) => dispatchBookNow({type: ACTION_SET_STREET_NAME, value: e.target.value})}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="postalCode"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Postal Code
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            value={stateBookNow.postalCode}
                            onChange={(e) => dispatchBookNow({type: ACTION_SET_POSTAL_CODE, value: e.target.value})}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder=""
                            maxLength={6}
                            required={true}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="province"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Province
                        </label>
                        <input
                            type="text"
                            id="province"
                            value={stateBookNow.province}
                            disabled={true}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="ON"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lockBoxPwd"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Lock Box Password
                        </label>
                        <input
                            type="text"
                            id="lockBoxPwd"
                            value={stateBookNow.lockBoxPwd}
                            onChange={(e) => dispatchBookNow({type: ACTION_SET_LOCKBOX_PWD, value: e.target.value})}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder=""
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        checked
                        id="default-radio-1"
                        type="radio"
                        name="default-radio"
                        checked={stateBookNow.vacant}
                        onChange={() => dispatchBookNow({type: ACTION_SET_VACANT, value: true})}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Owner will be away
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="default-radio-2"
                        type="radio"
                        name="default-radio"
                        checked={!stateBookNow.vacant}
                        onChange={() => dispatchBookNow({type: ACTION_SET_VACANT, value: false})}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Owner will be home
                    </label>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="lockBoxPwd"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Comments
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        value={stateBookNow.additionalComments}
                        onChange={(e) => dispatchBookNow({type: ACTION_SET_ADDITIONAL_COMMENTS, value: e.target.value})}
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Your message..."
                    ></textarea>
                </div>
            </form>
        </>
    )
}
export default ContactInfo;