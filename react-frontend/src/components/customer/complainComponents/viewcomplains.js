import React from 'react';
import {Card} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ViewComplain extends React.Component
{
    state = {
        complains  : []
    }

    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
    }

    componentDidMount=()=>{
        axios.get('http://localhost:4000/customer/complain/viewcomplain')
        .then(response => this.setState({ complains: response.data }));
    }
    render()
    {
        return(
            <div>
                <br/>
                <h4>CUSTOMER'S COMPLAINS</h4>
                <br/>
                <div>
                {this.state.complains.map(c=>
                <div>
                    <Card>
                        <div>
                            <div>
                                <b>Name</b> <p style={{display:'inline', paddingLeft:'3.75em'}}>{c.name}</p>
                            </div>
                            <div>
                                <b>Email</b> <p style={{display:'inline', paddingLeft:'4em'}}>{c.email}</p> 
                            </div>
                            <div>
                                <b>Subject</b> <p style={{display:'inline', paddingLeft:'3em'}}>{c.subject}</p>
                            </div>
                            <div>
                                <b>Complain</b> <p style={{display:'inline', paddingLeft:'2em'}}>{c.complain}</p>
                            </div>   
                        </div>
                        
                    </Card>
                    <br/>
                    </div>
                    )}
                </div>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});
  
  export default connect(mapStateToProps, null) (ViewComplain);