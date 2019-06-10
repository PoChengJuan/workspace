import React from 'react';
import { Icon, Popover,Button, Avatar } from 'antd';
import '../../App.css'

class InfoIcon extends React.Component{
    LogoutFunction(){
        this.props.logout();
      }
    constructor(props){
        super(props);
        this.state = {
            Permission:'',
            isAuth:this.props.isAuth
          }
    }
    render(){
        return(
            <Popover content={
                <div>
                  {
                    //User
                    <div>
                      <p>姓名：{this.props.name}</p>
                      <p>位置：{this.props.branch}</p>
                      <p>權限：{this.state.Permission}</p>
                    </div>
                  }
                  <Button className='logout' onClick={()=>this.LogoutFunction()}>登出<Icon type="logout" /></Button>
                </div>
              } trigger="click">
                <Avatar className="Avatar" shape={this.props.shape} icon="user" size={this.props.size} />    
              </Popover>
        )
    }
    componentWillMount() {
        console.log("InfoIcon")
        if(this.props.permission === '9'){
            this.setState({Permission:'開發者',
            Display:true});
          }else if(this.props.permission === '7'){
            this.setState({Permission:'老闆',
            Display:true});
          }else if(this.props.permission === '5'){
            this.setState({Permission:'店長'});
          }else{
            this.setState({Permission:'人員'});
          }
    }

}
export default InfoIcon;
