import React from 'react';
import {useParams} from "react-router-dom";
import PaymentMethods from './stripeCheckout';

function CallPaymentM() {

    const { orderId } = useParams();
    console.log(orderId);

    return (
        <div>
            <PaymentMethods orderId={orderId}/>
        </div>
    );
}

export default CallPaymentM;