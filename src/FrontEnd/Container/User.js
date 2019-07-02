import React from 'react';
import './User.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, InputNumber,notification } from 'antd';
import axios from 'axios'
import NumericInput from'../Components/InputNumber'
import {Redirect,} from "react-router-dom";
import moment from 'moment';
import baseURL from '../Components/AxiosAPI'
import InfoIcom from '../Components/InfoIcon'

const { Header, Content } = Layout;

const openNotificationWithIcon = type => {
  notification[type]({
    message: '上傳成功',
  });
};

/*const User = (
  <div>
    <p>姓名：</p>
    <p>位置：康樂總店</p>
    <p>人員：開發者</p>
  </div>
);*/
//var expense =[
 // '支出'
//];
var income = [
  '營業額'
];
class UserPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isAuth: '',
      UploadDisable:true,
      data:'',
      expense:'',
      Income:'',
      Shop:'',
      Name:'',
      Branch:'',
      Permission:'',
      Position:'',
      Display:false,
      MainPage:false,
      ScrapPage:false,
      Update:false
    }      
  }
  StockValueStore  = (item ,Num) => {
    const {data} = this.state;
    console.log('===', Num);
      data.forEach(data => {
      if (data.key === item.key) {
        data.stock = Num;
      }
    });
    this.setState({ data });
  }
  OrderValueStore = (item, Num)=>{
    const {data} = this.state;
    console.log('order:',Num);
    data.forEach(data=>{
      if(data.key === item.key){
        data.order = Num
      }
    })
    this.setState({ data });
  }
  ExpenseValueStore = (item, Num) => {
    const {expense} = this.state;
    console.log('expense:',Num);
    expense.forEach(expense=>{
      if(expense.key === item.key){
        expense.cost = Num
      }
    })
    this.setState({expense});

  }
  IncomStore = (income) =>{
    this.setState({Income:income})
  }
  MainFnction(e){
    this.setState({MainPage:true})
  }
  ScrapFunction(e){
    this.setState({ScrapPage:true})
  }
  render(){
    const { data,expense,isAuth,MainPage,ScrapPage } = this.state;
    if(isAuth === 'false'){
      console.log('logout');
      return <Redirect to={'/'} />
    }else if(MainPage === true){
      return <Redirect to={'Main'} />
    }else if(ScrapPage === true){
      return <Redirect to={'Scrap'} />
    }
    return(
      <div className="App">
        <Row>
          <Layout>
            <Col span={24}>
              <Header className="Header">
                <div>
                  {this.state.Display &&
                    <Icon type="delete" theme="filled" className='delete' style={{fontSize:'1cm',color:'#ff0011'}} onClick={this.ScrapFunction.bind(this)} />
                  }
                  <InfoIcom 
                        name={window.localStorage.getItem('name')}
                        branch={window.localStorage.getItem('branch')}
                        permission = {window.sessionStorage.getItem('permission')}
                        shape='circle'
                        size={60}
                        dropdown = {true}
                        shopchange = {this.DataUpdata}
                        logout={()=>this.LogoutFunction()}
                    />
                  {this.state.Display &&
                    <Icon type="bar-chart" className='analyze' style={{fontSize:'1cm',color:'#08c'}} onClick={this.MainFnction.bind(this)} />
                  }
                </div>
              </Header>
            </Col>
            <Col span={24}>
              <Content>
                <div className="Content">
                  <div className="ListName">
                    <List 
                      bordered
                      dataSource={data}
                      renderItem={item => (
                        <List.Item key={item.key} actions={
                          [<InputNumber key={item.key} className="Number" value={item.stock} onChange={(value) => this.StockValueStore(item,value)} defaultValue='0'/>,
                          <InputNumber key={item.key} className="Order" value={item.order} placeholder="叫貨" onChange={(value)=>this.OrderValueStore(item,value)} decimalSeparator="." />]
                          }>
                          {item.title}
                        </List.Item>
                      )}
                    />
                    <List
                      bordered
                      dataSource={expense}
                      renderItem={item=>(
                        //<List.Item actions={[<NumericInput style={{ width: 130 }} addonBefore={'NTD:'} value={this.state.Expense} onChange={(value)=>this.ExpenseStore(value)}  />]}>
                         // {'支出'} 
                        //</List.Item>
                        <List.Item key={item.key} actions={
                          [<NumericInput style={{ width: 130 }} key={item.key} addonBefore={'NTD:'} value={item.cost} onChange={(value) => this.ExpenseValueStore(item,value)} defaultValue='0' />
                          //<InputNumber key={item.key} className="Number" value={item.cost} onChange={(value) => this.ExpenseValueStore(item,value)} defaultValue='0'/>
                        ]
                          }>
                          {item.title}
                        </List.Item>
                      )}
                    />
                    <List
                      bordered
                      dataSource={income}
                      renderItem={item=>(
                        <List.Item actions={[<NumericInput style={{ width: 130 }} addonBefore={'NTD:'} value={this.state.Income} onChange={(value)=>this.IncomStore(value)}  />]}>
                          {'營業額'} 
                        </List.Item>
                      )}
                    />
                  </div>
                  <Button type="primary" className="Upload" disabled = {this.state.UploadDisable} onClick={this.UploadFunction.bind(this)}>上傳</Button>
                </div>
              </Content>
            </Col>
          </Layout>
        </Row>
      </div>
    )
  }
  DataUpdata=(Update)=>{
    this.setState({Update:true})
  }
  LogoutFunction(){
    this.setState({isAuth:'false'});
    window.sessionStorage.setItem('isAuth','false');
  }
  UploadFunction(event){    
    axios.get(baseURL+'/ShopData/getTodayData',
    {
      params: {
        shopname: window.localStorage.getItem('shopname'),
        branch: window.localStorage.getItem('branch'),
        today: moment().format('YYYY-MM-DD')
      }
    })
    .then( (response) =>{
      console.log(response.data);
      if(response.data.length === 0){
        /*****No Data (Post)********************/
        axios.post(baseURL+'/ShopData/add', {
          shopname: window.localStorage.getItem('shopname'),
          branch : window.localStorage.getItem('branch'),
          name:window.localStorage.getItem('name'),
          date:moment().format('YYYY-MM-DD'),
          time:moment().format('hh:mm'),
          stock:this.state.data,
          expense:this.state.expense,
          income:this.state.Income
        })
        .then( (response) => {
          console.log(response);
          //Owner can upload multi time
          if(window.sessionStorage.getItem('permission') < 7){
            this.setState({UploadDisable:true})
            //set last upload date
            axios.put(baseURL+'/User/updateUploaddate/'+window.sessionStorage.getItem('auto_increment'),{
              date:moment().format('YYYY-MM-DD')
            })
            .then( (response) => {
              console.log(response);
            })
            .catch( (error) => {
              console.log(error);
            });
          }
          console.log('success')
          window.sessionStorage.setItem('lastupload',moment().format('YYYY-MM-DD'));
          openNotificationWithIcon('success')
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        /*****Update Data (Put)******************/
        axios.put(baseURL+'/ShopData/UpdateStock/'+response.data[0],{
          name:window.localStorage.getItem('name'),
          time:moment().format('hh:mm'),
          stock:this.state.data,
          expense:this.state.expense,
          income:this.state.Income
        })
        .then( (response) => {
          console.log(response);
          openNotificationWithIcon('success');
        })
        .catch( (error) => {
          console.log(error);
        });
      }
    })
    .catch( (error) => {
      console.log(error);
    })
    
    
  }

  componentWillMount() {
    console.log('componentWillMount');
    axios.get(baseURL+'/ShopData/getLastStock',
      {
        params: {
          shop : window.localStorage.getItem('shopname'),
          branch : window.localStorage.getItem('branch')
        }
      }
    )
    .then( (response) =>{
      for(var index in response.data){
        response.data[index].order = 0;
        response.data[index].scrap = 0;
      }
      this.setState({
        data:response.data,
        Branch:window.localStorage.getItem('branch'),
        isAuth:window.sessionStorage.getItem('isAuth'),
        Permission:window.sessionStorage.getItem('permission')
      });
    })
    .catch(function (error) {
      console.log(error);
    }); 
    
    axios.get(baseURL+'/ShopData/getLastExpense',
    {
      params: {
        shop: window.localStorage.getItem('shopname'),
        branch: window.localStorage.getItem('branch')
      }
    })
    .then( (response) => {
      for(var index in response.data){
        response.data[index].cost = 0;
      }
      this.setState({expense:response.data});
    })
    .catch(function (error) {
      console.log(error);
    }); 

    if(window.sessionStorage.getItem('permission') === '9'){
      this.setState({Position:'開發者',
      Display:true});
    }else if(window.sessionStorage.getItem('permission') === '7'){
      this.setState({Position:'老闆',
      //Display:false
      Display:true
    });
    }else if(window.sessionStorage.getItem('permission') === '5'){
      this.setState({Position:'店長'});
    }else{
      this.setState({Position:'人員'});
    }
    //console.log(window.sessionStorage.getItem('date'))
    //console.log(moment().format('MM-DD'))
    //One day only upload one time
      //Upload Function only enable in 4pm ~ 5pm
      console.log(window.sessionStorage.getItem('isAuth'))

    //console.log(window.sessionStorage.getItem('lastupload'))
    //console.log(moment().format('YYYY-MM-DD'))
    //if(window.sessionStorage.getItem('isupload') === 'false'){
    if(window.sessionStorage.getItem('lastupload') !== moment().format('YYYY-MM-DD')){
      if((moment().format('HH')==='16') || (moment().format('HH')==='17') ||
         (moment().format('HH')==='18') || (moment().format('HH')==='19') ||
         (moment().format('HH')==='20') || (moment().format('HH')==='21')
      ){        
        this.setState({UploadDisable:false});
      } 
    }this.setState({UploadDisable:false});
    //if(window.sessionStorage.getItem('uploadagain') === 'true'){
    //  this.setState({UploadDisable:false});
    //}
  }
  componentDidMount(){
    console.log('componentdDidMount');
    console.log(moment().format('YYYY-MM-DD hh:mm'))
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
    if(this.state.Update === true){
      axios.get(baseURL+'/ShopData/getLastStock',
        {
          params: {
            shop : window.localStorage.getItem('shopname'),
            branch : window.localStorage.getItem('branch')
          }
        }
      )
      .then( (response) =>{
        if(response.data !== []){
          for(var index in response.data){
            response.data[index].order = 0;
            response.data[index].scrap = 0;
          }
          this.setState({
            data:response.data,
            Branch:window.localStorage.getItem('branch'),
            UploadDisable:false
          });
        }else{
          console.log('test 1')
          this.setState({
            data:'',
            Branch:window.localStorage.getItem('branch'),
          });
        }
      })
      .catch( (error) => {
        console.log(error);
        console.log('test 2')

        this.setState({
          data:'',
          Branch:window.localStorage.getItem('branch'),
          UploadDisable:true
        });
      }); 
      
      axios.get(baseURL+'/ShopData/getLastExpense',
      {
        params: {
          shop: window.localStorage.getItem('shopname'),
          branch: window.localStorage.getItem('branch')
        }
      })
      .then( (response) => {
        if(response.data !== []){
          for(var index in response.data){
            response.data[index].cost = 0;
          }
          this.setState({expense:response.data});
        }else{
          console.log('test 3')

          this.setState({
            expense:'',
            UploadDisable:true});
        }
      })
      .catch( (error) => {
        console.log(error);
        console.log('test 4')

        this.setState({
          expense:'',
          UploadDisable:true});
      }); 
      this.setState({Update:false})
    }
  }
}


export default UserPage;
