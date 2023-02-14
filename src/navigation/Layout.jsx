import {Outlet} from "react-router-dom";
import Navbars from "./navigation";
import {Breadcrumb} from "flowbite-react";

const Layout = () => {
    return (
        <>
            <Navbars/>
            <Breadcrumb aria-label="Default breadcrumb example" />
            <Outlet/>

        </>

    )
}
export default Layout;