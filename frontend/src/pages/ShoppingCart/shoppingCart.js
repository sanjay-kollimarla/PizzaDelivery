import { useState, useEffect } from "react"
import deleteIcon from "../../assets/delete_svg_pizza.svg"
import { useNavigate } from "react-router-dom";
import "./shoppingCart.css";

export default function ShoppingCart(props) {
    const [cartItems, setCartItems] = useState(props.cartItems);
    const [selectedIngredients, setSelectedIngredients] = useState(props.selectedIngredients);
    const [subTotal, setSubTotal] = useState(0);
    const [ingredientsCost, setIngredientsCost] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const calculateSubTotal = async () => {
            var total = parseFloat(0).toFixed(2);
            await Promise.all(
                cartItems.map(cartItem => {
                    total = parseFloat(parseFloat(total) + parseFloat(cartItem.quantity * cartItem.price)).toFixed(2)
                })
            )
            setSubTotal(total);
        }
        props.setCartItems(cartItems);
        calculateSubTotal();
    }, [cartItems]);

    useEffect(() => {
        const calculateIngredientsCost = async () => {
            var total = parseFloat(0).toFixed(2);
            await Promise.all(
                selectedIngredients.map(selectedIngredient => {
                    total = parseFloat(parseFloat(total) + parseFloat(selectedIngredient.price)).toFixed(2)
                })
            )
            setIngredientsCost(total);
        }
        props.setSelectedIngredients(selectedIngredients);
        calculateIngredientsCost();

    }, [selectedIngredients]);

    const reduceQuantity = async (ItemId) => {
        var cart_items = await Promise.all(
            cartItems.map(cartItem => {
                if (cartItem.id == ItemId && cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                }
                return cartItem;
            })
        );
        setCartItems([...cart_items]);
    }

    const increaseQuantity = async (ItemId) => {
        var cart_items = await Promise.all(
            cartItems.map(cartItem => {
                if (cartItem.id == ItemId) {
                    cartItem.quantity += 1;
                }
                return cartItem;
            })
        );
        setCartItems([...cart_items]);
    }

    const deleteCartItem = async (ItemId) => {
        var cart_items = await Promise.all(
            cartItems.filter(cartItem => {
                return !(cartItem.id == ItemId);
            })
        );
        setCartItems(cart_items)
    }

    const deleteSelectedIngredient = async (IngredientId) => {
        var selected_ingredients = await Promise.all(
            selectedIngredients.filter(selectedIngredient => selectedIngredient.id != IngredientId)
        );
        setSelectedIngredients(selected_ingredients);
    }

    const clearOrder = () => {
        setCartItems([]);
        setSelectedIngredients([]);
    }

    const changePaymentStatus = (status) => {
        props.setPaymentStatus(true);
        navigate("/order-successfull")
    }

    return (
        <div className="h-100 m-2 container-fluid p-5 gap-3">

            <div className="row">
                <table className="w-75" >
                    <thead className="bg-secondary bg-opacity-25">
                        <tr>
                            <th colspan="6">
                                <h5 className="text-center p-2  fw-bold">
                                    My Cart
                                </h5>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems.length > 0 ?
                                cartItems.map((cartItem, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="">
                                                <div className="h-100 d-flex justify-content-center align-items-center"><img src={cartItem.image} height={100} style={{ minHeight: "80%" }} /></div>
                                            </td>
                                            <td colspan="1" className="" style={{ width: "10%" }}>
                                                <div className={cartItem.type === 'veg' ? "m-auto d-flex align-items-center justify-content-center border border-success p-3" : "m-auto d-flex align-items-center justify-content-center p-3 border border-danger"} style={{ height: "15px", width: "15px" }}>
                                                    <div className={cartItem.type === 'veg' ? "rounded-circle bg-success p-2" : "rounded-circle bg-danger p-2"}></div>
                                                </div>
                                            </td>
                                            <td colspan="1" className="w-25">
                                                <div className="d-flex flex-column h-100 justify-content-around align-items-center">
                                                    <p className="m-0 fw-bolder">{cartItem.name}</p>
                                                    <p className="m-0">₹ {cartItem.price.toFixed(2)}</p>
                                                </div>
                                            </td>
                                            <td colspan="1" className="w-25">
                                                <div className="h-100 d-flex flex-column align-items-center justify-content-around gap-2">
                                                    <b>Quantity</b>
                                                    <div className=" d-flex align-items-center justify-content-center gap-3">
                                                        <div className="btn btn-dark" onClick={() => { reduceQuantity(cartItem.id) }}>-</div>
                                                        <div className="">{cartItem.quantity}</div>
                                                        <div className="btn btn-dark" onClick={() => { increaseQuantity(cartItem.id) }}>+</div>
                                                    </div>
                                                </div>

                                            </td>
                                            <td colspan="1">
                                                <div className="h-100 d-flex flex-column align-items-center justify-content-around gap-3">
                                                    <b>Item Price</b>
                                                    <div className=" d-flex align-items-center justify-content-center gap-3">
                                                        <b>₹ {cartItem.price * cartItem.quantity}</b>
                                                    </div>
                                                </div>
                                            </td>
                                            <td colspan="1">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className="btn btn-danger" onClick={() => { deleteCartItem(cartItem.id) }}>
                                                        <img src={deleteIcon} height={20} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }) :
                                (
                                    <tr >
                                        <td className="w-100 text-center p-5 fw-bold fs-5"> The Cart is empty</td>
                                    </tr>

                                )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="w-100 text-end" colspan="6">
                                <p className="fs-5 m-0 text-dark bg-secondary bg-opacity-25 p-auto pe-5 fw-bold">
                                    Total: &nbsp;
                                    <i className="">
                                        ₹ {subTotal}
                                    </i>
                                </p>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                {/* <div className="col-1"></div> */}
                <table className="ms-auto mb-auto" style={{width: '20%'}}>
                    <thead className="bg-secondary bg-opacity-25">
                        <tr>
                            <th colspan="4" className="w-100">
                                <h7 className="text-center p-3 fw-bold">
                                    Total Bill
                                </h7>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-100">
                    <tr className="w-100">
                            <td colspan="2">
                                <i className="ps-2 fw-bolder"> Pizza</i>
                            </td>
                            <td>
                                <div className="d-flex align-items-center justify-content-center fw-bolder w-100">
                                    ₹ {subTotal}
                                </div>
                            </td>
                        </tr>
                        {/* <tr className="w-100" >
                            <td style={{height: "10vh"}} colspan="2"></td>
                            <td style={{height: "10vh"}}></td>
                        </tr> */}
                        {
                            selectedIngredients.length > 0 &&
                            <tr>
                                <td colspan="4" className="w-100" style={{verticalAlign: "top"}}>

                                    <table className="w-100 h-100">
                                        <thead>
                                            <tr colspan="4">
                                                <th className="ps-2 fs-5">Ingredients</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedIngredients.length > 0 &&
                                                selectedIngredients.map(selectedIngredient => {
                                                    return (
                                                        <tr>
                                                            <td colspan="2" className="ps-2">
                                                                {selectedIngredient.tname}
                                                            </td>
                                                            <td colspan="1" className="ps-2">
                                                                ₹ {selectedIngredient.price.toFixed(2)}
                                                            </td>
                                                            <td colspan="1" className="ps-2">
                                                                <div className="d-flex align-items-center justify-content-center p-1">
                                                                    <div className="btn btn-danger py-1 px-2">
                                                                        <img src={deleteIcon} height={15} onClick={() => { deleteSelectedIngredient(selectedIngredient.id) }} />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>

                                </td>
                            </tr>}
                        {selectedIngredients.length > 0 &&
                            <tr>
                                <td colSpan={2}></td>
                                <td colspan="2">
                                    <div className="w-100 text-center fw-bolder">
                                        ₹{ingredientsCost}
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                    <tfoot className="w-100">
                        <tr >
                            <td colSpan={6}>
                                <p className="fs-5 m-0 text-dark bg-secondary bg-opacity-25 p-auto pe-5 fw-bold text-end">
                                    Total: &nbsp;
                                    <i className="">
                                        ₹ {(parseFloat(subTotal) + parseFloat(ingredientsCost)).toFixed(2)}
                                    </i>
                                </p>
                            </td>

                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center gap-2 mt-3">
                    <button className="btn btn-warning text-dark py-1 px-2 fw-bold" 
                        disabled={parseFloat((parseFloat(subTotal) + parseFloat(ingredientsCost)).toFixed(2)) <= parseFloat(0.00).toFixed(2)}
                        onClick={() => {changePaymentStatus(true)}}
                    >
                        Pay
                    </button>
                    <button className="btn btn-dark text-white py-1 px-2"
                        disabled={parseFloat((parseFloat(subTotal) + parseFloat(ingredientsCost)).toFixed(2)) <= parseFloat(0.00).toFixed(2)}
                        onClick={clearOrder}
                    >
                        Clear
                    </button>
            </div>
        </div>
    )
}

// {
//     props.cartItems.map((cartItem, index) => {
//         return (
//             <tr key={index}>
//                 <td className="w-25">
//                     <img src={cartItem.image} height={100}/>
//                 </td>
//                 <td>
//                     <div className={cartItem.type === 'veg'? "border-1 border-success p-1": "p-1 border-1 border-danger"}>
//                         <div className={cartItem.type === 'veg'? "rounded-circle bg-success p-2": "rounded-circle bg-danger p-2"}></div>
//                     </div>
//                 </td>
//             </tr>
//         )
//     })
// }