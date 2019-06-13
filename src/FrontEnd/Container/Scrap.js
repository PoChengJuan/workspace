import React from 'react';
import './Scrap.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, Popover, Avatar, InputNumber,notification } from 'antd';
import axios from 'axios'
import NumericInput from'../Components/InputNumber'
import {BrowserRouter as Router,Redirect,} from "react-router-dom";
import moment from 'moment';
import baseURL from '../Components/AxiosAPI'
import InfoIcom from '../Components/InfoIcon'
const { Header, Content } = Layout;

const openNotificationWithIcon = type => {
  notification[type]({
    message: '上傳成功',
  });
};

var income = [
  '營業額'
];
class UserPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isAuth: '',
      UploadDisable:true,
      data:'',
      Shop:'',
      Name:'',
      Branch:'',
      Permission:'',
      Display:false,
      MainPage:false
    }      
  }
  LogoutFunction(){
    this.setState({isAuth:'false'});
    window.sessionStorage.setItem('isAuth','false');
  }
  ScrapValueStore = (item, Num)=>{
    const {data} = this.state;
    console.log('order:',Num);
    data.forEach(data=>{
      if(data.key === item.key){
        data.scrap = Num
      }
    })
    this.setState({ data });
  }

  MainFnction(e){
    this.setState({MainPage:true})
  }
  render(){
    const { data,isAuth,MainPage } = this.state;
    if(isAuth === 'false'){
      console.log('logout');
      return <Redirect to={'/'} />
    }else if(MainPage === true){
      return <Redirect to={'Main'} />
    }
    return(
      <div className="App">
        <Row>
          <Layout>
            <Col span={24}>
              <Header className="Header">
                <div>
                    <InfoIcom 
                        name={window.localStorage.getItem('name')}
                        branch={window.localStorage.getItem('branch')}
                        permission = {window.sessionStorage.getItem('permission')}
                        shape='circle'
                        size={60}
                        logout={()=>this.LogoutFunction()}
                    />
                    <Icon type="line-chart" className='analyze' style={{fontSize:'1cm',color:'#08c'}} onClick={this.MainFnction.bind(this)} />
                </div>
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
                        <List.Item key={item.key} actions={
                          [<InputNumber key={item.key} className="Scrap" value={item.scrap} placeholder="叫貨" onChange={(value)=>this.ScrapValueStore(item,value)} decimalSeparator="." />]
                          }>
                          {item.title}
                        </List.Item>
                      )}
                    />
                  </div>
                  <Button type="danger" className="Upload"  onClick={this.UploadFunction.bind(this)}><Icon type="delete" style={{fontSize:'0.7cm'}}/></Button>
                </div>
              </Content>
            </Col>
          </Layout>
        </Row>
      </div>
    )
  }
  UploadFunction(event){
    console.log(this.state.Shop)
    axios.post(baseURL+'/ShopData/add', {
      shopname: this.state.Shop,
      branch : this.state.Branch,
      name:this.state.Name,
      date:moment().format('YYYY-MM-DD'),
      time:moment().format('hh:mm'),
      stock:this.state.data
    })
    .then( (response) => {
      console.log(response);
      window.sessionStorage.setItem('lastupload',moment().format('YYYY-MM-DD'));
      openNotificationWithIcon('success')
      
      //set last upload date
     /* axios.put(baseURL+'/User/updateUploaddate/'+window.sessionStorage.getItem('auto_increment'),{
        date:moment().format('YYYY-MM-DD')
      })
      .then( (response) => {
        console.log(response);
      })
      .catch( (error) => {
        console.log(error);
      });*/
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillMount() {
    console.log('componentWillMount');
      axios.get(baseURL+'/ShopData/getLastStock',
        {
          params: {
            shop : window.localStorage.getItem('shopname'),
            branch : window.localStorage.getItem('branch')
          }
        }
      )
      .then( (response) =>{
      for(var index in response.data){
        response.data[index].scrap = 0;
      }
      this.setState({data:response.data,
        Shop:window.localStorage.getItem('shopname'),
        Name:window.localStorage.getItem('name'),
        Branch:window.localStorage.getItem('branch'),
        isAuth:window.sessionStorage.getItem('isAuth'),
        Permission:window.sessionStorage.getItem('permission')
      });
    })
    .catch(function (error) {
      console.log(error);
    }); 
    axios.get(baseURL+'/ShopData/getLastExpense',
    {
      params: {
        shop: window.localStorage.getItem('shopname'),
        branch: window.localStorage.getItem('branch')
      }
    })
    .then( (response) => {
      for(var index in response.data){
        response.data[index].cost = 0;
      }
      this.setState({expense:response.data});
    })
    .catch(function (error) {
      console.log(error);
    }); 
    this.setState({UploadDisable:false});
  }
  componentDidMount(){
    console.log('componentdDidMount');
    console.log(moment().format('YYYY-MM-DD hh:mm'))
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }
}


export default UserPage;
