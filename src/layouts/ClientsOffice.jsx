import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import MobileNavbar from "../Components/mobileNavbar";

export default function ClientsOffice (){

    return (
        <>
            <Navbar></Navbar>
            <Outlet/>
            <MobileNavbar></MobileNavbar>
        </>
    )
}