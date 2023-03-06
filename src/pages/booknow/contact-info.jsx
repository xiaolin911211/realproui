import {
    ACTION_SET_ADDITIONAL_COMMENTS,
    ACTION_SET_POSTAL_CODE,
    ACTION_SET_STREET_NAME,
    ACTION_SET_STREET_NUMBER,
    ACTION_SET_UNIT_NUMBER
} from "../../common/constants";
import {INPUT_BLUE_BG} from "../../common/css-constant";
import {Label} from "flowbite-react";

const ContactInfo = ({contactInfo, setContactInfo}) =>{

    return (
        <>
            <form
                id="detail-form"
                className={"block w-full p-3 rounded-lg dark:bg-gray-900"}
            >
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                    <div>
                        <Label
                            htmlFor="unitNumber"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Unit Number
                        </Label>
                        <input
                            type="text"
                            id="unitNumber"
                            value={contactInfo?.unitNumber}
                            onChange={(e) => setContactInfo({type: ACTION_SET_UNIT_NUMBER, value: e.target.value})}
                            className={INPUT_BLUE_BG}
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="streetNumber"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Street Number
                        </Label>
                        <input
                            type="number"
                            id="streetNumber"
                            value={contactInfo?.streetNumber}
                            onChange={(e) => setContactInfo({type: ACTION_SET_STREET_NUMBER, value: e.target.value})}
                            className={INPUT_BLUE_BG}
                            placeholder=""
                            minLength={3}
                            required={true}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="streetName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Street Name
                        </Label>
                        <input
                            type="text"
                            id="streetName"
                            value={contactInfo?.streetName}
                            onChange={(e) => setContactInfo({type: ACTION_SET_STREET_NAME, value: e.target.value})}
                            className={INPUT_BLUE_BG}
                            placeholder=""
                            required={true}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="postalCode"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Postal Code
                        </Label>
                        <input
                            type="text"
                            id="postalCode"
                            value={contactInfo?.postalCode}
                            onChange={(e) => setContactInfo({type: ACTION_SET_POSTAL_CODE, value: e.target.value})}
                            className={INPUT_BLUE_BG}
                            placeholder=""
                            maxLength={6}
                            required={true}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="province"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Province
                        </Label>
                        <input
                            type="text"
                            id="province"
                            value={contactInfo?.province}
                            disabled={true}
                            className={INPUT_BLUE_BG}
                            placeholder="ON"
                            required
                        />
                    </div>

                </div>

                <br/>
                <div className="mb-6">
                    <Label
                        htmlFor="Comments"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Comments: Important things we need to know, Special request, Lockbox password and etc.....
                    </Label>
                    <textarea
                        id="message"
                        rows="4"
                        value={contactInfo?.additionalComments}
                        onChange={(e) => setContactInfo({type: ACTION_SET_ADDITIONAL_COMMENTS, value: e.target.value})}
                        className={INPUT_BLUE_BG}
                        placeholder="Your message..."
                    ></textarea>
                </div>
            </form>
        </>
    )
}
export default ContactInfo;