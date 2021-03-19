import React from 'react';
import {useParams} from "react-router-dom";

import ViewItem from './viewItem';

function CallViewItem() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <ViewItem id={id} />
        </div>
    );
}

export default CallViewItem;