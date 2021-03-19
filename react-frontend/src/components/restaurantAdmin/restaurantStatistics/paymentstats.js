import React from 'react';
import axios from 'axios';
import {Spin, DatePicker, Button, Card} from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
const { RangePicker } = DatePicker

class Graph extends React.Component
{
    state = {
    //   summary : {},
      summary1 : {},
      loading: true,
      d1:'2020-12-09T16:04:45.643Z',
      d2:'2020-12-12T16:04:45.643Z',
      restid: this.props.restid
    }

    static propTypes = {
      auth : PropTypes.object.isRequired,
      isAuthenticated : PropTypes.bool,
      // error : PropTypes.object.isRequired
  }

    componentWillMount = async() =>
    {
        await this.ordersbydate()
    }

    ordersbydate = async() =>
    {
        var body1 = {
            restid: this.props.restid,
            status: 'Complete',
            date1: this.state.d1,
            date2: this.state.d2
          }
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          
          var pointerToThis = this;
            await axios.post('http://localhost:4000/customer/order/getordersbydate', body1, config)
            .then(async (res) => {
              console.log(res)
              await pointerToThis.setState({ summary1: res.data, loading: false});
              })
            .catch(err => console.log(err))
    }

    render()
    {
      var dataline ={}
      if(!this.state.loading){
      var iname = this.state.summary1.ItemsSummaryList.map(function(d) {return d.name});
      var iprice = this.state.summary1.ItemsSummaryList.map(function(d) {return d.price});
      var itotal = this.state.summary1.ItemsSummaryList.map(function(d) {return d.total});
      dataline = {
        labels: iname,
        datasets: [
          {
            label: 'Item Price',
            borderColor: "rgba(75,192,192,1)",
            fill: false,
            data: iprice
          },
          {
            label: 'Item Total Sales',
            borderColor: "#742774",
            fill: false,
            data: itotal
          }
        ]
      };
    }
    var linechartOptions = {
      showScale: true,
      showLines: true,
  
      title: {
          display: true,
          text: 'Line Chart For Retail Price And Total Sales',
          fontSize: 17
      },
  
      legend: {
          display: true,
          labels: {
              boxWidth: 30,
              fontSize: 10,
              fontColor: '#bbb',
              padding: 0,
          }
      },
  
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                min: 0,
                max: 20000  
            }
          }]
       }
  }


      return(
        <div>
          {this.state.loading ? (
                <center>
                    <Spin
                    className="spinner"
                    tip="Loading...Please Wait"
                    size="large"
                    />
                </center>
                ) : (
          <div>
              <h6>Get Stats Of Any Time Period</h6>
            <RangePicker onCalendarChange={(value)=> console.log(value)} onChange={(value)=> console.log( this.state.d1 = moment(value[0]._d).format(), this.state.d2=moment(value[1]._d).format())}/>
            <Button type="primary" onClick={()=>this.ordersbydate()}>Get Graph</Button>
            <br/><br/>
            <Card style={{boxShadow:'10px 10px 5px grey'}}>
            <Line
                data={dataline}
                height='190'
                options={linechartOptions}
                />
              </Card>
            </div>
                )}
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Graph);