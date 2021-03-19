import React from 'react';
import { Table, message, Spin } from 'antd';
import { KeyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import 'material-design-icons/iconfont/material-icons.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
class ViewTransactions extends React.Component {

    state = {
        transactions: [],
        nodata: false,
        loading: true,
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
            rest_id: this.props.restid
        }
        await axios.post('http://localhost:4000/api/transaction/restaurant/gettransactions', data, {
            headers: {
                "content-type": "application/json"
            }
        }).then(async(res) => {
            if (res.data) {
                await res.data.forEach((trans, t) =>{
                    trans.key = t;
                    trans.transactiontime = moment(trans.transactiontime).format("MMMM Do YYYY, h:mm:ss a")
                })
                await pointerToThis.setState({transactions: res.data, loading: false})
            }
            else pointerToThis.setState({ nodata: true, loading: false });
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

    onChangePagination = (pagination, filters, sorter, extra) =>{
    console.log('params', pagination, filters, sorter, extra);
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if(this.state.loading== false && this.state.nodata == true) {
            return (
                <div style={{paddingTop: '5em'}}> 
                <center>
                <h5>No Transaction To View</h5>
                </center>
                </div>
            )
        }
        const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'name',
            sorter: {
            compare: (a, b) => a.name.localeCompare(b.name),
            multiple:5,
            },
        },
        {
            title: 'Transaction Amount',
            dataIndex: 'amount',
            sorter: {
            compare: (a, b) => a.amount - b.amount,
            multiple: 4,
            },
        },
        {
            title: 'Transaction Id',
            dataIndex: 'transactionid',
            sorter: {
            compare: (a, b) => a.transactionid - b.transactionid,
            multiple: 3,
            },
        },
        {
            title: 'Order Id',
            dataIndex: 'order_id',
            sorter: {
            compare: (a, b) => a.order_id - b.order_id,
            multiple: 2,
            },
        },
        {
            title: 'Date and Time',
            dataIndex: 'transactiontime',
            sorter: {
            compare: (a, b) => a.transactiontime.localeCompare(b.transactiontime),
            multiple: 1,
            },
        },
        ];
        

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
                    <div style={{ padding: '1.5em', paddingTop: '1.5em'}}>
                        <div >
                            <Table columns={columns} dataSource={this.state.transactions} onChange={this.onChangePagination} scroll={{ x: 'max-content' }}/>
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

export default connect(mapStateToProps, null)(ViewTransactions);