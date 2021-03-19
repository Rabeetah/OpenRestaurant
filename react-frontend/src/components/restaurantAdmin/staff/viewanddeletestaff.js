import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, ButtonToolbar} from 'react-bootstrap';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../rastyle.css'

const API = 'http://localhost:4000/restaurantadmin/staff/viewstaff';
const API1 = 'http://localhost:4000/restaurantadmin/staff/removestaff/';

class ViewStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rest: this.props.rest,
      restaurant_staff: [],
      loading: true
    }
  }
  static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
}

  componentDidMount() {
    // fetch(API)
    //   .then(response => response.json())
    //   .then(data => this.setState({staffs: data }));
    console.log(this.state.rest);
    this.id = setTimeout(() => this.setState({ loading: false }), 2000)  
    
  }

    componentWillUnmount() {
      clearTimeout(this.id)
  }

  delstaff(id)
  {
    if(window.confirm('Are you sure to remove this staff member?')){
      fetch(API1+ id, {
        method:'DELETE',
        headers: {  
          "Content-Type": "application/json"
        }
      }
      ).then(function(response) {
        if (response.ok) {
          alert('Record Deleted Successfully')
          window.location.reload(false);
          return true;
              } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }})
    
        }
    }
  
  render() {
    // const { staffs} = this.state;
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
      
      <div style={{marginTop:"50px", marginBottom:"50px"}} className='tablediv'>
        <center>
         <TableContainer component={Paper} style={{width:"90%", border:"1"}}>
      <Table aria-label="simple table" className='table'>
        <TableHead>
          <TableRow>
            <TableCell align="none"><b>USERNAME</b></TableCell>
            <TableCell align="none"><b>EMAIL</b></TableCell>
            <TableCell align="none"><b>DELETE</b></TableCell>      
          </TableRow>
        </TableHead>
        <TableBody>
        {this.props.rest.restaurant_staff.map(staff =>
            <TableRow key={staff._id}>
              <TableCell align="none">{staff.username}</TableCell>
              <TableCell align="none">{staff.email}</TableCell>
              <TableCell><Button className="button" variant="danger" size="sm" onClick={()=>this.delstaff(staff._id)}>Delete</Button></TableCell> 
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
)(ViewStaff);