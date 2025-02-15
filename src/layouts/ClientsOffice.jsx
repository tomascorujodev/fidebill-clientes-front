import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import MobileNavbar from "../Components/MobileNavbar";

export default function ClientsOffice (){

    return (
        <>
            <Navbar></Navbar>
            <Outlet/>
            <MobileNavbar></MobileNavbar>
        </>
    )
}