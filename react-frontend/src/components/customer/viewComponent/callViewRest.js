import React from 'react';
import {useParams} from "react-router-dom";

import P2Layout from './viewRestaurant';

function ViewRest() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <P2Layout id={id} />
        </div>
    );
}

export default ViewRest;