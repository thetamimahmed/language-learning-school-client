import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CheckOutForm = ({ price, myClass }) => {
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure()
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    // console.log(price, 'checkout')
    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [price, axiosSecure])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }


        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
            console.log('[error]', error);
        } else {
            setCardError('')
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName || 'Annonymus',
                        email: user.email || 'Unknown'
                    },
                },
            }
        );
        if (confirmError) {
            console.log(confirmError)
        }
        console.log(['paymentIntent'], paymentIntent)
        setProcessing(false)
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            const payment = {
                className: myClass.name,
                price: myClass.price,
                classImg: myClass.image,
                instructor: myClass.instructor,
                email: user?.email,
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            axiosSecure.post('/payments', payment)
                .then(data => {
                    console.log(data)
                    if (data.data.insertedId) {
                        axiosSecure.delete(`/bookingclasses?id=${myClass._id}`)
                            .then(() => {
                                axiosSecure.patch(`/classes/${myClass.classID}`, myClass)
                                    .then((data) => {
                                        console.log(data)
                                        Swal.fire({
                                            position: 'center',
                                            icon: 'success',
                                            title: 'Payment Done',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    })
                            })

                    }
                })
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm mt-4 bg-[#317047] hover:bg-[#584B9F] text-white" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className="font-bold text-red-600">{cardError}</p>
            }
            {transactionId && <p className="font-bold text-green-600">Transaction Is Complete, Your Transaction Id: {transactionId}</p>}
        </>
    );
};

export default CheckOutForm;