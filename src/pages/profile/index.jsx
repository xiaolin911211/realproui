import {UserContext} from "../../contexts/context";
import {useContext} from "react";

const Profile = () => {
    const {state} = useContext(UserContext);

    return (

        <div
            className="h-screen w-full dark:bg-gray-900 "
        >
            <div className="flex h-full justify-center items-center">
                <div
                    className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg"
                             src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg"
                             alt=""/>
                    </a>
                    <div className="flex flex-col items-center">
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Profile</h5>
                        <div
                            className="m-1 mr-2 w-12 h-12 relative flex items-center justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase">{state.initial}
                        </div>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{state.userName}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{state.email}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{state.phone}</span>
                    </div>
                </div>

            </div>

        </div>


    );
};
export default Profile;