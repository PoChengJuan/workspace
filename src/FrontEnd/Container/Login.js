import React from 'react';
import Button from 'antd/lib/button';
import { Input } from 'antd';
import { Typography, Layout, Row, Col,notification } from 'antd';
import CSILogo from '../png/Logo.png';
import { observer, inject } from 'mobx-react'
import '../../App.css'
import './Login.css'
import axios from 'axios'
import md5 from 'md5'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const { Title } = Typography;
const {
  Header, Content,
} = Layout;

//export default inject('UserInfoStore')(observer(LoginPage));

class Login extends React.Component{
  UserInfoStore = this.props.UserInfoStore
  state = { redirectToReferrer: false };
  constructor(props){
    super(props);
    this.state = {
      isAuth:false,
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
    //axios.get('http://localhost:8080/User/getMember?name='+this.state.userInput)
    axios.get('http://localhost:8080/User/getMember',
    {params: {
      name : this.state.userInput
      ,password : md5(this.state.pwInput)}}
      )
    .then( (response) =>{
      for(var index in response.data[0]) {
        if(index==="name")
        {
          this.setState({Name:response.data[0][index]})
        }
        if(index==="password"){
          this.setState({Password:response.data[0][index]})          
        }
        if(index==="permission"){
          this.setState({Permission:response.data[0][index]})
        }
        if(index==="shopname"){
          this.setState({ShopName:response.data[0][index]})
        }
      } 
      if(md5(this.state.pwInput) === this.state.Password){
        this.setState({redirectToReferrer: true})
      }
      this.setState({isAuth:true});
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  render(){
    //let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    if(redirectToReferrer === true){
      console.log("OK")
      return <Redirect to={'User'} />
    }else if(redirectToReferrer === false){
      console.log("NG")
    }
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
                    <Title level={3}>PW:<Input.Password className="UserInput" defaultValue = {this.state.pwInput} onChange={this.PSHandle.bind(this)} onPressEnter={this.LoginFunction.bind(this)} placeholder="input password" /></Title>              
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
//export default inject('UserInfoStore')(observer(LoginPage));