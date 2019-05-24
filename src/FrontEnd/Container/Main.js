import React from 'react';
import { Menu, Dropdown, Icon, Popover,Button, Avatar, Layout } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../../App.css'
import './Main.css'

import CSILogo from '../png/Logo.png' 
import AreaChartItem from '../Components/AreaChart.js';
import PieChartItem from '../Components/PieChart.js'
import ListItem from '../Components/List.js';
import BarChartItem from '../Components/BarChart.js'
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
    main: () => <BarChartItem width={1500} height={700} />
  }
];

const Shop = (
  
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
    this.setState({Shop:"13"})
  }
  render(){
    return(
      <div className="MainPage">
        <Layout>
          <Header className="Header">
            <img className="CSILOGO" src={CSILogo} alt="CSILOGO" />
            <Popover content={content} title="ID" trigger="click">
              <Avatar shape="square" icon="user" />    
            </Popover>
            <Dropdown onVisibleChange={this.ShopChangeHandle.bind(this)}  className="Dropdown" overlay={Shop} trigger={['hover']}>
              <a className="ant-dropdown-link" href="#">
                {this.state.Shop} <Icon type="down" />
              </a>
            </Dropdown>
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
                <div style={{ display: "flex",width: "100%",height: "100%" }}>
                  <div style={{ flex: 1, padding: "10px", width: "0%" }}>
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

export default MainPage;
