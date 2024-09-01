import logo from '../../assets/PizzeriaLogo.png'
import shoppingCartImage from '../../assets/shopping_cart.svg'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = (props) => {
    
    const navigate = useNavigate();
    
    const navigatePages = (e) => {
        navigate(`${e.target.value}`);
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-black px-3 py-0 ">
            <Link className="navbar-brand"  to="/">
                <span className='mx-1 me-3 fs-3' style={{color: 'rgba(255,255,255, 0.55)'}}> Pizzeria</span>
                <img src={logo}  height="50"/>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                       
                        <Link className='nav-link' to="/order-pizza">Order Pizza</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/build-your-pizza"  href="#">Build Your Pizza</Link>
                    </li>
                   
                </ul>
            </div>
            <Link className='btn btn-warning text-white fw-bold p-auto d-flex gap-2 align-items-center p-2' to="/shopping-cart" onClick={navigatePages}>
                <img src={shoppingCartImage} height={20}/>
                <span className=''>Shopping cart </span>
                {props.cartItems.length > 0 && <div className='bg-dark text-warning h-100 px-2' style={{borderRadius: '6px'}}>{props.cartItems.length}</div>}    
            </Link>
        </nav>
    )
}

export default Navbar;