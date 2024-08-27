import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/navbar"

const Default = () => {
    return (
        <div className="h-100 w-100">
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Default;