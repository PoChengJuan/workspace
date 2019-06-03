import React from 'react';
import './User.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, Popover, Avatar, InputNumber,notification } from 'antd';
import axios from 'axios'
import NumericInput from'../Components/InputNumber'
import {BrowserRouter as Router,Redirect,} from "react-router-dom";
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
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
var expense =[
  '支出'
];
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
      Expense:'',
      Income:'',
      Shop:'',
      Name:'',
      Branch:'',
      Permission:''
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
  IncomStore = (income) =>{
    this.setState({Income:income})
  }
  ExpenseStore = (expense) => {
    this.setState({Expense:expense})
  }
  render(){
    const { data,isAuth, Expense,Income } = this.state;
    if(isAuth === 'false'){
      console.log('logout');
      return <Redirect to={'/'} />
    }    
    return(
      <div className="App">
        <Row>
          <Layout>
            <Col span={24}>
              <Header className="Header">
                <Popover content={
                  <div>
                    {
                      //User
                      <div>
                        <p>姓名：{this.state.Name}</p>
                        <p>位置：{this.state.Branch}</p>
                        <p>權限：{this.state.Permission}</p>
                      </div>
                    }
                    <Button className='logout' onClick={this.LogoutFunction.bind(this)}>登出<Icon type="logout" /></Button>
                  </div>
                } trigger="click">
                  <Avatar className="Avatar" shape="circle" icon="user" size={60} />    
                </Popover>
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
                          <InputNumber key={item.key} className="Order" value={item.order} placeholder="叫貨" onChange={(value)=>this.OrderValueStore(item,value)} decimalSeparator="." defaultValue="0" />]
                          }>
                          {item.title}
                        </List.Item>
                      )}
                    />
                    <List
                      bordered
                      dataSource={expense}
                      renderItem={item=>(
                        <List.Item actions={[<NumericInput style={{ width: 130 }} addonBefore={'NTD:'} value={this.state.Expense} onChange={(value)=>this.ExpenseStore(value)}  />]}>
                          {'支出'} 
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
    console.log(this.state.Shop)
    axios.post('http://localhost:8080/ShopData/add', {
      name: this.state.Shop,
      branch : this.state.Branch,
      date:moment().format('YYYY-MM-DD'),
      stock:this.state.data,
      expense:this.state.Expense,
      income:this.state.Income
    })
    .then(function (response) {
      console.log(response);
      this.setState({UploadDisable:true})
      openNotificationWithIcon('success')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentWillMount() {
    console.log('componentWillMount');
      axios.get('http://localhost:8080/ShopData/getLastStock',
        {
          params: {
            shop : window.sessionStorage.getItem('shopname'),
            branch : window.sessionStorage.getItem('branch')
          }
        }
      )
      .then( (response) =>{
      for(var index in response.data){
        response.data[index].order = 0;
      }
      this.setState({data:response.data,
        isAuth:window.sessionStorage.getItem('isAuth'),
        Shop:window.sessionStorage.getItem('shopname'),
        Name:window.sessionStorage.getItem('name'),
        Branch:window.sessionStorage.getItem('branch'),
        Permission:window.sessionStorage.getItem('permission')
      });
      if(window.sessionStorage.getItem('permission') === '9'){
        this.setState({Permission:'開發者'});
      }else if(window.sessionStorage.getItem('permission') === '7'){
        this.setState({Permission:'老闆'});
      }else if(window.sessionStorage.getItem('permission') === '5'){
        this.setState({Permission:'店長'});
      }else{
        this.setState({Permission:'人員'});
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
    //Upload Function only enable in 4pm
    if(moment().format('hh a')==='04 pm'){
      this.setState({UploadDisable:false})
    }  
  }
  componentDidMount(){
    console.log('componentdDidMount');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }
}


export default UserPage;
