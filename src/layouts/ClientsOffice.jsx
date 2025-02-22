import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";

export default function ClientsOffice (){

    return (
        <>
            <Navbar></Navbar>
            <Outlet/>
            <MobileNavbar></MobileNavbar>
        </>
    )
}