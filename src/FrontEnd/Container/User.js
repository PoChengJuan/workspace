import React from 'react';
import './User.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, Popover, Avatar, InputNumber } from 'antd';
import axios from 'axios'
import NumericInput from'../Components/InputNumber'

const { Header, Content } = Layout;
const User = (
  <div>
    <p>姓名：</p>
    <p>位置：康樂總店</p>
    <p>人員：開發者</p>
    
    
  </div>
);
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
      Menu: '',
      Stock: '',
      Name:'',
      Password:'',
      Permission:'',
      ShopName:'',
      data:'',
      Expense:'',
      Income:''
    }      
  }
  UploadFunction(event){
  }
  LogoutFunction(){
    console.log('logout')
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
    const { data, Expense,Income } = this.state;
    console.log("show")
    return(
      <div className="App">
        <Row>
          <Layout>
            <Col span={24}>
              <Header className="Header">
                <Popover content={
                  <div>
                    {User}
                    <Button className='logout' onClick={this.LogoutFunction}>登出<Icon type="logout" /></Button>
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
                  <Button type="primary" className="Upload" disabled = {true} onClick={this.UploadFunction.bind(this)}>上傳</Button>
                </div>
              </Content>
            </Col>
          </Layout>
        </Row>
      </div>
    )
  }

  componentWillMount() {
    console.log('componentWillMount');
    //axios.get('http://localhost:8080/ShopInfo/getMenu?shopname=彩虹咖啡&branch=康樂總店')
    axios.get('http://localhost:8080/ShopData/getLastStock/?shop=彩虹咖啡&branch=康樂總店')
    .then( (response) => {
      for(var index in response.data){
        response.data[index].order = 0;
      }
      this.setState({data:response.data})
      //this.setState({Expense:''})
    })
    .catch(function (error) {
      console.log(error);
    });    
  }
  componentDidMount(){
    console.log('componentdDidMount');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }
}


export default UserPage;
