import React from 'react';
import { List, Typography } from 'antd';
import './List.css'
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class ListItem extends React.Component{
    render(){
        return(
            <div >
                <h3 style={{ marginBottom: 16 }}>庫存</h3>
            <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (
                <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
            )}
            />  
            </div>
              
        )
    }
}
export default ListItem
