import React from 'react';
import Button from 'antd/lib/button';
import { Input } from 'antd';
import { Typography, Layout, Row, Col } from 'antd';
import CSILogo from '../png/Logo.png';
import '../../App.css'
import './Login.css'
import axios from 'axios'

const { Title } = Typography;
const {
  Header, Content,
} = Layout;
const ShopInfo = (props) => {
  const {
    Owner, ShopName, Branch, Menu
  } = props;
};
class Login extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      user: '',
      psw: ''}
      
  }
  UserHandle(e){
    this.setState({user: e.target.value});
  }
  PSHandle(e){
    this.setState({psw: e.target.value});
  }
  LoginFunction(event){
    console.log("USER:"+this.state.user+"PS:"+this.state.psw);
    axios.get('http://localhost:8080/ShopInfo/get')
    .then(function (response) {
      console.log(response);
      console.log('Get');
      for(var index in response) {
        console.log(index ,":", response[index]);
      }  
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render(){
    return(
      <div className="App">
        <Row>
          <Layout >
            <Col span={24}>
              <Header className="Header">
                <p>Phone:xxxxxxxxxx</p>
              </Header>
            </Col>
            <Col span={24}>
              <Content className="Content">
                <div className="LoginContent">
                  <img src={CSILogo} alt='CSILogo' />
                  <div className="Content">
                    <Title level={3}>User:<Input className="UserInput" autoFocus="true" defaultValue = {this.state.user} onChange={this.UserHandle.bind(this)} /></Title>
                    <Title level={3}>PW:<Input.Password className="UserInput" defaultValue = {this.state.psw} onChange={this.PSHandle.bind(this)} placeholder="input password" /></Title>              
                    <Button type="primary" onClick={this.LoginFunction.bind(this)}>Login</Button>
                  </div>
                </div>
              </Content>
            </Col>
          </Layout>
        </Row>
      </div>
    )
  }
}

function LoginPage() {
  
  return (
    <Login />
  );
}
export default LoginPage;
