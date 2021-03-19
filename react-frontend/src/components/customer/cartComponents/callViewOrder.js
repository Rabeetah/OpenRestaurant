import React from 'react';
import {useParams} from "react-router-dom";
import Orderhistory from './vieworder';

function ViewOrder() {

    const { orderId } = useParams();
    console.log(orderId);

    return (
        <div>
            <Orderhistory orderId={orderId}/>
        </div>
    );
}

export default ViewOrder;