import {Sidebar} from "flowbite-react";
import { HiChartPie,HiUserCircle,HiShoppingBag } from "react-icons/hi2";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdAssignmentInd } from "react-icons/md";
const SidebarAdmin = () =>{
    return (
        <>
        <Sidebar aria-label="Sidebar with call to action button example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        href="/admindashboard"
                        icon={HiChartPie}

                    >
                     Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item
                        href="/adminorder"
                        icon={HiShoppingBag}
                    >
                        Orders
                    </Sidebar.Item>
                    <Sidebar.Item
                        href="/adminproducts"
                        icon={TbBrandProducthunt}
                    >
                        Products
                    </Sidebar.Item>
                    <Sidebar.Item
                        href="/adminusers"
                        icon={HiUserCircle}
                    >
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item
                        href="/adminassignorder"
                        icon={MdAssignmentInd}
                    >
                        Assign Order
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
        </>
    )
}
export default SidebarAdmin;