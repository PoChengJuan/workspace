import React from 'react';
import { Menu, Dropdown, Icon, Popover,Button, Avatar, Layout,Row,Col } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import '../../App.css'
import './Main.css'
import CSILogo from '../png/Logo.png' 
import BalanceSheet from '../Components/Balance.js';
import PieChartItem from '../Components/PieChart.js'
import Info from '../Components/Info.js';
import BarChartItem from '../Components/BarChart.js'
import InfoIcom from'../Components/InfoIcon.js'
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import MenuItem from 'antd/lib/menu/MenuItem';
import StockList from '../Components/StockList.js'
import Abc from '../Components/abcd.js'
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
      Branch: window.localStorage.getItem('branch'),
      BranchList:BranchData,
      StockPage: false,
      ScrapPage: false,
      isAuth:'',
      Display:''}
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
        path: "/Info",
        exact: true,
        main: () => <Info Branch={this.state.Branch} Width={this.refDom.clientWidth-50} />
      },
      {
        path: '/StockList',
        main: () => <StockList Branch={this.state.Branch} Width={this.refDom.clientWidth-50} />
      },
      {
        path: "/bubblegum",
        main: () => <PieChartItem Branch={this.state.Branch} Width={this.refDom.clientWidth-50} />
      },
      {
        path: "/BalanceSheet",
        main: () => <BalanceSheet Branch={this.state.Branch} Width={this.refDom.clientWidth-50} />
      },
      {
        path: "/Statistics",
        main: ()=> <Statistics Branch={this.state.Branch} Width={this.refDom.clientWidth-50} />
      },
      {
        path: "/Achieving",
        //main: () => <BarChartItem width={1500} height={700} />
        main: () => <Achieving Branch={this.state.Branch} Width={this.refDom.clientWidth-50} />
      }
    ];
    const { StockPage,ScrapPage,isAuth,BranchList } = this.state;
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
              logout={()=>this.LogoutFunction()}
            />
            <Dropdown
              onClick={this.TestFunction.bind(this)}  
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
              <a className="ant-dropdown-link" >
                {this.state.Branch} <Icon type="down" />
              </a>
            </Dropdown>
          </Header>
          <Row>
            <Layout>
              <Router>
                <Col xs={{span:0}} sm={{span:0}} md={{span:2}} xl={{span:2}} className="Sider">
                  <Sider className="Sider">
                    <div  className="SiderItem">
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                          <Link to='/Info'>店家資訊</Link>
                        </li>
                        <li>
                          <Link to='/StockList'>庫存明細</Link>
                        </li>
                        <li>
                          <Link to='/BalanceSheet'>收支圖</Link>
                        </li>
                        <li>
                        {this.state.Display &&
                          <Link to='/Achieving'>達成率</Link>
                        }
                        </li>
                        <li>
                        {this.state.Display &&
                          <Link to='/Statistics'>統計</Link>
                        }
                        </li>
                        <li>
                          <a onClick={this.StockFunction.bind(this)}>盤點</a>
                        </li>
                        <li>
                        {this.state.Display &&
                           <a onClick={this.ScrapFunction.bind(this)}>報廢</a>
                        }
                        </li>
                      </ul>
                    </div>
                  </Sider>
                </Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:22}} xl={{span:22}}>
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
                </Col>
              </Router>
            </Layout>
          </Row>
          <Footer className="Footer">Information</Footer>
        </Layout>
        
      </div>
    )
  }
  TestFunction = () =>{
    //console.log('test')
    //shop.map(item =>
     // )
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
