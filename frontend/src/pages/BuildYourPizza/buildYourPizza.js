import axios from "axios";
import { useEffect, useState } from "react";
import "./buildyourpizza.css";
export default function BuildYourPizza(props) {
    const [ingredients, setIngredients] = useState([]);
    const [totalCost, setTotalCost] = useState(0.00);
    const [selectedIngredients, setSelectedIngredients] = useState(props.selectedIngredients);

    useEffect(() => {
        var total_cost = totalCost;
        props.selectedIngredients.forEach(selectedIngredient => {
            total_cost += parseFloat(selectedIngredient.price).toFixed(2);
        });
        total_cost = parseFloat(total_cost).toFixed(2);
        setTotalCost(total_cost);
    },[])

    useEffect(() => {
        const getIngredients = async() => {
            const {data} = await axios.get("http://localhost:3005/pizzas/ingredients/list");
            // console.log(data.data)
            setIngredients(data.data);
        }
        getIngredients();
    }, []);

    useEffect(() => {
        props.setSelectedIngredients([...selectedIngredients]);
    }, [selectedIngredients])

    const handleIngredientSelection  = async(event) => {
        var {checked, value, name} = event.target;
        value = parseFloat(value);
        const prevValue = parseFloat(totalCost);
        if (checked) {
            setTotalCost((prevValue+value).toFixed(2));
            var selected_ingredients = selectedIngredients;
            selected_ingredients.push(ingredients[name]);
            setSelectedIngredients([...selectedIngredients]);
        } else {
            setTotalCost((prevValue-value).toFixed(2));
            const filterSelectedIngredients = async() => {
                var removedIngredientId = ingredients[name].id;
                const selected_ingredients = await Promise.all(
                    selectedIngredients.filter( selectedIngredient => selectedIngredient.id != removedIngredientId)
                );
                setSelectedIngredients([...selected_ingredients]);
            }
            filterSelectedIngredients();
        }
    }

    const checkSelectedIngredients = async(id) => {
        const isChecked = await selectedIngredients.some(selectedIngredient => selectedIngredient.id == id);
        return isChecked;
    }

    return (
        <div className="h-100 d-flex flex-column align-items-center w-100 text-center">
           <p>Pizzeria now gives you options to build your own pizza. Customize your pizza by choosing ingredients from the list given below.</p>
            <div className="w-50 p-2">
                <table className="w-100 border border-2">
                    <tbody >
                       {
                        ingredients.map((ingredient, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{width: "50%"}}  className="p-3">
                                        <div className="d-flex justify-content-start">
                                            <img src={ingredient.image} height={70} className=""/>
                                        </div>
                                    </td>
                                    <td className="fw-bold">
                                        <p className="m-0 ms-3 text-start"> {ingredient.tname} &nbsp;&nbsp;&nbsp;&#8377;{ingredient.price.toFixed(2)}</p>
                                    </td>
                                    <td className="p-3">
                                        <div className="d-flex w-100 gap-3 text-warning align-items-center">
                                            <input className="mt-1" 
                                                type="checkbox"
                                                onChange={handleIngredientSelection}
                                                value={ingredient.price.toFixed(2)}
                                                checked={selectedIngredients.some(selectedIngredient => selectedIngredient.id == ingredient.id)}
                                                name={index}    
                                            />
                                            <p className="m-0">Add</p>
                                           
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                       }
                    </tbody>
                   
                </table>
                <div>
                <div className="w-100 p-2  border border-2 border-top-0 container">
                        <div className="row ">
                            <p className=" fw-bold fs-5 text-start col-12" style={{color: 'darkblue'}}>Total Cost: {totalCost}</p>
                        </div>
                        <div className="row d-flex align-items-center justify-content-center">
                            <div className="col-3 btn btn-dark  border-rounded border-warning fs-4 p-2" style={{color:'orange'}}>Build Ur Pizza</div>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}