import React from 'react';





class Warning extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          
        }      
        
      }
    render() {
        return(
            <p>警告</p>
        )
    }
    componentWillMount(){
        console.log('warning page')
    }
}

export default Warning