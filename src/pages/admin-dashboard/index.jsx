import SidebarAdmin from "../../navigation/sidebar";
import {Card} from "flowbite-react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/context";
import {httpCommonGet} from "../../api/http-request";
import {
    ACCOUNT_TYPE_ADMIN, ACCOUNT_TYPE_AGENT, ACCOUNT_TYPE_STAFF,
    DASHBOARD_BG_COLOR, DASHBOARD_HOVER_COLOR,
    DASHBOARD_LABEL, DASHBOARD_USER_LABEL,
    MESSAGE_SERVER_ERROR,
    MESSAGE_UNAUTHORIZED,
    UNAUTHORIZED_CODE
} from "../../common/constants";
import {UnauthorizedLogout} from "../../common/sharedComponent";
import {FcBearish, FcBullish, FcMoneyTransfer} from "react-icons/fc";
const AdminDashboard = () =>{
    const navigate = useNavigate();
    const {state} = useContext(UserContext);
    const [dashBoardData, setDashBoardData] = useState([]);
    const [data, setData] = useState({
        labels: DASHBOARD_LABEL,
        datasets: [
            {
                data: [],
                backgroundColor: DASHBOARD_BG_COLOR,
                hoverBackgroundColor: DASHBOARD_HOVER_COLOR,
            },
        ],
    });
    const [userData, setUserData] = useState({
        labels: DASHBOARD_USER_LABEL,
        datasets: [
            {
                data: [],
                backgroundColor: DASHBOARD_BG_COLOR,
                hoverBackgroundColor: DASHBOARD_HOVER_COLOR,
            },
        ],
    });
    useEffect(()=>{
        fetchDashboardData();
    },[]);
    const [displayMessage, setDisplayMessage] = useState({
        isDisplay: false,
        isMessage: '',
        isSuccess: false,
        loading: false
    });

    const fetchDashboardData = async () => {
        setDisplayMessage({...displayMessage, 'loading': true});
        const fetchDashboardResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_GET_DASHBOARD, {userId: state.userId}, state.sessionToken);
        setDisplayMessage({...displayMessage, 'loading': false});
        const [isSuccess, isMessage, isCode, isData] = [fetchDashboardResponse?.data?.success, fetchDashboardResponse?.data?.msg, fetchDashboardResponse?.data?.code, fetchDashboardResponse?.data?.data];
        if (isSuccess) {
            setDashBoardData(isData);
            const dataSet = {
                labels: DASHBOARD_LABEL,
                datasets: [
                    {
                        data: [(isData?.payment?.unpaid?.total).replace('$', ''), (isData?.payment?.paid?.total).replace('$', ''), (isData?.payment?.refund?.total).replace('$', '')],
                        backgroundColor: DASHBOARD_BG_COLOR,
                        hoverBackgroundColor: DASHBOARD_HOVER_COLOR,
                    },
                ],
            };
            const userDataSet = {
                labels: DASHBOARD_USER_LABEL,
                datasets: [
                    {
                        data: [(isData.users.filter(user => user.accountTypeId.id === ACCOUNT_TYPE_ADMIN)).length, (isData.users.filter(user => user.accountTypeId.id === ACCOUNT_TYPE_AGENT)).length, (isData.users.filter(user => user.accountTypeId.id === ACCOUNT_TYPE_STAFF)).length],
                        backgroundColor: DASHBOARD_BG_COLOR,
                        hoverBackgroundColor: DASHBOARD_HOVER_COLOR,
                    },
                ],
            };
            setData(dataSet);
            setUserData(userDataSet);
        } else {
            setDisplayMessage({
                isDisplay: true,
                isMessage: isCode === UNAUTHORIZED_CODE ? MESSAGE_UNAUTHORIZED : (isMessage === undefined ? MESSAGE_SERVER_ERROR : isMessage),
                isSuccess: isSuccess,
                loading: false
            });
            // if unauthorized then log out
            UnauthorizedLogout(isCode,navigate);
        }
    };
    return (
        <section>
            <div className="flex text-red	 ...">
                <SidebarAdmin />{" "}
                <div class="grid overflow-hidden grid-cols-6 grid-rows-6 gap-2">
                    <div class="box row-start-1 row-end-1 col-start-1 col-end-1">
                        {" "}
                        <Card className="h-full color-white">
                            <FcBullish />
                            Total Revenue {dashBoardData?.payment?.paid?.total}
                        </Card>
                    </div>
                    <div class="box row-start-1 row-end-1 col-start-2 col-end-2">
                        {" "}
                        <Card className="h-full">
                            <FcMoneyTransfer />
                            Total Not Paid {dashBoardData?.payment?.unpaid?.total}
                        </Card>
                    </div>
                    <div class="box row-start-1 row-end-1 col-start-3 col-end-3">
                        {" "}
                        <Card className="h-full">
                            <FcBearish />

                            Total Refunded {dashBoardData?.payment?.refund?.total}
                        </Card>
                    </div>
                    <div class="box row-start-2 row-end-6 col-start-1 col-end-4">
                        {" "}
                        <Card className="h-full">
                            <div>
                                <h2>Total Orders {dashBoardData?.orders?.length}</h2>
                                <Doughnut data={data} width={400} height={400} />
                            </div>
                        </Card>
                    </div>
                    <div class="box row-start-1 row-end-6 col-start-4 col-end-7">
                        {" "}
                        <Card className="h-full">
                            <div>
                                <h2>Total Users {dashBoardData?.users?.length} </h2>
                                <Doughnut data={userData} width={400} height={400} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AdminDashboard;