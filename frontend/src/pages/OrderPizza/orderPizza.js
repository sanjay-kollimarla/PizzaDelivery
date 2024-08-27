import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderPizza() {
    const [pizzasList, setPizzasList] = useState([]);

    // useEffect(() => {
    //     console.log(pizzasList," here are the pizzas list")
    // }, [pizzasList]);

    useEffect(() => {
        const getPizzasList = async () => {
            try {
                var { data: pizzasList } = await axios.get("http://localhost:3005/pizzas/list");
                let { data } = pizzasList;
                setPizzasList(data);
            } catch (e) {
                console.log(e);
                alert("failed to get pizzas list data")
            }
        }
        getPizzasList();
    }, [])

    return (
        <div className="h-100 pt-2 px-5">
            <div className="h-100 d-flex flex-row flex-wrap">
                {pizzasList.map((pizzaDetails, index) => {
                    return (
                        <div key={index} className="w-50 border border-2 border-secondary container mb-2 shadow-lg">
                            <div className='row pt-3'>
                                <div className='col-3 d-flex flex-column align-items-center'>
                                    <h3 className='text-center'>{pizzaDetails.name}</h3>
                                    <div className={pizzaDetails.type === 'veg' ? "bg-success" : "bg-danger"} style={{ height: "15px", width: "15px" }} ></div>
                                    <p className='fw-bold mt-5'>&#8377;{pizzaDetails.price}</p>
                                </div>
                                <div className='col-6 d-flex flex-column'>
                                    <p>{pizzaDetails.description}</p>
                                    <p className=''><b>Ingredients:</b> {pizzaDetails.ingredients.join(",")}</p>
                                    <p className=''><b>Toppings:</b> {pizzaDetails.topping.join(",")}</p>
                                </div>
                                <div className='col-3 d-flex flex-column align-items-center pt-4 gap-3'>
                                    <div className=' w-100 bg-success' style={{height:"35%", backgroundImage: `url(${pizzaDetails.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}} ></div>
                                    <div className='btn btn-warning text-white py-1 px-1 w-100'> Add to cart</div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}