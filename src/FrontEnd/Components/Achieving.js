import React from 'react';
import './Achieving.css'
import { DatePicker, Table } from 'antd';
import axios from 'axios'
import baseURL from './AxiosAPI'
import moment from 'moment';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';
const {MonthPicker} = DatePicker;
const monthFormat = 'YYYY-MM';

  const data = [
    {
      name: 'Page A', uv: 4000, pv: 1200, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    }
  ];

class Achieving extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:data,
      month:moment().format('YYY-MM'),
      chartWidth:this.props.Width,
      chartHeight:500,
      
    }      
    this.saveRef = ref => {this.refDom = ref};
    this.updateDimensions = this.updateDimensions.bind(this)
  }
  render(){
    let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: '品項',
        dataIndex: 'title',
        key: 'title',
        width:'10%',
      },
      {
        title: '總進貨',
        dataIndex: '總進貨',
        key: '總進貨',
        width:'30%',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.總進貨 - b.總進貨,
        sortOrder: sortedInfo.columnKey === '總進貨' && sortedInfo.order,
      },
      {
        title: '總銷售',
        dataIndex: '總銷售',
        key: '總銷售',
        width:'30%',
        sorter: (a, b) => a.總銷售 - b.總銷售,
        sortOrder: sortedInfo.columnKey === '總銷售' && sortedInfo.order,
      },
      {
        title: '報廢',
        dataIndex: '報廢',
        key: '報廢',
        width:'30%',
        sorter: (a, b) => a.報廢 - b.報廢,
        sortOrder: sortedInfo.columnKey === '報廢' && sortedInfo.order,
      }
    ];
    const{chartWidth,data}=this.state
    return(
      <div ref={this.saveRef}>
        <MonthPicker 
          defaultValue={moment(this.state.month, monthFormat)} 
          format={monthFormat} 
          onChange={this.MonthPickerFunction.bind(this)}
          />
        <p> Achieving</p>
        <BarChart
          width={chartWidth}
          height={500}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Bar dataKey="總銷售" stackId="a" fill="#8884d8" />
          <Bar dataKey="報廢" stackId="a" fill="#ff0000" />
          <Bar dataKey="總進貨" fill="#82ca9d" />
        </BarChart>
        <Table columns={columns} dataSource={this.state.data} size='small' pagination={false} scroll={{ y: 240 }} onChange={this.handleChange} />
      </div>
    )
  }
  /***********************handleChange********************************************/
  handleChange = (pagination, filters, sorter) => {
    //console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  /***********************componentWillMount********************************************/
  componentWillMount(){
    window.addEventListener("resize", this.updateDimensions);
    var month = window.localStorage.getItem('AchievingPageDate_Month');
    var lastmonth;
    if(month === null){
      month = moment().format('YYYY-MM');
    }
    lastmonth = moment(month).add('month',-1).format('YYYY-MM');
    axios.get(baseURL+'/ShopData/getAchieving',
    {
      params: {
        shopname : window.localStorage.getItem('shopname'),
        branch :  window.localStorage.getItem('branch'),
        month: month,
        lastmonth:lastmonth
      }
    })
    .then( (response) =>{
      this.setState({data:response.data})  
      console.log(this.state.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
    this.setState({
      month:month})
  }
  /***********************componentWillUnmount********************************************/
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillUpdate(){

  }
  /***********************updateDimensions********************************************/
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
  /***********************MonthPickerFunction********************************************/
  MonthPickerFunction(dates, dateStrings) {
    var lastmonth;
    window.localStorage.setItem("AchievingPageDate_Month",dateStrings)
    lastmonth = moment(dateStrings).add('month',-1).format('YYYY-MM');
    axios.get(baseURL+'/ShopData/getAchieving',
    {
      params: {
        shopname : window.localStorage.getItem('shopname'),
        branch :  window.localStorage.getItem('branch'),
        month: dateStrings,
        lastmonth:lastmonth
      }
    })
    .then( (response) =>{
      this.setState({data:response.data})  
      console.log(this.state.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
    this.setState({
      month:dateStrings})
  }
}

export default Achieving