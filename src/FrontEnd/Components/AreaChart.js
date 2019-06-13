import React from 'react';
import { Row, Col,Button } from 'antd';
import './AreaChart.css'
import {
    XAxis, YAxis, CartesianGrid, Tooltip,
    AreaChart, Area,LineChart,Legend,Line
  } from 'recharts';
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import { DatePicker } from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;

  const defaultdata = [
    {
      name: 'Page A', uv: 4000,
    },
    {
      name: 'Page B', uv: 3000,
    },
    {
      name: 'Page C', uv: 2000,
    },
    {
      name: 'Page D', uv: 2780,
    },
    {
      name: 'Page E', uv: 1890,
    },
    {
      name: 'Page F', uv: 2390,
    },
    {
      name: 'Page G', uv: 3490,
    },
    {
        name: 'Page H', uv: 870,
    },
    {
        name: 'Page I', uv: 1490,
    },
    {
        name: 'Page J', uv: 9490,
    },
    {
      name: "2019-06-04",
      uv: "2000"
    },
    {
      name: "2019-06-04",
      uv: "2500"
    }
      
  ];
  const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];
  
  class CustomizedLabel extends React.Component {
    render() {
      const {
        x, y, stroke, value,
      } = this.props;
  
      return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
    }
  }
  
  class CustomizedAxisTick extends React.Component {
    render() {
      const {
        x, y, stroke, payload,
      } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666">{payload.value}</text>
        </g>
      );
    }
  }
class AreaChartItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:defaultdata,
      startDate:'',
      endDate:'',
      chartWidth:1500,
      chartHeight:700
    }      
    this.saveRef = ref => {this.refDom = ref};
    this.updateDimensions = this.updateDimensions.bind(this)
  }
  render(){
    return(
      <Row>
        <Col span={24}>
          <div ref={this.saveRef}>
            <RangePicker
              defaultValue={[moment(moment().add('day',-7).format('YYYY-MM-DD'), dateFormat), moment(moment().format('YYYY-MM-DD'), dateFormat)]}
              format={dateFormat}
              onChange={this.DatePickerFunction.bind(this)}
            />
              <AreaChart className = "AreaChart"
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.data}
                syncId="anyId"
                margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
                  }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="日期" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="營業額" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
            <Button onClick={this.onClick.bind(this)} />
            <LineChart
              width={this.state.chartWidth}
              height={this.state.chartHeight}
              //data={this.state.data}
              data={data}
              margin={{
                top: 20, right: 30, left: 20, bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#FF0000" label={<CustomizedLabel />} />
              <Line type="monotone" dataKey="營業額" stroke="#0000FF" label={<CustomizedLabel />} />

            </LineChart>
          </div>
        </Col>
      </Row>      
    )
  }
  onClick(e){
    const {clientWidth, clientHeight} = this.refDom;
    console.log('====================================');
    console.log(clientWidth, clientHeight, this.refDom);
    console.log('====================================');
    this.setState({
      chartWidth:clientWidth
    })

  }
  DatePickerFunction(dates, dateStrings) {
    axios.get(baseURL+'/ShopData/getIncomeData',
      {
        params: {
          shopname : window.localStorage.getItem('shopname'),
          branch : window.localStorage.getItem('branch'),
          start:dateStrings[0],
          end:dateStrings[1]
        }
      }
    )
    .then( (response) =>{
      this.setState({data:response.data})
      console.log(this.state.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  componentWillMount(e) {
    window.addEventListener("resize", this.updateDimensions);

    console.log('componentWillMount');
    axios.get(baseURL+'/ShopData/getIncomeData',
      {
        params: {
          shopname : window.localStorage.getItem('shopname'),
          branch : window.localStorage.getItem('branch'),
          start:moment().add('day',-7).format('YYYY-MM-DD'),
          end:moment().format('YYYY-MM-DD')
        }
      }
    )
    .then( (response) =>{
      this.setState({data:response.data})
      
      console.log(this.state.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  updateDimensions = (e) => { 
        console.log("AreaChart updateDimensions");
        const {clientWidth, clientHeight} = this.refDom;
    console.log('====================================');
    console.log(clientWidth, clientHeight, this.refDom);
    console.log('====================================');
    this.setState({
      chartWidth:clientWidth
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillUpdate(){
    console.log('componentWillUpdate');
  }
}

export default AreaChartItem