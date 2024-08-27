import logo from '../../assets/PizzeriaLogo.png'
import shoppingCartImage from '../../assets/shopping_cart.svg'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3 py-0 ">
            <a className="navbar-brand" href="/">
                <span className='mx-1 me-3 fs-3 my-0' style={{color: 'rgba(255,255,255, 0.55)'}}> Pizzeria</span>
                <img src={logo}  height="50"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/order-pizza">Order Pizza</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Build Your Pizza</a>
                    </li>
                   
                </ul>
            </div>
            <div className='btn btn-warning text-white fw-bold p-auto d-flex gap-1 align-items-center'>
             <img src={shoppingCartImage} height={20}/>
             <span className='m-0 p-0'>Shopping cart</span>    
            </div>
        </nav>
    )
}

export default Navbar;