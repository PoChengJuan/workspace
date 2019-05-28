import React from 'react';
import Button from 'antd/lib/button';
import { Input } from 'antd';
import { Typography, Layout, Row, Col } from 'antd';
import CSILogo from '../png/Logo.png';
import '../../App.css'
import './Login.css'
import axios from 'axios'
import md5 from 'md5'
const { Title } = Typography;
const {
  Header, Content,
} = Layout;
let UserInfo = (props) => {
    const {
      Name, Password, Permission, ShopName
    } = props;
  };
class Login extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      userInput: '',
      pwInput: '',
      Name:'',
      Password:'',
      Permission:'',
      ShopName:''}
      
  }
  UserHandle(e){
    this.setState({userInput: e.target.value});
  }
  PSHandle(e){
    this.setState({pwInput: e.target.value});
  }
  LoginFunction(event){
    //console.log("USER:"+this.state.userInput+"PS:"+this.state.pwInput);
    //console.log(md5(this.state.psw));
    axios.get('http://localhost:8080/User/getMember?name='+this.state.userInput)
    .then(function (response) {
      console.log(response.data[0]);
      for(var index in response.data[0]) {
        if(index=="name")
        {
          //this.setState({Name:response.data[0][index]})
          UserInfo.Name = response.data[0][index]
          console.log(response.data[0][index])
        }
        console.log(index);
    } 
      //this.setState({Name:event});
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(UserInfo.Name)
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
                    <Title level={3}>User:<Input className="UserInput" autoFocus="true" defaultValue = {this.state.userInput} onChange={this.UserHandle.bind(this)} /></Title>
                    <Title level={3}>PW:<Input.Password className="UserInput" defaultValue = {this.state.pwInput} onChange={this.PSHandle.bind(this)} placeholder="input password" /></Title>              
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
