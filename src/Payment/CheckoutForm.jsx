import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import './Payment.css'
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useMySelectedClasses from "../hooks/useMySelectedClass";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({ loader, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [mySelectedClass, refetch] = useMySelectedClasses();
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        console.log('card', card)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('');
            console.log('payment method', paymentMethod)
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('payment intent', paymentIntent)
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = {
                email: user?.email,
                name: user?.displayName,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                cname: loader.cname,
                // quantity: cart.length,
                // cartItems: cart.map(item => item._id),
                // menuItems: cart.map(item => item.menuItemId),
                // status: 'service pending',
                // itemNames: cart.map(item => item.name)
            }

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult.insertedId) {
                        // display confirm

                        fetch(`https://12th-assignment-server-side.vercel.app/payments/status/${loader._id}`,
                            {
                                method: 'PATCH'
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                if (data.modifiedCount) {
                                    
                                    refetch();

                                    fetch(`https://12th-assignment-server-side.vercel.app/payments/enrolls/${loader.cname}`,
                                        {
                                            method: 'PATCH'
                                        })
                                        .then(
                                            Swal.fire({
                                                icon: 'success',
                                                title: `${loader.price} BDT payment successful!`,
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                            
                                        )
                                        navigate('/Dashboard/MyEnrolledClass')
                                }
                            })

                    }
                })
        }


    }

    return (
        <>
            <form className="payment-form" onSubmit={handleSubmit}>
                <CardElement className="card-element"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: 'black',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: 'red',
                            },
                        },
                    }}
                />
                <div className="text-center">
                    <button className="mt-5 btn btn-wide btn-primary text-lg" type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </div>
                {/* disabled={!stripe || !clientSecret || processing} */}
            </form>
            {cardError && <p className="text-red-600 text-center">{cardError}</p>}
            {transactionId && <p className="text-green-400 font-bold text-center">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;