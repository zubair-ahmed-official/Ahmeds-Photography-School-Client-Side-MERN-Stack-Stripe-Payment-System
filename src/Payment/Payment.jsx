import { loadStripe } from "@stripe/stripe-js";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useMySelectedClasses from "../hooks/useMySelectedClass";
import { useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_PK);

const Payment = () => {
    // const [mySelectedClass] = useMySelectedClasses()
    const { id } = useParams();
    const loader = useLoaderData()
    // const [cart] = useCart();
    // const total = cart.reduce((sum, item) => sum + item.price, 0);
    // const price = parseFloat(total.toFixed(2))
    return (
        <div className=""> 
            <h2 className="text-3xl font-bold text-center"> Payment for {loader.cname} </h2>
            <p className="text-2xl font-bold text-center mb-5">Price: {loader.price} BDT</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm loader={loader} price={loader.price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;