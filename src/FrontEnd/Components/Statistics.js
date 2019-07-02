import React from 'react';
import './Statistics.css'
import { Table, DatePicker } from 'antd';
import axios from 'axios'
import baseURL from './AxiosAPI'
import moment from 'moment';
const {MonthPicker} = DatePicker;
const monthFormat = 'YYYY-MM';

const TotalOrder_columns = [
  {
    title: '品項',
    dataIndex: 'title',
    key: 'title',
    render: text => <span style={{color:'#1E90FF'}}>{text}</span>,
  },
  {
    title: '數量',
    dataIndex: 'order',
    key: 'order',
    width:'2cm',
  }
];
const TotalScrap_columns = [
  {
    title: '品項',
    dataIndex: 'title',
    key: 'title',
    render: text => <span style={{color:'#1E90FF'}}>{text}</span>,
  },
  {
    title: '數量',
    dataIndex: 'scrap',
    key: 'scrap',
    width:'2cm',
  }
];
const TotalExpense_columns = [
  {
    title: '項目',
    dataIndex: 'title',
    key: 'title',
    render: text => <span style={{color:'#1E90FF'}}>{text}</span>,
  },
  {
    title: '金額',
    dataIndex: 'cost',
    key: 'cost',
    width:'2cm',
  }
];
const TotalIncome_columns = [
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    render: text => <span style={{color:'#1E90FF'}}>{text}</span>,
  },
  {
    title: '金額',
    dataIndex: 'income',
    key: 'income',
    width:'2cm',
  }
];
class Statistics extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      total_income:[],
      total_expense:[],
      total_order:[],
      total_scrap:[],
      month:moment().format('YYYY-MM'),
    }
  }
  render(){
    return(
      <div>
        <MonthPicker 
          defaultValue={moment(this.state.month, monthFormat)} 
          format={monthFormat} 
          onChange={this.MonthPickerFunction.bind(this)}
        />
        <h3 style={{ marginBottom: 16 }}>總營收</h3>
          <Table columns={TotalIncome_columns} dataSource={this.state.total_income} size='small' pagination={false} scroll={{ y: 240 }} />
          <h3 style={{ marginBottom: 16 }}>總支出</h3>
          <Table columns={TotalExpense_columns} dataSource={this.state.total_expense} size='small' pagination={false} scroll={{ y: 240 }} />
          <h3 style={{ marginBottom: 16 }}>總進貨</h3>
          <Table columns={TotalOrder_columns} dataSource={this.state.total_order} size='small' pagination={false} scroll={{ y: 240 }} />
        <h3 style={{ marginBottom: 16 }}>總報廢</h3>
          <Table columns={TotalScrap_columns} dataSource={this.state.total_scrap} size='small' pagination={false} scroll={{ y: 240 }} />
        
      </div>
    )
  }
    /***********************MonthPickerFunction********************************************/
  MonthPickerFunction(dates, dateStrings) {
    window.localStorage.setItem('StatisticsPageDate_Month',dateStrings);
    /*window.localStorage.setItem("AchievingPageDate_Month",dateStrings)
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
    }); */
    axios.get(baseURL+'/ShopData/getStatistics',
    {
      params: {
        shopname : window.localStorage.getItem('shopname'),
        branch :  window.localStorage.getItem('branch'),
        month: dateStrings
      }
    })
    .then( (response) =>{
      this.setState({data:response.data}) 
      this.setState({
        total_income:response.data[0],
        total_expense:response.data[1],
        total_order:response.data[2],
        total_scrap:response.data[3],
      }) 
      console.log(this.state.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
    this.setState({
      month:dateStrings})
  }
  /***********************componentWillMount********************************************/
  componentWillMount(){
    window.addEventListener("resize", this.updateDimensions);
    var month = window.localStorage.getItem('StatisticsPageDate_Month');
    if(month === null){
      month = moment().format('YYYY-MM');
    }
    axios.get(baseURL+'/ShopData/getStatistics',
    {
      params: {
        shopname : window.localStorage.getItem('shopname'),
        branch :  window.localStorage.getItem('branch'),
        month: month
      }
    })
    .then( (response) =>{
      this.setState({data:response.data}) 
      this.setState({
        total_income:response.data[0],
        total_expense:response.data[1],
        total_order:response.data[2],
        total_scrap:response.data[3],
      }) 
      console.log(this.state.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
    this.setState({
      month:month})
  }
}

export default Statistics