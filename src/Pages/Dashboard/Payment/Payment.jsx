import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";


const Payment = () => {
    const location = useLocation()
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    const myClass = location.state;
    console.log(myClass, 'myclass')
    return (
        <div>
            <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>Pay To Enroll Class</h1>

            <div className="mt-10 w-2/3 ml-12">
                <Elements stripe={stripePromise}>
                    <CheckOutForm price={myClass?.price} myClass={myClass} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;