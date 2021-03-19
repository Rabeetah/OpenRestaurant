import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../rastyle.css';

const API = 'http://localhost:4000/restaurantadmin/waiter/viewwaiter';
const API1 = 'http://localhost:4000/restaurantadmin/waiter/removewaiter/';

class ViewWaiter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rest: this.props.rest,
      restaurant_waiter: [],
      loading: true
    }
  }


  componentDidMount() {
    // fetch(API)
    //   .then(response => response.json())
    //   .then(data => this.setState({waiters: data }));
    console.log(this.state.rest);
    this.id = setTimeout(() => this.setState({ loading: false }), 2000)
  }

  delwaiter(id) {
    if (window.confirm('Are you sure to remove this waiter?')) {
      fetch(API1 + id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      }

      ).then(function (response) {
        if (response.ok) {
          alert('Record Deleted Successfully')
          window.location.reload(false);
          return true;
        } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
    }
  }

  render() {
    // const { waiters} = this.state;
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
          <div className='tablediv' style={{ marginTop: "50px", marginBottom: "50px"}}>

            <center>

              <TableContainer component={Paper} style={{ width: "90%", border: "1" }} className='tcontainer'>
                <Table aria-label="simple table" className='table' style={{tableLayout:'auto'}}>
                  <TableHead>
                    <TableRow>

                      <TableCell align="none"><b>USERNAME</b></TableCell>
                      <TableCell align="none"><b>EMAIL</b></TableCell>
                      {/* <TableCell/> */}
                      <TableCell align="none"><b>DELETE</b></TableCell>
                      {/*      <TableCell align="none"><b>Edit</b></TableCell>
                        <TableCell align="none"><b>p</b></TableCell>  */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.rest.restaurant_waiter.map(waiter =>
                      <TableRow key={waiter._id}>
                        <TableCell align="none">{waiter.username}</TableCell>
                        <TableCell align="none">{waiter.email}</TableCell>
                        <TableCell align="none" ><Button
                        className="button"
                         variant="danger" size="sm" 
                         onClick={() => this.delwaiter(waiter._id)}>Delete</Button></TableCell>
                        {/*    <TableCell><Button className="button" variant="primary" size="sm" >Edit</Button></TableCell> 
                        <TableCell align="none">{waiter.password}</TableCell> */}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </center>
          </div>
        }
      </div>
    );

  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, null
)(ViewWaiter);