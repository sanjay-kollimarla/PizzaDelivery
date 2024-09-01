import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderPizza(props) {
    const [pizzasList, setPizzasList] = useState([]);
    const [cartItemsIds, setCartItemsIds] = useState({});
    const [cartItems, _setCartItems] = useState(props.cartItems);

   useEffect(() => {
    cartItems.forEach((cartItem) => {
        cartItemsIds[cartItem.id] = true;
    })
   }, []);

    useEffect(() => {
        const getPizzasList = async () => {
            try {
                var { data: pizzasList } = await axios.get("http://localhost:3005/pizzas/list");
                let { data } = pizzasList;
                data = await Promise.all(
                    data.map(pizza => {
                        return {...pizza, quantity: 1};
                    })
                )
                setPizzasList(data);
            } catch (e) {
                console.log(e);
                alert("failed to get pizzas list data")
            }
        }
        getPizzasList();
    }, []);

    useEffect(() => {
        props.setCartItems(cartItems);
    }, [cartItems]);

    const addPizzaToCart = (pizzaDetails) => {
        var cartIds = cartItemsIds;
        cartIds[pizzaDetails.id] = true;
        setCartItemsIds({...cartIds});
       _setCartItems([...cartItems,pizzaDetails]);
    };

    const removePizzaFromCart = async(pizzaDetails) => {

        var cartIds = cartItemsIds;
        cartIds[pizzaDetails.id] = false;
        setCartItemsIds({...cartIds});
        var cart_items = await Promise.all(
            cartItems.filter(cartItem => cartItem.id != pizzaDetails.id)
        )
        _setCartItems([...cart_items]);
    } 

    return (
        <div className="h-100 pt-2 px-5">
            <div className="h-100 d-flex flex-row flex-wrap">
                {pizzasList.map((pizzaDetails, index) => {
                    return (
                        <div key={index} className="border border-2 border-secondary container mb-2  shadow-lg" style={{width:"49.5%"}}>
                            <div className='row pt-3 pb-3'>
                                <div className='col-3 d-flex flex-column align-items-center'>
                                    <h3 className='text-center'>{pizzaDetails.name}</h3>
                                    <div className={pizzaDetails.type === 'veg' ? "m-auto d-flex align-items-center justify-content-center border border-success p-3" : "m-auto d-flex align-items-center justify-content-center p-3 border border-danger"} style={{ height: "15px", width: "15px" }}>
                                        <div className={pizzaDetails.type === 'veg' ? "rounded-circle bg-success p-2" : "rounded-circle bg-danger p-2"}></div>
                                    </div>
                                    <p className='fw-bold mt-5 fs-5'>₹{pizzaDetails.price.toFixed(2)}</p>
                                </div>
                                <div className='col-6 d-flex flex-column'>
                                    <p>{pizzaDetails.description}</p>
                                    <p className=''><b>Ingredients:</b> {pizzaDetails.ingredients.join(", ")}</p>
                                    <p className=''><b>Toppings:</b> {pizzaDetails.topping.join(", ")}</p>
                                </div>
                                <div className='col-3 d-flex flex-column align-items-center jusitfy-content-between gap-3'>
                                    <div className=' w-100' style={{height:"100%", backgroundImage: `url(${pizzaDetails.image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}} ></div>
                                    {
                                        cartItemsIds && cartItemsIds[pizzaDetails.id]?
                                        <div className='btn btn-danger text-white py-1 px-1 w-100' onClick={()=> {removePizzaFromCart(pizzaDetails)}}> Remove</div> :
                                        <div className='btn btn-warning text-white py-1 px-1 w-100' onClick={()=> {addPizzaToCart(pizzaDetails)}}> Add to cart</div> 
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}