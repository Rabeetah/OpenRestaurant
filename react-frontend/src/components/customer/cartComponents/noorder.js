import React from 'react';
import { Result, Button } from 'antd';
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
export default class NoOrder extends React.Component
{
    render()
    {
        return(
            <div>
                <br/><br/>
                <Result
                    status="404"
                    title="404"
                    subTitle="THIS ORDER DOESNOT EXIST"
                    extra={
                        <Link to={`/home`}><Button type="primary">Back Home</Button></Link>}
                />,
            </div>
        )
    }
    
}

