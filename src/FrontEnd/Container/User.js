import React from 'react';
import './User.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, Popover, Avatar, InputNumber,notification } from 'antd';
import axios from 'axios'
import NumericInput from'../Components/InputNumber'
import {BrowserRouter as Router,Redirect,} from "react-router-dom";
import moment from 'moment';
import baseURL from '../Components/AxiosAPI'
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
      MainPage:false
    }      
  }
  LogoutFunction(){
    this.setState({isAuth:'false'});
    window.sessionStorage.setItem('isAuth','false');
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
  render(){
    const { data,expense,isAuth,MainPage } = this.state;
    if(isAuth === 'false'){
      console.log('logout');
      return <Redirect to={'/'} />
    }else if(MainPage === true){
      return <Redirect to={'Main'} />
    }    
    return(
      <div className="App">
        <Row>
          <Layout>
            <Col span={24}>
              <Header className="Header">
                <div>
                  <Popover content={
                    <div>
                      {
                        //User
                        <div>
                          <p>姓名：{this.state.Name}</p>
                          <p>位置：{this.state.Branch}</p>
                          <p>權限：{this.state.Position}</p>
                        </div>
                      }
                      <Button className='logout' onClick={this.LogoutFunction.bind(this)}>登出<Icon type="logout" /></Button>
                    </div>
                  } trigger="click">
                    <Avatar className="Avatar" shape="circle" icon="user" size={60} />    
                  </Popover>
                  {this.state.Display &&
                    <Icon type="line-chart" className='analyze' style={{fontSize:'1cm',color:'#08c'}} onClick={this.MainFnction.bind(this)} />
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
  UploadFunction(event){
    /*console.log(this.state.Shop)
    this.state.data.map(item=>{
      console.log(item.title)
    })*/
    axios.post(baseURL+'/ShopData/add', {
      shopname: this.state.Shop,
      branch : this.state.Branch,
      name:this.state.Name,
      date:moment().format('YYYY-MM-DD'),
      time:moment().format('hh:mm'),
      stock:this.state.data,
      expense:this.state.expense,
      income:this.state.Income
    })
    .then( (response) => {
      console.log(response);
      this.setState({UploadDisable:true})
      console.log('success')
      window.sessionStorage.setItem('lastupload',moment().format('YYYY-MM-DD'));
      openNotificationWithIcon('success')
      
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
    })
    .catch(function (error) {
      console.log(error);
    });
    
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
      }
      this.setState({data:response.data,
        Shop:window.localStorage.getItem('shopname'),
        Name:window.localStorage.getItem('name'),
        Branch:window.localStorage.getItem('branch'),
        isAuth:window.sessionStorage.getItem('isAuth'),
        Permission:window.sessionStorage.getItem('permission')
      });
      if(window.sessionStorage.getItem('permission') === '9'){
        this.setState({Position:'開發者',
        Display:true});
      }else if(window.sessionStorage.getItem('permission') === '7'){
        this.setState({Position:'老闆',
        Display:true});
      }else if(window.sessionStorage.getItem('permission') === '5'){
        this.setState({Position:'店長'});
      }else{
        this.setState({Position:'人員'});
      }
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
    //console.log(window.sessionStorage.getItem('date'))
    //console.log(moment().format('MM-DD'))
    //One day only upload one time
      //Upload Function only enable in 4pm ~ 5pm
      console.log(window.sessionStorage.getItem('isAuth'))

    //console.log(window.sessionStorage.getItem('lastupload'))
    //console.log(moment().format('YYYY-MM-DD'))
    //if(window.sessionStorage.getItem('isupload') === 'false'){
    if(window.sessionStorage.getItem('lastupload') !== moment().format('YYYY-MM-DD')){
      if((moment().format('hh a')==='04 pm') || (moment().format('hh a')==='05 pm')){        
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
  }
}


export default UserPage;
