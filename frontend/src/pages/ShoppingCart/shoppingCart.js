import { useState, useEffect } from "react"

export default function ShoppingCart(props) {
    const [cartItems, setCartItems] = useState(props.cartItems);
    console.log(cartItems)

    // useEffect(() => {
    //     const setQuantityperSelectedItems = async() => {
    //         const cart_items = await Promise.all (
    //             cartItems.map((cartItem) => {
    //                 return {...cartItem, quantity: 1}
    //             })
    //         )
    //         setCartItems(cart_items);
    //     }
    //     setQuantityperSelectedItems();
    // }, []);

    useEffect(() => {
        props.setCartItems(cartItems);
    }, [cartItems]);

    const reduceQuantity = async(ItemId) => {
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

    const increaseQuantity = async(ItemId) => {
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

    const deleteCartItem = async(ItemId) => {
        var cart_items = await Promise.all(
            cartItems.filter(cartItem => {
                return !(cartItem.id == ItemId);
            })
        );
        setCartItems(cart_items)
    }

    return (
        <div className="h-100 m-2">
            <h3 className="text-center p-3 fw-bold"> My Cart</h3>
           <table className="w-100">
                <thead className="bg-secondary bg-opacity-25">
                    <tr>
                        <th colspan="6">
                            <h2 className="text-center p-3"></h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems && cartItems.map((cartItem, index) => {
                            return (
                                <tr key={index}>
                                    <td className="w-25">
                                        <div className="h-100 d-flex justify-content-center align-items-center p-2"><img src={cartItem.image} height={100} style={{minHeight: "80%"}} /></div>
                                    </td>
                                    <td colspan="1" className="" style={{width: "10%"}}>
                                        <div className={cartItem.type === 'veg'? "m-auto d-flex align-items-center justify-content-center border border-success p-3": "m-auto d-flex align-items-center justify-content-center p-3 border border-danger"} style={{height:"15px",width:"15px"}}>
                                            <div className={cartItem.type === 'veg'? "rounded-circle bg-success p-2": "rounded-circle bg-danger p-2"}></div>
                                        </div>
                                    </td>
                                    <td colspan="1" className="w-25">
                                        <div className="d-flex flex-column h-100 justify-content-around align-items-center">
                                            <p className="m-0 fw-bolder">{cartItem.name}</p>
                                            <p className="m-0">₹ {cartItem.price.toFixed(2)}</p>
                                        </div>
                                    </td>
                                    <td colspan="1" className="w-25">
                                        <div className="h-100 d-flex flex-column align-items-center justify-content-around gap-3">
                                            <b>Quantity</b>
                                            <div className=" d-flex align-items-center justify-content-center gap-3">
                                                <div className="btn btn-dark" onClick={() => {reduceQuantity(cartItem.id)}}>-</div>
                                                <div className="">{cartItem.quantity}</div>
                                                <div className="btn btn-dark" onClick={() => {increaseQuantity(cartItem.id)}}>+</div>
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
                                         <div className="btn btn-danger" onClick={() => {deleteCartItem(cartItem.id)}}> delete </div>
                                      </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
           </table>
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