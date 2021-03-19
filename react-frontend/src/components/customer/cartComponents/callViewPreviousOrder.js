import React from 'react';
import {useParams} from "react-router-dom";

import OrderView from './viewPreviousOrder';

function CallViewOrder() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <OrderView id={id} current={false}/>
        </div>
    );
}

export default CallViewOrder;