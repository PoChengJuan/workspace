import React from 'react';
import { Drawer,Button,Typography } from 'antd';
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
//import moment from 'moment';

const { Text } = Typography;
const { Title } = Typography;


class Warning extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            warningData:[],
            WarningBtnShow:false,
        }      
        
      }
    render() {
        const {warningData,WarningBtnShow} = this.state
        return(
            <span>
                {
                    WarningBtnShow &&
                    <Button className='WarningBtn' type='danger' ghost onClick={this.showDrawer}>警告</Button>
                }
                <Drawer
                  title="警告"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.visible}
                >
                <Title level={4}>{
                  //moment(this.props.date).format('YYYY-MM-DD')
                  }</Title>
                <Title level={4}>庫存不足</Title>
                {
                    warningData.map(item =>
                        <Text type='danger'>
                            {item.title}<br></br>
                        </Text>
                    )
                }
                <Title level={4}></Title>
                </Drawer>
            </span>
            
            
        )
    }
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };
    componentWillMount(){
        console.log('warning page')
        axios.get(baseURL+'/ShopData/getWarning',
            {
              params: {
                shop : window.localStorage.getItem('shopname'),
                branch : window.localStorage.getItem('branch'),
                date: this.props.date,
                page: this.props.page
              }
            }
          )
          .then( (response) =>{
              if(response.data === 'OK'){
                  this.setState({
                    WarningBtnShow:false
                  })
                  console.log('1')
              }else{
                this.setState({
                    WarningBtnShow:true,
                    warningData:response.data
                })
                console.log('2')
              }
        })
        .catch( (error) => {
          console.log(error);
        }); 
    }
    componentWillUpdate(){
        
    }
}

export default Warning