import React from 'react';
import { Result, Button } from 'antd';
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
export default class NoPage extends React.Component
{
    render()
    {
        return(
            <div>
                <br/><br/>
                <Result
                    status="404"
                    title="404"
                    subTitle="404 No page found"
                    extra={
                        <Link to={`/home`}><Button type="primary">Back Home</Button></Link>}
                />,
            </div>
        )
    }
    
}

