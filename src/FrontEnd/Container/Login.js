import React from 'react';
import Button from 'antd/lib/button';
import { Input } from 'antd';
import { Typography, Layout, Row, Col } from 'antd';
import CSILogo from '../png/Logo.png';
import '../../App.css'
import './Login.css'
import axios from 'axios'
import md5 from 'md5'
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import moment from 'moment';
import baseURL from '../Components/AxiosAPI'

const { Title } = Typography;
const {
  Header, Content,
} = Layout;


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isAuth:'',
      userInput: '',
      pwInput: '',
      Name:'',
      Password:'',
      Permission:'',
      ShopName:'',
      Branch:''}
      
  }
  UserHandle(e){
    this.setState({userInput: e.target.value});
  }
  PSHandle(e){
    this.setState({pwInput: e.target.value});
  }
  LoginFunction(event){
    //axios.get('http://localhost:8080/User/getMember?name='+this.state.userInput)
    axios.get(baseURL+'/User/getMember',
    {params: {
      name : this.state.userInput
      ,password : md5(this.state.pwInput)}}
      )
    .then( (response) =>{
      for(var index in response.data[0]) {
        if(index==='auto_increment'){
          window.sessionStorage.setItem('auto_increment',response.data[0][index]);
        }
        if(index==='name'){
          this.setState({Name:response.data[0][index]});
          window.localStorage.setItem('name',response.data[0][index]);
        }
        if(index==='password'){
          this.setState({Password:response.data[0][index]});        
        }
        if(index==='permission'){
          this.setState({Permission:response.data[0][index]});
          window.sessionStorage.setItem('permission',response.data[0][index]);
        }
        if(index==='shopname'){
          this.setState({ShopName:response.data[0][index]});
          window.localStorage.setItem('shopname',response.data[0][index]);

        }
        if(index==='branch'){
          this.setState({Branch:response.data[0][index]});
          window.localStorage.setItem('branch',response.data[0][index]);
        }
        if(index==='lastupload'){
          //this.setState({Branch:response.data[0][index]});
          window.sessionStorage.setItem('lastupload',response.data[0][index]);
        }

      } 
      if(md5(this.state.pwInput) === this.state.Password){
        window.sessionStorage.setItem('isAuth','true');  
        this.setState({isAuth:'true'});
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  render(){
    //let { from } = this.props.location.state || { from: { pathname: "/" } };
    //let { redirectToReferrer } = this.state;
    const { isAuth } = this.state;
    if(isAuth === 'true'){
      console.log("OK")
      if(window.sessionStorage.getItem('permission') >= 7){
        console.log('main')
        return <Redirect to={'Main'} />
      }else{
        console.log('stock')
        return <Redirect to={'User'} />
      }
    }
    return(
      <div className="App">
        <Row>
          <Layout >
            <Col span={24}>
              <Header className="Header">
                <a><p>Forget Password?</p></a>
              </Header>
            </Col>
            <Col span={24}>
              <Content className="Content">
                <div className="LoginContent">
                  <img src={CSILogo} alt='CSILogo' />
                  <div>
                    <Title level={3}>User:<Input className="UserInput" autoFocus={true} defaultValue = {this.state.userInput} onChange={this.UserHandle.bind(this)} /></Title>
                    <Title level={3}>PW:<Input.Password className="UserInput" defaultValue = {this.state.pwInput} onChange={this.PSHandle.bind(this)} onPressEnter={this.LoginFunction.bind(this)} placeholder="input password" /></Title>              
                  </div>
                  <div className='LoginButton'>
                    <Button  type="primary" onClick={this.LoginFunction.bind(this)}>Login</Button>
                  </div>
                </div>
              </Content>
            </Col>
          </Layout>
        </Row>
      </div>
    )
  }
  componentWillMount() {
    this.setState({isAuth:window.sessionStorage.getItem('isAuth')});   
  }
}





function LoginPage() {
  
  return (
    <Login />
  );
}
export default LoginPage;
