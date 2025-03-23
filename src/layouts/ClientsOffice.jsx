import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import { LocalesProvider } from "../contexts/LocalesContext.jsx"

export default function ClientsOffice() {

    return (
        <>
            <LocalesProvider>
                <Navbar></Navbar>
                <Outlet />
                <MobileNavbar></MobileNavbar>
            </LocalesProvider>
        </>
    )
}