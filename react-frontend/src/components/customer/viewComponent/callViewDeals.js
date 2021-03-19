import React from 'react';
import {useParams} from "react-router-dom";

import ViewDeals from './viewDeal';

function CallViewDeals() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <ViewDeals id={id} />
        </div>
    );
}

export default CallViewDeals;