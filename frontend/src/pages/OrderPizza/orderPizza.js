import {useEffect, useState} from 'react';

export default function OrderPizza() {
    const [pizzasList, setPizzasList] = useState([]);

    useEffect(() => {
        console.log("here are the pizzas list", pizzasList);
    }, [])

    return (
        <div className="h-100 pt-2 px-5">
            <div className="h-100"></div>
        </div>
    )
}