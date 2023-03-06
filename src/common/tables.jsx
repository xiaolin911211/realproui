import {Button, Table} from "flowbite-react";

const Tables = ({getOrderList,openOrderDetailHandler,headerCell, label, userList}) =>{
 

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
                    <Table.Cell>{userList?.filter((item=>item.userId===row?.userId))[0].firstName + ' ' + userList?.filter((item=>item.userId===row?.userId))[0].lastName}</Table.Cell>
                    <Table.Cell>{row?.scheduleDate + ' ' + row?.arriveTime}</Table.Cell>
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
                       ${row?.payment?.totalBeforeTax}
                    </Table.Cell>
                    <Table.Cell>
                        {" "}
                        {row?.note}
                    </Table.Cell>
                    <Table.Cell> {row?.status?.name}</Table.Cell>
                    <Table.Cell>
                        {" "}
                        <Button
                            onClick={() => openOrderDetailHandler(row)}
                            color={"dark"}
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        >
                            {label}
                        </Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>

    </>);
}
export default Tables;