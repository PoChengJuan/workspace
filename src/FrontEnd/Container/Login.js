import React from 'react';
import Button from 'antd/lib/button';
import { Input } from 'antd';
import { Typography } from 'antd';
import CSILogo from '../png/Logo.png';
import '../../App.css'

const { Title } = Typography;

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
    
  }
  render(){
    return(
      <div className="App">
      <header>
          <p>Phone:xxxxxxxxxx</p>
        <hr></hr>
      </header>
      <main>
        <div className="LoginContent">
            <img src={CSILogo} alt='CSILogo' />
            <div className="Content">
              <Title level={3}>User:<Input className="UserInput" defaultValue = {this.state.user} onChange={this.UserHandle.bind(this)} /></Title>
              <Title level={3}>PW:<Input.Password className="UserInput" defaultValue = {this.state.psw} onChange={this.PSHandle.bind(this)} placeholder="input password" /></Title>              
            </div>
            <Button type="primary" onClick={this.LoginFunction.bind(this)}>Login</Button>
        </div>
      </main>
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
