import React from 'react';
import { Input, message, Button, Tooltip, Spin } from 'antd';
import { KeyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import 'material-design-icons/iconfont/material-icons.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class SetKeys extends React.Component {

    state = {
        rest_admin: this.props.user,
        key1: '',
        key2: '',
        exist: false,
        loading: true,
        bloading: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    componentDidMount = async () => {
        // this.id = setTimeout(() => this.setState({ loading: false }), 4000)
        var pointerToThis = this;
        const data = {
            rest_admin: this.state.rest_admin
        }
        await axios.post('http://localhost:4000/api/transaction/checkkeys', data, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            if (res.data) {
                pointerToThis.setState({key1: res.data.publishable_key, key2: res.data.secret_key, exist: true})
            }
            pointerToThis.setState({ loading: false });
        })
            .catch(err => console.log(err))
        // console.log(this.state.user)
    }

    componentWillUnmount() {
        clearTimeout(this.id)
      }

    success = (content) => {
    message.success({
      content: content,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

  error = (content) => {
    message.error({
      content: content,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    saveKeys = () => {
        var pointerToThis = this;
        this.setState({bloading: true})
        const body = {
            rest_admin: this.state.rest_admin,
            key1: this.state.key1,
            key2: this.state.key2
        }
        var api = 'http://localhost:4000/api/transaction/savetransactionkey';
        if(this.state.exist) {
            var api = 'http://localhost:4000/api/transaction/changetransactionkey';
        }
        axios.post(api, body, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            pointerToThis.setState({ bloading: false });
            this.success('Keys Successfully added')
        })
            .catch(err => this.error('Error, something went wrong'))
    }


    render() {
        return (

            <div>
                 
                {this.state.loading ? (
                    <center>
                    <Spin
                        className="spinner"
                        tip="Loading...Please Wait"
                        size="large"
                    />
                    </center>
                ) :
            
            <div>


                {this.props.auth.isAuthenticated ?
                    <center>
                    <div style={{ padding: '1.5em', paddingTop: '6em'}}>
                        <div >
                            <Input
                            placeholder="Enter your Publishable Key"
                            prefix={<KeyOutlined className="site-form-item-icon" />}
                            name='key1'
                            suffix={
                                <Tooltip title="Enter your publishable stripe key">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            defaultValue={this.state.key1}
                            onChange={this.onChange}
                            />
                            <br />
                            <br/>
                            <Input
                            placeholder="Enter your Secret Key"
                            name='key2'
                            prefix={<KeyOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Enter your stripe secret key">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            defaultValue={this.state.key2}
                            onChange={this.onChange}
                            />
                            <br />
                            <br/>
                            <Button class="btn btn-dark" loading={this.state.bloading} onClick={this.saveKeys}>Save Keys</Button>
                            <br/><br/>
                            <h5><b>Note: </b> Once the keys are saved, real keys will not be visible here.</h5>
                        </div>
                    </div>
                    </center>
                : ''}
            </div>
    }</div>
        );

        
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(SetKeys);