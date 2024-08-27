import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/navbar";
import Footer from "../components/Footer/footer";


const Default = () => {
    return (
        <div className="h-100 w-100 d-flex flex-column align-items-stretch">
            <div className="">
                <Navbar/>
            </div>
            <div className="flex-grow-2">
                <Outlet/>
            </div>
            <div className="">
                <Footer/>
            </div>
        </div>
    )
}

export default Default;