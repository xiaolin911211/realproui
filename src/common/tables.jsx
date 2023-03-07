import {Button, Table} from "flowbite-react";

const Tables = ({getOrderList,openOrderDetailHandler,headerCell, label, userList}) =>{
 

    return (<>
    <Table hoverable={true} striped={true} key='table'>
        <Table.Head>
            {headerCell?.map((row,index) =>(
            <Table.HeadCell key={'a'+index}>{row}</Table.HeadCell>))}
        </Table.Head>
        <Table.Body className="divide-y">
            {getOrderList?.map((row,index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                    <Table.Cell  key={'b'+index}>{row?.orderId}</Table.Cell>
                    <Table.Cell  key={'c'+index}>{row?.created}</Table.Cell>
                    <Table.Cell key={'d'+index}>{userList?.filter((item=>item.userId===row?.userId))[0]?.firstName + ' ' + userList?.filter((item=>item.userId===row?.userId))[0]?.lastName}</Table.Cell>
                    <Table.Cell key={'e'+index}>{row?.scheduleDate + ' ' + row?.arriveTime}</Table.Cell>
                    <Table.Cell key={'f'+index}>
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
                    <Table.Cell key={'g'+index}>
                        {row?.address?.propertyType?.name +
                            " , Size: " +
                            row?.address?.propertySize?.name}
                    </Table.Cell>
                    <Table.Cell key={'h'+index}>
                        {row?.products.map((itemrow) => (
                            <div>{itemrow.description} </div>
                        ))}
                    </Table.Cell>
                    <Table.Cell key={'i'+index}>
                       ${row?.payment?.totalBeforeTax}
                    </Table.Cell>
                    <Table.Cell key={'j'+index}>
                        {" "}
                        {row?.note}
                    </Table.Cell>
                    <Table.Cell key={'k'+index}> {row?.status?.name}</Table.Cell>
                    <Table.Cell key={'l'+index}>
                        {" "}
                        <Button key={'m'+index}
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