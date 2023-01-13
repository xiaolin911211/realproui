import { HttpGetOrders } from "../../components/api/RequestAPI";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  OrderContext,
  UserContext,
} from "../../components/contexts/ContextProvider";
import {
  SELECT_ORDER,
  TABLE_NUM_PAGE,
} from "../../components/constant/Constants";
import { Modal, Table, Pagination } from "flowbite-react";

const OrderHistoryPage = () => {
  const router = useRouter();
  const { users } = useContext(UserContext);
  const { dispatchOrder } = useContext(OrderContext);
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getTableRecords();
  }, []);

  useEffect(() => {
    getTableRecords();
  }, [currentPage]);

  const onPageChange = (e) => {
    setCurrentPage(e);
  };
  const openOrderDetailHandler = (orderId) => {
    dispatchOrder({
      type: SELECT_ORDER,
      order: orderList.filter((item) => item.orderId == orderId)[0],
    });
    let pathNameValue = "";
    if (users.accountType === 1) {
      pathNameValue = "orderdetail";
    } else if (users.accountType === 2){
      pathNameValue = "orderdetailstaff";
    }
    router.push({
      pathname: pathNameValue,
      query: { orderId: orderId },
    });
  };

  const getTableRecords = async () => {
    setOrderList([]);
    const getOrderHttpRes = await HttpGetOrders(
      users.userId,
      currentPage,
      TABLE_NUM_PAGE
    );
    setTotalPage(getOrderHttpRes.data.totalPages);
    setOrderList(getOrderHttpRes.data.data);
  };

  return (
    <section>
      <div className="flex ...">
        <div className="flex-auto w-64 ...">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Order #</Table.HeadCell>
                <Table.HeadCell>Order Date</Table.HeadCell>
                <Table.HeadCell>Schedule Time</Table.HeadCell>
                <Table.HeadCell>Destination</Table.HeadCell>
                <Table.HeadCell>Property Information</Table.HeadCell>
                <Table.HeadCell>Services</Table.HeadCell>
                <Table.HeadCell>Comments</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {orderList.map((row) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{row?.orderId}</Table.Cell>
                    <Table.Cell>{row?.created}</Table.Cell>
                    <Table.Cell>{row?.scheduleTime}</Table.Cell>
                    <Table.Cell>
                      {row?.address?.unitNumber +
                        " - " +
                        row?.address?.streetNumber +
                        " " +
                        row.address?.streetName +
                        " , " +
                        row?.address?.city?.name +
                        " , " +
                        row?.address?.province?.name +
                        " " +
                        row?.address?.postalCode}
                    </Table.Cell>
                    <Table.Cell>
                      {row?.address?.propertyType?.name +
                        " , Size: " +
                        row?.address?.propertySize?.name}
                    </Table.Cell>
                    <Table.Cell>
                      {row?.products.map((itemrow) => (
                        <div>{itemrow.description} </div>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      {" "}
                      {row?.accessCode} {row?.note}
                    </Table.Cell>
                    <Table.Cell> {row?.status?.name}</Table.Cell>
                    <Table.Cell>
                      {" "}
                      <button
                        onClick={() => openOrderDetailHandler(row?.orderId)}
                        type="button"
                        className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        Open
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="flex flex-col items-center">
              <span className="text-xl text-gray-700 dark:text-gray-400">
                Page {currentPage}
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <Pagination
                  page={currentPage}
                  currentPage={currentPage}
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
export default OrderHistoryPage;
