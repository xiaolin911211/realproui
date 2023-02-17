import {Breadcrumb, Button, Carousel} from "flowbite-react";
import {useContext, useEffect, useState} from "react";
import {httpCommonGet} from "../../api/http-request";
import {ContextOrder, UserContext} from "../../contexts/context";
import {MESSAGE_SERVER_ERROR, MESSAGE_UNAUTHORIZED, PAGE_PAYMENT, UNAUTHORIZED_CODE} from "../../common/constants";
import {useNavigate} from "react-router-dom";
import {DisplayMessage, UnauthorizedLogout} from "../../common/sharedComponent";
import {BsFillCartCheckFill} from "react-icons/bs";

const datatest = {
    "code": 200,
    "data": [
        {
            "url": "https://nyc3.digitaloceanspaces.com/repro/photos/order/140722-2576-0002/1676495939992-IMG_20190218_124959.jpg",
            "orderId": "140722-2576-0002",
            "uploadedBy": "62A7F0541BF9BDEBCA7E723B",
            "productTypeId": "1"
        },
        {
            "url": "https://nyc3.digitaloceanspaces.com/repro/photos/order/140722-2576-0002/1676495941677-IMG_20190218_172230.jpg",
            "orderId": "140722-2576-0002",
            "uploadedBy": "62A7F0541BF9BDEBCA7E723B",
            "productTypeId": "1"
        },
        {
            "url": "https://nyc3.digitaloceanspaces.com/repro/photos/order/140722-2576-0002/1676495943524-IMG_20190219_121808.jpg",
            "orderId": "140722-2576-0002",
            "uploadedBy": "62A7F0541BF9BDEBCA7E723B",
            "productTypeId": "1"
        },
        {
            "url": "https://nyc3.digitaloceanspaces.com/repro/photos/order/140722-2576-0002/1676495945038-IMG_20190219_120909.jpg",
            "orderId": "140722-2576-0002",
            "uploadedBy": "62A7F0541BF9BDEBCA7E723B",
            "productTypeId": "1"
        },
        {
            "url": "https://repro.nyc3.digitaloceanspaces.com/photos/order/140722-2576-0002/1676495947325-IMG_20190221_160757.jpg",
            "orderId": "140722-2576-0002",
            "uploadedBy": "62A7F0541BF9BDEBCA7E723B",
            "productTypeId": "1"
        },
        {
            "url": "https://nyc3.digitaloceanspaces.com/repro/photos/order/140722-2576-0002/1676495948419-IMG_20190303_182521.jpg",
            "orderId": "140722-2576-0002",
            "uploadedBy": "62A7F0541BF9BDEBCA7E723B",
            "productTypeId": "1"
        }
    ],
    "msg": "File uploaded",
    "success": true
};
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
        UnauthorizedLogout(isCode,navigate);

        setImages(datatest.data);
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
                            <BsFillCartCheckFill />
                                Payment
                        </Button>
                    </div>
                </div>
                <div className="h-screen w-full">
                    <Carousel slide={true}>
                        {images?.map((item) => (
                        <img
                            style={{height: "100%", width: "auto"}}
                            src={item.url}
                            alt="..."
                        />))}

                    </Carousel>
                </div>
            </div>
        </>
    );
}
export default OrderDetail;