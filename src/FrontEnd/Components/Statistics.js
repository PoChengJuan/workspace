import React from 'react';
import './Statistics.css'
import { Table, Button, DatePicker } from 'antd';
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
    render: text => <a href="javascript:;">{text}</a>,
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
    render: text => <a href="javascript:;">{text}</a>,
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
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '金額',
    dataIndex: 'num',
    key: 'num',
    width:'2cm',
  }
];
const TotalIncome_columns = [
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '金額',
    dataIndex: 'num',
    key: 'num',
    width:'2cm',
  }
];
class Statistics extends React.Component{
  constructor(props){
    super(props);
    this.state = {
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
          <Table columns={TotalIncome_columns} dataSource={this.state.income} size='small' pagination={false} scroll={{ y: 240 }} />
          <h3 style={{ marginBottom: 16 }}>總支出</h3>
          <Table columns={TotalExpense_columns} dataSource={this.state.income} size='small' pagination={false} scroll={{ y: 240 }} />
          <h3 style={{ marginBottom: 16 }}>總進貨</h3>
          <Table columns={TotalOrder_columns} dataSource={this.state.income} size='small' pagination={false} scroll={{ y: 240 }} />
        <h3 style={{ marginBottom: 16 }}>總報廢</h3>
          <Table columns={TotalScrap_columns} dataSource={this.state.income} size='small' pagination={false} scroll={{ y: 240 }} />
        
      </div>
    )
  }
    /***********************MonthPickerFunction********************************************/
  MonthPickerFunction(dates, dateStrings) {
    var lastmonth;
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
    }); 
    this.setState({
      month:dateStrings})*/
  }
}

export default Statistics