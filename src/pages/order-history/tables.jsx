import {Table} from "flowbite-react";

const Tables = ({getOrderList,openOrderDetailHandler,headerCell}) =>{

    return (<>
    <Table hoverable={true} striped={true}>
        <Table.Head>
            {headerCell?.map((row) =>(
            <Table.HeadCell>{row}</Table.HeadCell>))}
        </Table.Head>
        <Table.Body className="divide-y">
            {getOrderList?.map((row) => (
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

    </>);
}
export default Tables;