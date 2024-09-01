import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkMark from "../../assets/check_mark.svg"

export default function SuccessfulOrder({paymentStatus, setPaymentStatus, setCartItems,setSelectedIngredients}) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!paymentStatus) {
            navigate("/")
        }
        return () => {
            clearCart();
        }
    }, []);

    const clearCart = () => {
        setCartItems([]);
        setSelectedIngredients([]);
        navigate("/order-pizza");
    }



    return (
        <div className="h-100 w-100 container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 p-4">
                    <div className="d-flex flex-column align-items-center gap-5 ">
                        <h1><b>Order Successfull!</b></h1>
                         <div className="border border-5 border-success p-4 rounded-circle">
                            <img src={checkMark}  height={50}/>
                         </div>
                        <div className="btn btn-warning text-dark py-1 px-2 fw-bold" onClick={clearCart}>
                            Continue Shopping
                        </div>
                    </div>
                   
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}