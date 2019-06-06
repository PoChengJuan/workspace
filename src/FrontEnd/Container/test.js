/*import React from 'react';
import './User.css'
import { Row, Col, Layout, Button, Input } from 'antd';
import { List, Icon, Popover, Avatar, InputNumber } from 'antd';
import axios from 'axios'
import NumericInput from'../Components/InputNumber'

const defaultData = [
    {
      title: 'Ant Design Title 1',
      key: 1,
      value: 0
    },
    {
      title: 'Ant Design Title 2',
      key: 2,
      value: '',
    },
    {
      title: 'Ant Design Title 3',
      key: 3,
      value: '',
    },
    {
      title: 'Ant Design Title 4',
      key: 4,
      value: '',
    },
  ];
  export default class DemoK extends React.Component {
    state = {
      initLoading: true,
      loading: false,
      list: [],
      value: '',
      data: defaultData,
    };
  
    onChange = (item ,Num) => {
      const { data} = this.state;
      console.log('===', Num);
        data.forEach(data => {
        if (data.key === item.key) {
          data.value = Num;
        }
      });
      this.setState({ data });
    }
  
    render() {
      const { value, data } = this.state;
      return (
        <React.Fragment>
          {
            data.map(item =>
              <List.Item key={item.key}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                />
                <div>
                  <InputNumber key={item.key} placeholder="Basic usage" value={item.value} onChange={(e) => this.onChange(item, e)} />
                </div>
              </List.Item>
            )
          }
        </React.Fragment>
      );
    }
  }*/