import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import home1 from '../../assets/home1.jpg';
import home2 from '../../assets/home2.webp';
import home3 from '../../assets/home3.webp';

const Home = () => {

    return (
     <div className='h-100 d-flex flex-column align-items-stretch'>
        <div className='d-flex flex-column align-items-stretch p-2 px-4' style={{fontSize: '1.3rem'}}>
            <h1 className='text-center'>Our story</h1>
            <div className='' >
                We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
                <br/><br/>
                Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the softest, cheesiest, crunchiest, butteriest Domino's Fresh Pan Pizza. They have been leaving the stage in the middle of a performance and even finding excuses to be disqualified in a football match.
                <br/><br/>
                We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Domino's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
                <br/><br/>
            </div>
            <div className='d-flex justify-content-between align-items-center gap-3'>
                <img src={home1} className='w-25 me-5'/>
                <div className='d-flex flex-column gap-3 w-100 ms-3 text-dark'>
                    <h2>Ingredients</h2>
                    <p>
                        We're ruthless about goodness. We have no qualms about tearing up a day-old
                        lettuce leaf (straight from the farm), or steaming a baby (carrot). Cut. Cut. Chop.
                        Chop. Steam. Steam. Stir Stir. While they're still young and fresh - that's our motto. It
                        makes the kitchen a better place.
                    </p>
                </div>
            </div>
            <div className='d-flex flex-row-reverse justify-content-between align-items-center gap-3'>
                <img src={home2} className='w-25 me-5'/>
                <div className='d-flex flex-column gap-3 w-100 ms-3 text-dark'>
                    <h2>Our Chefs</h2>
                    <p>
                    They make sauces sing and salads dance. They create magic with skill, knowledge, passion, and stirring spoons (among other things). They make goodness so good, it doesn't know what to do with itself. We do though. We send it to you.
                    </p>
                </div>
            </div>
            <div className='d-flex justify-content-between align-items-center gap-3'>
                <img src={home3} className='w-25'/>
                <div className='d-flex flex-column gap-3 w-100 text-dark'>
                    <p className='fs-2'>45min delivery</p >
                </div>
            </div>

        </div>
     </div>
    )
}

export default Home;