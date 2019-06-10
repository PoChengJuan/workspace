import React from 'react';
import { Menu, Dropdown, Icon, Popover,Button, Avatar, Layout } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import '../../App.css'
import './Main.css'

import CSILogo from '../png/Logo.png' 
import AreaChartItem from '../Components/AreaChart.js';
import PieChartItem from '../Components/PieChart.js'
import ListItem from '../Components/List.js';
import BarChartItem from '../Components/BarChart.js'
import InfoIcom from'../Components/InfoIcon.js'
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import MenuItem from 'antd/lib/menu/MenuItem';

const {
  Header, Footer, Sider, Content,
} = Layout;

const routes = [
  {
    path: "/Stock",
    exact: true,
    main: () => <ListItem />
  },
  {
    path: "/bubblegum",
    main: () => <PieChartItem />
  },
  {
    path: "/income",
    main: () => <AreaChartItem />
  },
  {
    path: "/test",
    main: () => <BarChartItem width={1500} height={700} />
  }
];

const ShopList = (
  
  <Menu>
    <Menu.Item key="99" selectable>
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
const branch =(
  <Menu></Menu>
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
      Shop: '康樂總店',
      ShopListData:'',
      StockPage: false,
      isAuth:''}
  }
  ShopChangeHandle = (e, key) => {
    console.log('adfad')
    this.setState({Shop:'測試'})
  }
  StockFunction(e){
    this.setState({StockPage:true})
  }
  LogoutFunction(){
    window.sessionStorage.setItem('isAuth','false');
    this.setState({isAuth:'false'});
  }
  render(){
    const { StockPage,isAuth,ShopListData } = this.state;
    if(window.sessionStorage.getItem('isAuth') === 'false'){
      return <Redirect to={'/'} />
    }
    if(StockPage === true){
      return <Redirect to={'User'} />
    }
    console.log('Main')
    return(
      <div className="MainPage">
        <Layout>
          <Header className="Header">
            <img className="CSILOGO" src={CSILogo} alt="CSILOGO" />
            <InfoIcom 
              name={window.localStorage.getItem('name')}
              branch={window.localStorage.getItem('branch')}
              permission = {window.sessionStorage.getItem('permission')}
              shape='square'
              logout={()=>this.LogoutFunction()}
            />
            <Dropdown onVisibleChange={(value)=>this.ShopChangeHandle.bind(this,ShopList.key)}  className="Dropdown" 
            overlay={
              <Menu
                dataSource={ShopListData}
                renderItem={item => (
                  <Menu.Item key={item[0][0]}>{item[0][1]}</Menu.Item>
                )}
                / >
            } 
            trigger={['hover']}>
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
                        <a onClick={this.StockFunction.bind(this)}>盤點</a>
                      </li>
                      <li>
                        <a>報廢</a>
                      </li>
                      <li>
                        <Link to="/Stock">庫存</Link>
                      </li>
                      <li>
                        <Link to="/bubblegum">支出</Link>
                      </li>
                      <li>
                        <Link to="/income">營收</Link>
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
  componentWillMount() {
    console.log('componentWillMount')
    console.log(window.localStorage.getItem('shopname'))
    //this.setState({isAuth:window.sessionStorage.getItem('isAuth')});
    console.log(window.sessionStorage.getItem('isAuth'))
    axios.get(baseURL+'/ShopInfo/getBranch',
      {
        params: {
        shopname : window.localStorage.getItem('shopname')
      }
      })
    .then( (response) =>{  
      this.setState({ShopListData:response.data})      
      //for(var index in response.data) {
       // this.setState({Shop:response.data[index]})
       // console.log(response.data[index])
      //}
      console.log(this.state.ShopListData[0][1])
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default MainPage;
