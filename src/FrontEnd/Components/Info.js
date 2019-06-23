import React from 'react';
import { DatePicker, Typography,Table } from 'antd';
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import moment from 'moment';

import './Info.css'

const dateFormat = 'YYYY-MM-DD';
const testDate = '2019-06-12'
const stock_columns = [
  {
    title: '品項',
    dataIndex: 'title',
    key: 'title',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '庫存',
    dataIndex: 'stock',
    key: 'stock',
    width:'2cm',
  },
  {
    title: '叫貨量',
    dataIndex: 'order',
    key: 'order',
    width:'2cm',
  }
];
const expense_columns = [
  {
    title: '項目',
    dataIndex: 'title',
    key: 'title',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '金額',
    dataIndex: 'cost',
    key: 'cost',
    width:'2cm',
  }
];
const income_columns = [
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '金額',
    dataIndex: 'income',
    key: 'income',
    width:'2cm',
  }
];
const datedefault = [];
class Info extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          data:datedefault,
          expense:datedefault,
          income:datedefault,
          lastUploadDate:testDate,
          stockTableData:'',
          date:''
        }      
      }
    render(){
      const{data,expense,stockTableData}=this.state
        return(
            <div >
                <DatePicker
                  defaultValue={moment(this.state.date, dateFormat)} 
                  format={dateFormat} 
                  onChange={this.DatePickerFunction.bind(this)}
                  />
                <h2>{
                  //this.state.lastUploadDate
                  }</h2>
                <h3 style={{ marginBottom: 16 }}>庫存</h3>
                <Table columns={stock_columns} dataSource={data} size='small' pagination={false} scroll={{ y: 240 }} />
                <h3 style={{ marginBottom: 16 }}>支出</h3>
                <Table columns={expense_columns} dataSource={expense} size='small' pagination={false} scroll={{ y: 240 }} />
                <h3 style={{ marginBottom: 16 }}>收入</h3>
                <Table columns={income_columns} dataSource={this.state.income} size='small' pagination={false} scroll={{ y: 240 }} />
            </div>
              
        )
    }
    DatePickerFunction(dates, dateStrings) {
      console.log(dateStrings)
      window.localStorage.setItem("InfoPageDate",dateStrings)
      //this.GetData(window.localStorage.getItem('shopname'),window.localStorage.getItem('branch'),dateStrings);
      this.GetData(window.localStorage.getItem('shopname'),this.props.Branch,dateStrings);
    }
    componentWillUpdate(){
      //console.log('componentWillUpdate');

    }
    componentWillReceiveProps(nextProps){
      //console.log(nextProps)
    }
    componentWillMount() {
        //console.log('componentWillMount');
        var date = window.localStorage.getItem('InfoPageDate') 
        if(date === null){
          this.GetData(
            window.localStorage.getItem('shopname'),
            //window.localStorage.getItem('branch'),
            this.props.Branch,
            moment().format('YYYY-MM-DD')
            );
            this.setState({date:moment().format('YYYY-MM-DD')})
        }else{
          this.GetData(
            window.localStorage.getItem('shopname'),
            //window.localStorage.getItem('branch'),
            this.props.Branch,
            window.localStorage.getItem('InfoPageDate')
            );
            this.setState({date:window.localStorage.getItem('InfoPageDate')})
        }
      }
      GetData = (shop,branch,date) =>{
        axios.get(baseURL+'/ShopData/getStock',
            {
              params: {
                shop : shop,
                branch : branch,
                date: date
              }
            }
          )
          .then( (response) =>{
          this.setState({data:response.data});
        })
        .catch( (error) => {
          this.setState({data:''});
          console.log(error);
        }); 
        
        axios.get(baseURL+'/ShopData/getExpense',
        {
          params: {
            shop: shop,
            branch: branch,
            date: date
          }
        })
        .then( (response) => {
          this.setState({expense:response.data});
        })
        .catch( (error) => {
          this.setState({expense:''});
          console.log(error);
        }); 
        
        axios.get(baseURL+'/ShopData/getIncome',
        {
          params: {
            shop: shop,
            branch: branch,
            date: date
          }
        })
        .then( (response) => {
          this.setState({income:response.data});
        })
        .catch( (error) => {
          this.setState({income:''});
          console.log(error);
        }); 
        /*axios.get(baseURL+'/ShopData/getLastUploadDate',
        {
          params: {
            shop: shop,
            branch: branch
          }
        })
        .then( (response) => {
          this.setState({lastUploadDate:response.data});
        })
        .catch( (error) => {
          console.log(error);
        }); */
      }
}

export default Info
