import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/navbar";
import Footer from "../components/Footer/footer";


const Default = (props) => {
    return (
        <div className="h-100 w-100 d-flex flex-column align-items-stretch">
            <div className="position-fixed w-100" style={{height: "10vh"}}>
                <Navbar cartItems={props.cartItems}/>
            </div>
            <div className="flex-grow-2" style={{marginTop: "10vh"}}>
                <Outlet/>
            </div>
            <div className="">
                <Footer/>
            </div>
        </div>
    )
}

export default Default;