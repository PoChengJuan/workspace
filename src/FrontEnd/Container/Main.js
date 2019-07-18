import React from 'react';
import { Menu, Dropdown, Icon, Layout } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import '../../App.css'
import './Main.css'
import CSILogo from '../png/Logo.png' 
import BalanceSheet from '../Components/Balance.js';
import Info from '../Components/Info.js';
import InfoIcom from'../Components/InfoIcon.js'
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import StockList from '../Components/StockList.js'
import Achieving from '../Components/Achieving.js'
import Statistics from '../Components/Statistics.js'
const {
  Header, Footer, Sider, Content,
} = Layout;


const BranchData = [
  {
    key:1,
    shopname:'xxx'
  }
]
class MainPage extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      Branch: window.localStorage.getItem('branch'),
      BranchList:BranchData,
      StockPage: false,
      ScrapPage: false,
      isAuth:'',
      Display:'',
      visible:false,
      warningData:[]
    }
      this.saveRef = ref => {this.refDom = ref};
  }
  ShopChangeHandle = e => {
    console.log('dropdown change to '+e.key)
    this.setState({Branch:this.state.BranchList[e.key-1].branch})
    window.localStorage.setItem('branch',this.state.BranchList[e.key-1].branch);
  }
  StockFunction(e){
    this.setState({StockPage:true})
  }
  ScrapFunction(e){
    this.setState({ScrapPage:true})
  }
  LogoutFunction(){
    window.sessionStorage.setItem('isAuth','false');
    this.setState({isAuth:'false'});
  }
  render(){
    const routes = [
      {
        path: "/Main",
        exact: true,
        main: () => <Info Branch={this.state.Branch} Width={1500} />
      },
      {
        path: '/StockList',
        exact: true,
        main: () => <StockList Branch={this.state.Branch} Width={this.refDom.clientWidth} />
      },
      {
        path: "/BalanceSheet",
        exact: true,
        main: () => <BalanceSheet Branch={this.state.Branch} Width={this.refDom.clientWidth} />
      },
      {
        path: "/Statistics",
        exact: true,
        main: ()=> <Statistics Branch={this.state.Branch} Width={this.refDom.clientWidth} />
      },
      {
        path: "/Achieving",
        exact: true,
        main: () => <Achieving Branch={this.state.Branch} Width={this.refDom.clientWidth} />
      }
    ];
    const { StockPage,ScrapPage,BranchList } = this.state;
    if(window.sessionStorage.getItem('isAuth') === 'false'){
      return <Redirect to={'/'} />
    }
    if(StockPage === true){
      return <Redirect to={'User'} />
    }
    if(ScrapPage === true){
      return <Redirect to={'Scrap'} />
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
              dropdown = {false}
              logout={()=>this.LogoutFunction()}
            />
            <Dropdown
              className="Dropdown" 
              overlay={
                <Menu onClick={this.ShopChangeHandle}  >
                  {BranchList.map(item =>
                  <Menu.Item key={item.key} selectable>
                    {item.branch}
                  </Menu.Item>
                  )}
                </Menu>
                } 
              trigger={['click']}
              >
              <span className="ant-dropdown-link" style={{color:'#1E90FF'}} >
                {this.state.Branch} <Icon type="down" />
              </span>
            </Dropdown>
          </Header>
            <Layout>
              <Router>
                  
                  <Sider
                  theme='light'
                  className="Sider"
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                      console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                      console.log(collapsed, type);
                    }}
                  >
                    <div  className="SiderItem">
                      <Menu style={{ background: '#ccedfc', padding: 0 }} theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                          <Icon type="shop" />
                          <span className="nav-text">店家資訊</span>
                          <Link to='/Main'></Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                          <Icon type="stock" />
                          <span className="nav-text">庫存明細</span>
                          <Link to='/StockList' />
                        </Menu.Item>
                        <Menu.Item key="3">
                          <Icon type="money-collect" />
                          <span className="nav-text">收支圖</span>
                          <Link to='/BalanceSheet' />
                        </Menu.Item>
                        <Menu.Item key="4">
                          <Icon type="bar-chart" />
                          <span className="nav-text">達成率</span>
                          <Link to='/Achieving' />
                        </Menu.Item>
                        <Menu.Item key="5">
                          <Icon type="profile" />
                          <span className="nav-text">統計</span>
                          <Link to='/Statistics' />
                        </Menu.Item>
                        <Menu.Item key="6" onClick={this.StockFunction.bind(this)}>
                          <Icon type="unordered-list" />
                          <span className="nav-text">盤點</span>
                        </Menu.Item>
                        <Menu.Item key="7" onClick={this.ScrapFunction.bind(this)}>
                          <Icon type="delete" />
                          <span className="nav-text">報廢</span>
                        </Menu.Item>
                      </Menu>
                    </div>
                  </Sider>
                  <Content className="Content">
                    <div style={{ display: "flex",width: "100%",height: "100%" }}>
                      <div ref={this.saveRef} style={{ flex: 1, padding: "10px", width: "0%" }}>
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
              
            </Layout>
            <Footer className="Footer"></Footer>
        </Layout>
        
      </div>
    )
  }
  componentWillMount() {
    console.log('componentWillMount')
    console.log(window.localStorage.getItem('shopname'))
    //console.log(this.state.Branch)
    //this.setState({isAuth:window.sessionStorage.getItem('isAuth')});
    //console.log(window.sessionStorage.getItem('isAuth'))
    axios.get(baseURL+'/ShopInfo/getBranch',
      {
        params: {
        shopname : window.localStorage.getItem('shopname')
      }
      })
    .then( (response) =>{  
      this.setState({
        BranchList:response.data,
        //Branch:response.data[0].branch
      })   
      //console.log(response.data)   
      //for(var index in response.data) {
       // this.setState({Shop:response.data[index]})
       // console.log(response.data[index])
      //}
    })
    .catch(function (error) {
      console.log(error);
    });

    if(window.sessionStorage.getItem('permission') === '9'){
      this.setState({Position:'開發者',
      Display:true});
    }else if(window.sessionStorage.getItem('permission') === '7'){
      this.setState({Position:'老闆',
      Display:false
      //  Display:true
      });
    }
  }
  
  
}

export default MainPage;
