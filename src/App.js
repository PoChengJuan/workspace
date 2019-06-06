/*import React from 'react';
import './App.css';
import './FrontEnd/Container/User.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, Popover, Avatar, Input } from 'antd';

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

class UserPage extends React.Component{
  render(){
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
                      dataSource={data}
                      renderItem={item => (
                        <List.Item>
                          {item} <Input className="Number" />
                        </List.Item>
                      )}
                    />
                  </div>
                  <Button type="primary" className="Upload">上傳</Button>
                </div>
              </Content>
            </Col>
          </Layout>
        </Row>
      </div>
    )
  }
}

function App() {
  return (
    <UserPage />
  );
}*/
/*import React from 'react';
import { Menu, Dropdown, Icon, Popover,Button, Avatar, Layout } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css'
import './FrontEnd/Container/Main.css'
import './FrontEnd/Components/AreaChart.js'
import CSILogo from './FrontEnd/png/Logo.png' 
import AreaChartItem from './FrontEnd/Components/AreaChart.js';
import PieChartItem from './FrontEnd/Components/PieChart.js'
import ListItem from './FrontEnd/Components/List.js';
import BarChartItem from './FrontEnd/Components/BarChart.js'
const {
  Header, Footer, Sider, Content,
} = Layout;

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <ListItem />
  },
  {
    path: "/bubblegum",
    main: () => <PieChartItem />
  },
  {
    path: "/shoelaces",
    main: () => <AreaChartItem />
  },
  {
    path: "/test",
    main: () => <BarChartItem />
  }
];


const menu = (
  <Menu>
    <Menu.Item key="0" selectable>
      康樂總店
    </Menu.Item>
    <Menu.Item key="1">
      大埔店
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      麻豆店
    </Menu.Item>
      
  </Menu>
);

const content = (
  <div>
    <p>姓名：</p>
    <p>類型：開發者</p>
    <Button>登出<Icon type="logout" /></Button>
    
  </div>
);

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Shop: '康樂總店'}
  }
  ShopChangeHandle(e){
    console.log(this.props);
  }
  render(){
    return(
      <div className="MainPage">
        <Layout>
          <Header className="Header">
            <img className="CSILOGO" src={CSILogo} alt="CSILOGO" />
            <Dropdown onClick={this.ShopChangeHandle.bind(this)} className="Dropdown" overlay={menu} trigger={['hover']}>
              <a className="ant-dropdown-link" href="#">
                {this.state.Shop} <Icon type="down" />
              </a>
            </Dropdown>
            <Popover content={content} title="ID" trigger="click">
              <Avatar shape="square" icon="user" />    
            </Popover>
          </Header>
          <Layout>
            <Router>
              <Sider className="Sider">
                <div  className="SiberItem">
                  <ul>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li>
                        <Link to="/">庫存</Link>
                      </li>
                      <li>
                        <Link to="/bubblegum">支出</Link>
                      </li>
                      <li>
                        <Link to="/shoelaces">營收</Link>
                      </li>
                      <li>
                        <Link to="/test">投報率</Link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </Sider>
              <Content className="Content">
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1, padding: "10px" }}>
                    {routes.map((route, index) => (
                      // Render more <Route>s with the same paths as
                      // above, but different components this time.
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                      />
                    ))}
                  </div>
                </div>
              </Content>
            </Router>
            <Footer className="Footer">Information</Footer>
          </Layout>
        </Layout>
        
      </div>
    )
  }
}

function App() {
  return (
    <MainPage />
  );
}
*/


/*import React from 'react';
import Button from 'antd/lib/button';
import { Input } from 'antd';
import { Typography } from 'antd';
import CSILogo from './FrontEnd/png/Logo.png';
import './App.css'

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

function App() {
  
  return (
    <Login />
  );
}*/


import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './FrontEnd/Container/Login'
import Main from './FrontEnd/Container/Main'
import User from './FrontEnd/Container/User'
import Test from './FrontEnd/Container/test'


function App() {
  return (
    <Router>
      <div>
        <Route path='/' exact component={Login} />
        <Route path='/Main' component={Main} />
        <Route path='/User' component={User} />
      </div>
    </Router>
  );
}



export default App;
