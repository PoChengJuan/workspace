import React from 'react';
import { Row, Col,Button,Table } from 'antd';
import './Balance.css'
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


const defaultData = [
  {
    key:1,
    "Date":"2019-06-04",
    "Turnover":"2000",
    "OrderExpense":0,
    "OtherExpense":0
  },
  {
    key:2,
    "Date":"2019-06-12",
    "Turnover":"1345",
    "OrderExpense":"75",
    "OtherExpense":"0"
  }];
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
class BalanceSheet extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:defaultData,
      startDate:'',
      endDate:'',
      chartWidth:1500,
      chartHeight:500
    }      
    this.saveRef = ref => {this.refDom = ref};
    this.updateDimensions = this.updateDimensions.bind(this)
  }
  render(){
    let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: '日期',
        dataIndex: 'Date',
        key: 'Date',
        width:'10%',
        sorter: (a, b) => a.Date.Date - b.Date.Date,
        sortOrder: sortedInfo.columnKey === 'Date' && sortedInfo.order,
      },
      {
        title: '營業額',
        dataIndex: 'Turnover',
        key: 'Turnover',
        width:'30%',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.Turnover - b.Turnover,
        sortOrder: sortedInfo.columnKey === 'Turnover' && sortedInfo.order,
      },
      {
        title: '進貨支出',
        dataIndex: 'OrderExpense',
        key: 'OrderExpense',
        width:'30%',
        sorter: (a, b) => a.OrderExpense - b.OrderExpense,
        sortOrder: sortedInfo.columnKey === 'OrderExpense' && sortedInfo.order,
      },
      {
        title: '雜支',
        dataIndex: 'OtherExpense',
        key: 'OtherExpense',
        width:'30%',
        sorter: (a, b) => a.OtherExpense - b.OtherExpense,
        sortOrder: sortedInfo.columnKey === 'OtherExpense' && sortedInfo.order,
      }
    ];
    return(
      <Row>
        <Col span={24}>
          <div ref={this.saveRef}>
            <RangePicker
              defaultValue={[moment(moment().add('day',-7).format('YYYY-MM-DD'), dateFormat), moment(moment().format('YYYY-MM-DD'), dateFormat)]}
              format={dateFormat}
              onChange={this.DatePickerFunction.bind(this)}
            />
              
            <LineChart
              width={this.state.chartWidth}
              height={this.state.chartHeight}
              data={this.state.data}
              //data={data}
              margin={{
                top: 20, right: 30, left: 20, bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="日期" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Turnover" stroke="#0066FF" label={<CustomizedLabel />} />
              <Line type="monotone" dataKey="OrderExpense" stroke="#77FF00" label={<CustomizedLabel />} />
              <Line type="monotone" dataKey="OtherExpense" stroke="#FF8800" label={<CustomizedLabel />} />

            </LineChart>
            <Table columns={columns} dataSource={this.state.data} size='small' pagination={false} scroll={{ y: 240 }} onChange={this.handleChange} />

          </div>
        </Col>
      </Row>      
    )
  }

  handleChange = (pagination, filters, sorter) => {
    //console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  DatePickerFunction(dates, dateStrings) {
    window.localStorage.setItem("BalancePageDate_Start",dateStrings[0])
    window.localStorage.setItem("BalancePageDate_End",dateStrings[1])

    axios.get(baseURL+'/ShopData/getRangeData',
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

    var Start = window.localStorage.getItem('BalancePageDate_Start');
    var End = window.localStorage.getItem('BalancePageDate_End');

    console.log(Start+"和"+End)
      if(Start === null || End === null){
        axios.get(baseURL+'/ShopData/getRangeData',
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
      }else{
        axios.get(baseURL+'/ShopData/getRangeData',
          {
            params: {
              shopname : window.localStorage.getItem('shopname'),
              branch : window.localStorage.getItem('branch'),
              start:Start,
              end:End
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
    console.log('componentWillMount');
    
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

export default BalanceSheet