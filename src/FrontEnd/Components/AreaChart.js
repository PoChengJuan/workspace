import React from 'react';
import { Row, Col } from 'antd';
import './AreaChart.css'
import {
    XAxis, YAxis, CartesianGrid, Tooltip,
    AreaChart, Area,
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
      
  ];

class AreaChartItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:defaultdata,
      startDate:'',
      endDate:''
    }      
  }
  render(){
    return(
      <Row>
        <Col span={24}>
          <div>
            <RangePicker
              defaultValue={[moment(moment().add('day',-7).format('YYYY-MM-DD'), dateFormat), moment(moment().format('YYYY-MM-DD'), dateFormat)]}
              format={dateFormat}
              onChange={this.DatePickerFunction.bind(this)}
            />
            <AreaChart className = "AreaChart"
              width={1500}
              height={700}
              data={defaultdata}
              syncId="anyId"
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </div>
        </Col>
      </Row>      
    )
  }
  DatePickerFunction(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    const{data}=this.state
    axios.get(baseURL+'/ShopData/getIncome',
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
      {
        data.map(item =>
            '日期:'+response.data[0][0],
            '營業額:'+response.data[0][1]
          )
      }
      this.setState({data});
      console.log(this.state.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
    this.setState({
      startDate:dateStrings[0],
      endDate:dateStrings[1]
    })
  }
  componentWillMount() {
    console.log('componentWillMount');
    
    
  }
}

export default AreaChartItem