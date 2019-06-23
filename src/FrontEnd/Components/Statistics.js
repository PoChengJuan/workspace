import React from 'react';
import './Statistics.css'
import { Table, Button, DatePicker } from 'antd';
import axios from 'axios'
import baseURL from './AxiosAPI'
import moment from 'moment';
const {MonthPicker} = DatePicker;
const monthFormat = 'YYYY-MM';

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
        <p>總進貨</p>
        <p>總報廢</p>
        <p>總營收</p>
        <p>總支出</p>
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