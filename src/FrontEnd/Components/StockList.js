import React from 'react';
import { Table, Button, DatePicker } from 'antd';
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import moment from 'moment';

import './StockList.css'

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

class StockList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
        {
            title: '日期',
            dataIndex: 'name',
            key: 'name',
            filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        },
        {
            title: '品項',
            children:[
                {
                    title: '單品豆',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
                {
                    title: '義式豆',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
                {
                    title: '單品豆',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
                {
                    title: '義式豆',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
                {
                    title: '單品豆',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
                {
                    title: '義式豆',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
                {
                    title: '單品豆',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
                {
                    title: '義式豆',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
            ]
        },
        {
            title:'支出',
            children:[
                {
                    title: '進貨支出',
                    dataIndex: 'address',
                    key: 'address',
                    filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
                    filteredValue: filteredInfo.address || null,
                    onFilter: (value, record) => record.address.includes(value),
                    sorter: (a, b) => a.address.length - b.address.length,
                    sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
                },
                {
                    title: '雜支',
                    dataIndex: 'address',
                    key: 'address',
                    filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
                    filteredValue: filteredInfo.address || null,
                    onFilter: (value, record) => record.address.includes(value),
                    sorter: (a, b) => a.address.length - b.address.length,
                    sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
                }
            ]
        },
        {
            title: '營業額',
            dataIndex: 'address',
            key: 'address',
            filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
            filteredValue: filteredInfo.address || null,
            onFilter: (value, record) => record.address.includes(value),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        },
        ];
        return (
            <div>
                <RangePicker
                defaultValue={[moment(moment().add('day',-7).format('YYYY-MM-DD'), dateFormat), moment(moment().format('YYYY-MM-DD'), dateFormat)]}
                format={dateFormat}
                onChange={this.DatePickerFunction.bind(this)}
                />
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    bordered = {true}
                    size = 'small'
                    pagination={false}
                    onChange={this.handleChange} />
            </div>
        )
        
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };
    DatePickerFunction(dates, dateStrings) {
        axios.get(baseURL+'/ShopData/getIncomeData',
          {
            params: {
              shopname : window.localStorage.getItem('shopname'),
              branch : window.localStorage.getItem('branch'),
              start:dateStrings[0],
              end:dateStrings[1]
            }
          }
        )
        .then( (response) =>{
          this.setState({data:response.data})
          console.log(this.state.data)
        })
        .catch(function (error) {
          console.log(error);
        }); 
      }
}

export default StockList;