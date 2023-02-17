import {Button, Table} from "flowbite-react";
import {STATUS_ACTIVE} from "../../common/constants";
import {AiFillEdit} from "react-icons/ai";

const ProductsTable = ({getServiceList,openEditHandler,headerCell}) =>{

    return (<>
        <Table hoverable={true} striped={true}>
            <Table.Head>
                {headerCell?.map((row) =>(
                    <Table.HeadCell key={row}>{row}</Table.HeadCell>))}
            </Table.Head>
            <Table.Body className="divide-y">
                {getServiceList?.map((row) => (

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={row?.productId}>
                        <Table.Cell>
                            {" "}
                            {row?.productId}
                        </Table.Cell>
                        <Table.Cell> {row?.propertySize} </Table.Cell>

                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {row?.productName}
                        </Table.Cell>
                        <Table.Cell> {row?.price} </Table.Cell>
                        <Table.Cell>

                            <div className="flex items-center">
                                <div
                                    className={
                                        row?.active === STATUS_ACTIVE
                                            ? "h-2.5 w-2.5 rounded-full bg-green-400 mr-2"
                                            : "h-2.5 w-2.5 rounded-full bg-red-400 mr-2"
                                    }
                                ></div>
                                {
                                    row?.active === STATUS_ACTIVE
                                        ? "Active"
                                        : "Not Active"
                                }
                            </div>

                        </Table.Cell>

                        <Table.Cell>
                                <Button color="dark" pill={true} onClick={() => openEditHandler(row)}>
                                    <AiFillEdit />
                                </Button>

                        </Table.Cell>

                    </Table.Row>
                ))}
            </Table.Body>
        </Table>

    </>);
}
export default ProductsTable;