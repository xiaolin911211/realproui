import SidebarAdmin from "../../navigation/sidebar";
import {
    MESSAGE_SERVER_ERROR,
    MESSAGE_UNAUTHORIZED,
    TABLE_INI_PAGE_NUM,
    TABLE_RECORD_PER_PAGE,
    UNAUTHORIZED_CODE
} from "../../common/constants";
import {UserContext} from "../../contexts/context";
import {useNavigate} from "react-router-dom";
import {httpCommonGet} from "../../api/http-request";
import {DisplayMessage, UnauthorizedLogout} from "../../common/sharedComponent";
import Tables from "../order-history/tables";
import {Pagination} from "flowbite-react";
import {useContext, useEffect, useState} from "react";

const AdminOrder = () =>{
    const [orderData, setOrderData] = useState([]);
    const [totalPage, setTotalPage] = useState(TABLE_INI_PAGE_NUM);
    const {state} = useContext(UserContext);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        pageNo: TABLE_INI_PAGE_NUM,
        pageSize: TABLE_RECORD_PER_PAGE,
        userId: state.userId
    });
    const [displayMessage, setDisplayMessage] = useState({
        isDisplay: false,
        isMessage: '',
        isSuccess: false,
        loading: false
    });

    useEffect(() => {
        fetchOrderData();
    }, [pagination.pageNo]);
    const onPageChange = async (e) => {
        if (e <= totalPage || e > 0) {
            setPagination({...pagination, pageNo: e});
        }
    };
    const openOrderDetailHandler = (payload) =>{
        // console.log(payload);
        // dispatchOrder({type: ACTION_SELECT_ORDER, order: {'orderId': payload}});
        // navigate(PAGE_ORDER_DETAIL,{replace: true})
    }

    const fetchOrderData = async () => {
        setDisplayMessage({...displayMessage, 'loading': true});
        const fetchOrderDataResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_GET_ORDER, pagination, state.sessionToken);
        setDisplayMessage({...displayMessage, 'loading': false});
        const [isSuccess, isMessage, isCode] = [fetchOrderDataResponse?.data?.success, fetchOrderDataResponse?.data?.msg, fetchOrderDataResponse?.data?.code];
        if (isSuccess) {
            setOrderData(fetchOrderDataResponse?.data?.data)
            setTotalPage(fetchOrderDataResponse?.data?.totalPages);
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

    return(
        <>



        <section>
            <div className="flex ...">
                <SidebarAdmin />
                <div className="flex-auto w-64 ...">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                        isSuccess={displayMessage.isSuccess}/>
                        <Tables getOrderList={orderData} openOrderDetailHandler={openOrderDetailHandler}/>
                        <div className="flex flex-col items-center">
              <span className="text-xl text-gray-700 dark:text-gray-400">
                Page {pagination.pageNo}
              </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <Pagination
                                    currentPage={pagination.pageNo}
                                    onPageChange={onPageChange}
                                    showIcons={true}
                                    totalPages={totalPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
};
export default AdminOrder;