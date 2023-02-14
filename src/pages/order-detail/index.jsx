import {Breadcrumb, Button, Carousel} from "flowbite-react";
import {useContext, useEffect, useState} from "react";
import {httpCommonGet} from "../../api/http-request";
import {ContextOrder, UserContext} from "../../contexts/context";
import {
    MESSAGE_SERVER_ERROR,
    MESSAGE_UNAUTHORIZED,
    PAGE_LOG_IN, PAGE_PAYMENT, SESSION_ORDER, SESSION_USER,
    UNAUTHORIZED_CODE,
    WAIT_EXECUTE
} from "../../common/constants";
import {useNavigate} from "react-router-dom";
import {DisplayMessage} from "../../common/sharedComponent";

const OrderDetail = () => {
    const {state} = useContext(UserContext);
    const {stateOrder} = useContext(ContextOrder);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [displayMessage, setDisplayMessage] = useState({
        isDisplay: false,
        isMessage: '',
        isSuccess: false,
        loading: false
    });
    useEffect(() => {
        getOrderImages();
    }, []);

    const params = {
        userId: state.userId,
        orderId: stateOrder.orderId,
    };

    const getOrderImages = async () => {
        setDisplayMessage({...displayMessage, loading: false });
        const orderDetailResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_GET_ORDER_DETAILS_USERID_ORDERID, params, state.sessionToken);
        setDisplayMessage({...displayMessage, loading: true });

        const [isSuccess, isMessage, isCode, imageData] = [orderDetailResponse?.data?.success, orderDetailResponse?.data?.msg, orderDetailResponse.data?.code, orderDetailResponse?.data?.data?.images];

        setImages(imageData !== undefined ? imageData : []);

        setDisplayMessage({
            isDisplay: !isSuccess,
            isMessage: isCode === UNAUTHORIZED_CODE ? MESSAGE_UNAUTHORIZED : (isMessage === undefined ? MESSAGE_SERVER_ERROR : isMessage),
            isSuccess: isSuccess,
            loading: false
        });
            // if unauthorized then log out
            if (isCode === UNAUTHORIZED_CODE) {
                setTimeout(function () {
                    sessionStorage.removeItem(SESSION_USER);
                    sessionStorage.removeItem(SESSION_ORDER);
                    navigate(PAGE_LOG_IN, {replace: true});
                }, WAIT_EXECUTE);
            }
    };
    const onClickMakePayment = () =>{
        navigate(PAGE_PAYMENT, {replace: true})
    }
    return (
        <>
            <div class="flex flex-row ...">
                <Breadcrumb.Item
                    href="/orderhistory"
                    // icon={HiHome}
                >
                    Orders
                </Breadcrumb.Item>
                <Breadcrumb.Item
                    href="#"
                    // icon={HiHome}
                >
                    {stateOrder.orderId}
                </Breadcrumb.Item>
            </div>
            <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage} isSuccess={displayMessage.isSuccess}/>
            <div className="min-h-screen w-full dark:bg-gray-900">
                <div className="flex p-2 mt-4">
                    <div className="flex-auto flex flex-row-reverse">
                        <Button
                        onClick={onClickMakePayment}
                        >
                            Payment
                        </Button>
                    </div>
                </div>
                <div className="h-screen w-full">
                    <Carousel slide={true}>
                        <img
                            style={{height: "100%", width: "auto"}}
                            src="https://nyc3.digitaloceanspaces.com/repro/photos/order/16052022-3332-0004/1654568704794-IMG_20190218_105723.jpg"
                            alt="..."
                        />
                        {/*<img*/}
                        {/*    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"*/}
                        {/*    alt="..."*/}
                        {/*/>*/}
                        {/*<img*/}
                        {/*    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"*/}
                        {/*    alt="..."*/}
                        {/*/>*/}
                        {/*<img*/}
                        {/*    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"*/}
                        {/*    alt="..."*/}
                        {/*/>*/}
                        {/*<img*/}
                        {/*    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"*/}
                        {/*    alt="..."*/}
                        {/*/>*/}
                    </Carousel>
                </div>
            </div>
        </>
    );
}
export default OrderDetail;