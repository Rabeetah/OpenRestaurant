import React from 'react';
import {useParams} from "react-router-dom";

import OrderView from './viewPreviousOrder';

function CallViewOrder() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <OrderView id={id} disabled={true} current={true} />
        </div>
    );
}

export default CallViewOrder;