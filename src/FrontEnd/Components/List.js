import React from 'react';
import { List, Typography } from 'antd';
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'

import './List.css'
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          data:''
        }      
      }
    render(){
        return(
            <div >
                <h3 style={{ marginBottom: 16 }}>庫存</h3>
            <List
            bordered
            dataSource={this.state.data}
            renderItem={item => (
                <List.Item actions={[<p className='stockvalue' style={{fontSize:'0.8cm'}}>{item.stock}</p>]}>
                {item.title}                
                </List.Item>                
            )}
            />  
            </div>
              
        )
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
          this.setState({data:response.data});
        })
        .catch(function (error) {
          console.log(error);
        }); 
        
        axios.get(baseURL+'/ShopData/getExpense',
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
}

export default ListItem
