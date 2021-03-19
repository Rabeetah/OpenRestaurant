import React from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Spin, DatePicker, Card } from 'antd';
import { Bar, Pie, Line, Line as LineChart} from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import GraphPay from './paymentstats';
import '../rastyle.css';
const { RangePicker } = DatePicker

class Graph extends React.Component {
  state = {
    summary: {},
    summary1: {},
    loading: true,
    d1: '2020-12-09T16:04:45.643Z',
    d2: '2020-12-12T16:04:45.643Z',
    restid: this.props.restid,
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    // error : PropTypes.object.isRequired
  }

  componentWillMount = async () => {
    

    var body = {
      restid: this.props.restid,
      status: 'Complete'
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    var pointerToThis = this;
    await axios.post('http://localhost:4000/customer/order/getordersJSON', body, config)
      .then(async (res) => {
        console.log(res)
        await pointerToThis.setState({ summary: res.data , loading:false});
      })
      .catch(err => console.log(err))
    console.log(this.state.summary)
    console.log(this.state.summary.totalCODOrders)
    console.log(this.state.summary.ItemsSummaryList)


  }

  ordersbydate = async () => {
    var body1 = {
      restid: '5f96d3905cb98c2e4816eb33',
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
        await pointerToThis.setState({ summary1: res.data, loading:false});
      })
      .catch(err => console.log(err))
  }

  render() {
    var data = {}
    if (!this.state.loading) {
      var iname = this.state.summary.ItemsSummaryList.map(function (d) { return d.name });
      var iprice = this.state.summary.ItemsSummaryList.map(function (d) { return d.total });
      data = {
        labels: iname,
        datasets: [
          {
            label: 'Item Price',
            // backgroundColor: '#111d2ce0',
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#742774',
              'rgba(75,192,192,1)',
              '#742774',
              'rgba(75,192,192,1)',
              '#742774',
              'rgba(75,192,192,1)',
              '#742774',
              'rgba(75,192,192,1)',
              '#742774',
              'rgba(75,192,192,1)',
              '#742774',
              'rgba(75,192,192,1)',
              '#742774'
            ],
            // borderColor: ' #111d2c',
            borderWidth: 2,
            // minBarLength: 200,
            hoverBackgroundColor: '#111d2c',
            // hoverBorderColor: 'rgba(255,99,132,1)',
            data: iprice
          }
        ]
      };
    }
    var chartOptions = {
      showScale: true,
      showLines: false,

      title: {
        display: true,
        text: 'Sale Bar Chart',
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
            beginAtZero: true,
            min: 0,
            max: 20000
          }
        }]
      }
    }

    ///////////////////////////////////PIE CHART/////////////////////////////

    var datapie = {}
    if (!this.state.loading) {
      datapie = {
        labels: ['COD', 'Card'],
        datasets: [
          {
            label: 'Payment Method',
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#742774'
            ],
            // borderColor: ' #111d2c',
            // borderWidth: 2,
            // minBarLength: 200,
            // hoverBackgroundColor: '#111d2c',
            // hoverBorderColor: 'rgba(255,99,132,1)',
            data: [this.state.summary.totalCODOrders, this.state.summary.totalCardOrders]
          }
        ]
      };
    }
    var piechartOptions = {
      showScale: false,
      showLines: false,

      title: {
        display: true,
        text: 'Payment Pie Chart',
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

    }

    //////////////////////////////////LINE CHART////////////////////////
    var dataline = {}
    if (!this.state.loading) {
      var iname = this.state.summary.ItemsSummaryList.map(function (d) { return d.name });
      var iquantity = this.state.summary.ItemsSummaryList.map(function (d) { return d.quantity });
      dataline = {
        labels: iname,
        datasets: [
          {
            label: 'Item Price',
            // backgroundColor: '#111d2ce0',
            backgroundColor:  'rgba(75,192,192,1)',  
            borderColor: '#742774',
            borderWidth: 2,
            // minBarLength: 200,
            hoverBackgroundColor: '#742774',
            // hoverBorderColor: 'rgba(255,99,132,1)',
            data: iquantity
          }
        ]
      };
    }
    var linechartOptions = {
      showScale: true,
      showLines: true,

      title: {
        display: true,
        text: 'Quantity Chart',
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
            beginAtZero: true,
            min: 0,
            max: 100
          }
        }]
      }
    }

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
        ) : (
            <div>
              {/* <h2>Sales Graph</h2> */}
              <div className="flex-container">
                <div className="flex-item-left">
                <Card style={{boxShadow:'10px 10px 5px grey'}}>
                <Bar
                  data={data}
                  width="400" height="250"
                  options={chartOptions}
                />
                </Card>
                </div>
              <br /><br />
              <div className="flex-item-right">
              <Card style={{boxShadow:'10px 10px 5px grey'}}>
              <Pie
                data={datapie}
                height="180"
                options={piechartOptions}
              />
              </Card>
              </div>
              </div>
              <div className="flex-container2" >
              <div className='flex-item-left2'>
              <Card style={{boxShadow:'10px 10px 5px grey'}}>
              <Line
                data={dataline}
                height="200"
                options={linechartOptions}
              />
              </Card>
              </div>
              <br /><br />
              <div className='flex-item-right2' >
              <GraphPay restid={this.props.restid}/></div>
              </div>
              
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