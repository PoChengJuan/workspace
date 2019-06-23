import React from 'react';
import './Scrap.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, Popover, Avatar, InputNumber,notification,Switch } from 'antd';
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
class ScrapPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isAuth: '',
      UploadDisable:true,
      data:'',
      expense:'',
      Income:'',
      Shop:'',
      Name:'',
      Branch:'',
      Permission:'',
      Position:'',
      Display:false,
      MainPage:false,
      UserPage:false,
      Update:false
    }      
  }
  LogoutFunction(){
    this.setState({isAuth:'false'});
    window.sessionStorage.setItem('isAuth','false');
  }
  ScrapValueStore = (item, Num)=>{
    const {data} = this.state;
    data.forEach(data=>{
      if(data.key === item.key){
        data.scrap = Num
      }
    })
    this.setState({ data });
  }
  DataUpdata=(Update)=>{
    this.setState({Update:true})
  }
  MainFnction(e){
    this.setState({MainPage:true})
  }
  UserFunction(e){
    this.setState({UserPage:true})
  }
  render(){
    const { data,isAuth,MainPage,UserPage } = this.state;
    if(isAuth === 'false'){
      console.log('logout');
      return <Redirect to={'/'} />
    }else if(MainPage === true){
      return <Redirect to={'Main'} />
    }else if(UserPage === true){
      return <Redirect to={'User'} />
    }
    return(
      <div className="App">
        <Row>
          <Layout>
            <Col span={24}>
              <Header className="Header">
                <div>
                    <Icon type="bars" className='store' style={{fontSize:'1cm',color:'#08c'}} onClick={this.UserFunction.bind(this)} />
                    <InfoIcom 
                        name={window.localStorage.getItem('name')}
                        branch={window.localStorage.getItem('branch')}
                        permission = {window.sessionStorage.getItem('permission')}
                        shape='circle'
                        size={60}
                        dropdown = {true}
                        shopchange = {this.DataUpdata}
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
                  <div className='deleteSw'>
                    <Switch checked={this.state.deleteSw}  onChange={this.deleteSwFunc.bind(this)} />
                  </div>
                  <div className='deleteBtn'>
                    <Button disabled={this.state.UploadDisable} type="danger" className="Upload"  onClick={this.UploadFunction.bind(this)} ><Icon type="delete" style={{fontSize:'0.7cm'}}/></Button>
                  </div>
                </div>
              </Content>
            </Col>
          </Layout>
        </Row>
      </div>
    )
  }
  deleteSwFunc(checked){
    console.log(checked)

    if(checked === true){
      this.setState({
        UploadDisable:false,
        deleteSw:true
      })
    }else if(checked === false){
      this.setState({
        UploadDisable:true,
        deleteSw:false
      })
    }
  }
  UploadFunction(event){
    console.log(this.state.Shop)
    this.setState({
      UploadDisable:true,
      deleteSw:false
    })
    axios.get(baseURL+'/ShopData/getTodayData',
    {
      params: {
        shopname: this.state.Shop,
        branch: window.localStorage.getItem('branch'),
        today: moment().format('YYYY-MM-DD')
      }
    })
    .then( (response) =>{
      console.log(response.data);
      if(response.data.length === 0){
        // No Data
        console.log("false")
        axios.post(baseURL+'/ShopData/add', {
          shopname: this.state.Shop,
          branch : window.localStorage.getItem('branch'),
          name:this.state.Name,
          date:moment().format('YYYY-MM-DD'),
          time:moment().format('hh:mm'),
          stock:this.state.data,
          expense:this.state.expense,
          income:this.state.Income
        })
        .then( (response) => {
          console.log(response);
          //window.sessionStorage.setItem('lastupload',moment().format('YYYY-MM-DD'));
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        // Updata
        console.log(this.state.Name)
        console.log(moment().format('hh:mm'))
        console.log(this.state.data)

        axios.put(baseURL+'/ShopData/UpdateScrap/'+response.data[0],{
          name:this.state.Name,
          time:moment().format('hh:mm'),
          stock:this.state.data
        })
        .then( (response) => {
          console.log(response);
          openNotificationWithIcon('success');
        })
        .catch( (error) => {
          console.log(error);
        });
      }
    })
    .catch( (error) => {
      console.log(error);
    })    
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
        response.data[index].stock = 0;
        response.data[index].order = 0;
        response.data[index].scrap = 0;
      }
      this.setState({
        data:response.data,
        Branch:window.localStorage.getItem('branch'),
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
  }
  componentDidMount(){
    console.log('componentdDidMount');
    console.log(moment().format('YYYY-MM-DD hh:mm'))
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
    if(this.state.Update === true){
      axios.get(baseURL+'/ShopData/getLastStock',
        {
          params: {
          shop : window.localStorage.getItem('shopname'),
          branch : window.localStorage.getItem('branch')
        }
      })
      .then( (response) =>{
        console.log(response.data)
        if(response.data !== []){
          for(var index in response.data){
            response.data[index].stock = 0;
            response.data[index].order = 0;
            response.data[index].scrap = 0;
          }
          this.setState({
            data:response.data,
            Branch:window.localStorage.getItem('branch'),
            Update:false
          });
        }else{
          this.setState({
            data:'',
            Name:window.localStorage.getItem('branch'),
            Update:false
          });
        }
      })
      .catch( (error)=>{
        console.log(error);
        this.setState({
          data:'',
          Branch:window.localStorage.getItem('branch'),
          Update:false
        });
      }); 
    }
  }

  Getdata = () =>{
    
  }
}


export default ScrapPage;
