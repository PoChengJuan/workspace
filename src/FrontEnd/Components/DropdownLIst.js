import React from 'react';
import { Dropdown, Menu,Icon } from 'antd';
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import './DropdownList.css'

class DropdownList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          Branch: window.localStorage.getItem('branch'),
          BranchList:[]}
      }
    render(){
        const { BranchList } = this.state;

        return(
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
        )
    }
    ShopChangeHandle = e => {
        console.log('dropdown change to '+e.key)
        this.setState({Branch:this.state.BranchList[e.key-1].branch})
        window.localStorage.setItem('branch',this.state.BranchList[e.key-1].branch);
        this.props.shopchange();
        //this.props.shopchange;
    }
    componentWillMount(){
        axios.get(baseURL+'/ShopInfo/getBranch',
        {
            params: {
            shopname : window.localStorage.getItem('shopname')
        }
        })
        .then( (response) =>{  
            this.setState({
                BranchList:response.data,
            })   
        })
        .catch(function (error) {
        console.log(error);
        });
    }
}

export default DropdownList