import React from 'react';
import './User.css'
import { Row, Col, Layout, Button } from 'antd';
import { List, Icon, Popover, Avatar, InputNumber } from 'antd';
import axios from 'axios'

const { Header, Content } = Layout;
const content = (
  <div>
    <p>姓名：</p>
    <p>位置：康樂總店</p>
    <p>人員：開發者</p>
    <Button>登出<Icon type="logout" /></Button>
    
  </div>
);
const data = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
];

class UserPage extends React.Component{
  render(){
    return(
      <div className="App">
        <Row>
          <Layout>
            <Col span={24}>
              <Header className="Header">
                <Popover content={content} trigger="click">
                  <Avatar className="Avatar" shape="square" icon="user" size={60} />    
                </Popover>
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
                        <List.Item>
                          {item} <InputNumber className="Number" /><InputNumber className="Order" placeholder="叫貨" decimalSeparator="." defaultValue="0" />
                        </List.Item>
                      )}
                    />
                  </div>
                  <Button type="primary" className="Upload">上傳</Button>
                </div>
              </Content>
            </Col>
          </Layout>
        </Row>
      </div>
    )
  }

  componentWillMount() {
    console.log('componentWillMount');
    axios.get('http://localhost:8080/ShopData/get')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default UserPage;