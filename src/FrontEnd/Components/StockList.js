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
      item1: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      item1: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      item1: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      item1: 32,
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
            title: '庫存品項',
            children:[
                {
                    title: '單品豆',
                    dataIndex: 'item1',
                    key: 'item1',
                    sorter: (a, b) => a.item1 - b.item1,
                    sortOrder: sortedInfo.columnKey === 'item1' && sortedInfo.order,
                },
                {
                    title: '義式豆',
                    dataIndex: 'item2',
                    key: 'item2',
                    sorter: (a, b) => a.item2 - b.item2,
                    sortOrder: sortedInfo.columnKey === 'item2' && sortedInfo.order,
                },
                {
                    title: '單品豆',
                    dataIndex: 'item3',
                    key: 'item3',
                    sorter: (a, b) => a.item3 - b.item3,
                    sortOrder: sortedInfo.columnKey === 'item3' && sortedInfo.order,
                },
                {
                    title: '義式豆',
                    dataIndex: 'item4',
                    key: 'item4',
                    sorter: (a, b) => a.item4 - b.item4,
                    sortOrder: sortedInfo.columnKey === 'item4' && sortedInfo.order,
                },
                {
                    title: '單品豆',
                    dataIndex: 'item5',
                    key: 'item5',
                    sorter: (a, b) => a.item5 - b.item5,
                    sortOrder: sortedInfo.columnKey === 'item5' && sortedInfo.order,
                },
                {
                    title: '義式豆',
                    dataIndex: 'item6',
                    key: 'item6',
                    sorter: (a, b) => a.item6 - b.item6,
                    sortOrder: sortedInfo.columnKey === 'item6' && sortedInfo.order,
                },
                {
                    title: '單品豆',
                    dataIndex: 'item7',
                    key: 'item7',
                    sorter: (a, b) => a.item7 - b.item7,
                    sortOrder: sortedInfo.columnKey === 'item7' && sortedInfo.order,
                },
                {
                    title: '義式豆',
                    dataIndex: 'item8',
                    key: 'item8',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'item8' && sortedInfo.order,
                },
            ]
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
        console.log(sorter)
        console.log(this.state.sortedInfo)
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