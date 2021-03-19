import React, {useState} from 'react';
import { Result, Button } from 'antd';
import {Link} from "react-router-dom";

import "antd/dist/antd.css";
import FunFacts from './funfacts';

export default function Successmsg(props)
{
    
    const [redirect, setRedirect]=useState(false);
    if(redirect) return (<FunFacts orderId={props.orderid}/>)
    return(
        
            <div style={{paddingTop:'5em'}}>
                <Result
                    status="success"
                    title="You have successfully placed your order!"
                    subTitle={`Order Id ${props.orderid}`}
                    
                    extra={[
                        
                        <Button type='primary' color={'#855b36'} onClick={()=>setRedirect(true)}>nutrients_funfacts</Button>
                       ,
                        <Link to={`/pending/order/${props.orderid}`}>
                    <Button type="primary" key="console">
                        View Order
                        
                    </Button></Link>,
                    <Link to={`/home`}>
                    <Button key="buy">Continue Shopping</Button></Link>,
                    ]}
                    // subTitle={this.state.random}
                />,
            </div>
    )
    
}

