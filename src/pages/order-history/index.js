import {Pagination} from "flowbite-react";
import {useContext, useEffect, useState} from "react";
import Tables from "../../common/tables";
import {
    ACTION_SELECT_ORDER,
    DISPLAY_INIT,
    METHOD_GET,
    ORDER_HISTORY_HEADER,
    PAGE_ORDER_DETAIL,
    TABLE_INI_PAGE_NUM,
    TABLE_RECORD_PER_PAGE
} from "../../common/constants";
import {CommonLoadHttp, DisplayMessage} from "../../common/sharedComponent";
import {useNavigate} from "react-router-dom";
import {ContextOrder, UserContext} from "../../contexts/context";

const OrderHistory = () => {
    const [orderData, setOrderData] = useState([]);
    const [totalPage, setTotalPage] = useState(TABLE_INI_PAGE_NUM);
    const {dispatchOrder} = useContext(ContextOrder);
    const {state} = useContext(UserContext);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        pageNo: TABLE_INI_PAGE_NUM,
        pageSize: TABLE_RECORD_PER_PAGE,
        userId: state.userId
    });
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);

    useEffect(() => {
        httpGetOrders();

    }, [pagination.pageNo]);
    const onPageChange = async (e) => {
        if (e <= totalPage || e > 0) {
            setPagination({...pagination, pageNo: e});
        }
    };

    const httpGetOrders = async () =>{
        const httpResponse = await CommonLoadHttp({
            url: process.env.REACT_APP_URL_GET_ORDER,
            displayMessage,
            setDisplayMessage,
            request: pagination,
            token: state.sessionToken,
            method: METHOD_GET,
            isDisplay: !displayMessage.isSuccess,
            customPageMessage: '',
            navigate: '',
            cache:''
        });
        setOrderData(httpResponse?.isData?.data)
        setTotalPage(httpResponse?.isData?.totalPages);
    }
    const openOrderDetailHandler = (payload) =>{

        dispatchOrder({type: ACTION_SELECT_ORDER, order: {orderId: payload?.orderId}});
        navigate(PAGE_ORDER_DETAIL,{replace: true})
    }



    return (
        <section>
            <div className="flex ...">
                <div className="flex-auto w-64 ...">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                        isSuccess={displayMessage.isSuccess}/>
                        <Tables getOrderList={orderData} openOrderDetailHandler={openOrderDetailHandler} headerCell={ORDER_HISTORY_HEADER} label={'Open'}/>
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
    );
};
export default OrderHistory;
