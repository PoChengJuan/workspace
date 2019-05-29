import React from 'react';
import './User.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, Popover, Avatar, InputNumber } from 'antd';
import axios from 'axios'
import NumericInput from'../Components/InputNumber'
const { Header, Content } = Layout;
const content = (
  <div>
    <p>姓名：</p>
    <p>位置：康樂總店</p>
    <p>人員：開發者</p>
    <Button>登出<Icon type="logout" /></Button>
    
  </div>
);
const data = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
];

var dataList = [

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
      StockItem:'',
      StockValue:'',
      IncomeValue:''}
      
  }
  UploadFunction(event){
    this.setState({StockItem:dataList})
  }
  onChange(event){

  }
  StockValueStore = StockValue =>{
    this.setState({StockValue});
  }
  IncomStore = IncomStore =>{
    this.setState({IncomStore});
  }
  render(){
    console.log("show")
    return(
      <div className="App">
        <Row>
          <Layout>
            <Col span={24}>
              <Header className="Header">
                <Popover content={content} trigger="click">
                  <Avatar className="Avatar" shape="square" icon="user" size={60} />    
                </Popover>
              </Header>
            </Col>
            <Col span={24}>
              <Content>
                <div className="Content">
                  <div className="ListName">
                    <List
                      bordered
                      dataSource={this.state.StockItem}
                      renderItem={item => (
                        <List.Item actions={
                          [<InputNumber className="Number" value={this.state.StockValue} onChange={this.StockValueStore} defaultValue='0'/>,
                          <InputNumber className="Order" placeholder="叫貨" decimalSeparator="." defaultValue="0" />]
                          }>
                          {item} 
                        </List.Item>
                      )}
                    />
                    <List
                      bordered
                      dataSource={income}
                      renderItem={item=>(
                        <List.Item actions={[<NumericInput style={{ width: 130 }} value={this.state.value} onChange={this.IncomStore} />]}>
                          {item} 
                        </List.Item>
                      )}
                    />
                  </div>
                  <Button type="primary" className="Upload" onClick={this.UploadFunction.bind(this)}>上傳</Button>
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
    axios.get('http://localhost:8080/ShopInfo/getMenu?shopname=彩虹咖啡&branch=康樂總店')
    .then(function (response) {
      console.log(response);
      for(var index in response.data){
        console.log(response.data[index])
        dataList.push(response.data[index])
        console.log(dataList[index])
      }
      console.log(dataList)
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({StockItem:dataList})
  }
  componentDidMount(){
    console.log('componentdDidMount');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }
}


export default UserPage;