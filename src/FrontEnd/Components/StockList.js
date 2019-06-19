import React from 'react';
import { Table, Button, DatePicker,Select } from 'antd';
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import moment from 'moment';
import {
  XAxis, YAxis, CartesianGrid,Tooltip,LineChart,Legend,Line
} from 'recharts';
import './StockList.css'

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const itemListData = [
  {
    key: 1,
    title:'item1'
  }
]
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
class CustomizedLabel extends React.Component {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;
    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class StockList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:'',
      itemList:itemListData,
      startDate:moment().add('day',-7).format('YYYY-MM-DD'),
      endDate:moment().format('YYYY-MM-DD'),
      chartWidth:this.props.Width,
      chartHeight:500,
      selecter1:'',
      selecter2:'',
      selecter3:'',
      selecter4:''
    }      
    this.saveRef = ref => {this.refDom = ref};
    this.updateDimensions = this.updateDimensions.bind(this)
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
    <div ref={this.saveRef}>
      <RangePicker
        defaultValue={[moment(this.state.startDate, dateFormat), moment(this.state.endDate, dateFormat)]}
        format={dateFormat}
        onChange={this.DatePickerFunction.bind(this)}
      />
      <Select defaultValue="-" style={{ width: 180 }} onChange={(e)=>this.ItemSelect(e,1)}>
        {
          this.state.itemList.map(item =>
            <Option value={item.title}>{item.title}</Option>
            )
        }
      </Select>
      <Select defaultValue="-" style={{ width: 180 }} onChange={(e)=>this.ItemSelect(e,2)}>
        {
          this.state.itemList.map(item =>
            <Option value={item.title}>{item.title}</Option>
            )
        }
      </Select>
      <Select defaultValue="-" style={{ width: 180 }} onChange={(e)=>this.ItemSelect(e,3)}>
        {
          this.state.itemList.map(item =>
            <Option value={item.title}>{item.title}</Option>
            )
        }
      </Select>
      <Select defaultValue="-" style={{ width: 180 }} onChange={(e)=>this.ItemSelect(e,4)}>
        {
          this.state.itemList.map(item =>
            <Option value={item.title}>{item.title}</Option>
            )
        }
      </Select>
      <LineChart
        width={this.state.chartWidth}
        height={this.state.chartHeight}
        data={this.state.data}
        //data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={this.state.selecter1} stroke = '#ff0000' label={<CustomizedLabel />} />
        <Line type="monotone" dataKey={this.state.selecter2}  stroke = '#00ff00' label={<CustomizedLabel />} />
        <Line type="monotone" dataKey={this.state.selecter3}  stroke = '#0000FF' label={<CustomizedLabel />} />
        <Line type="monotone" dataKey={this.state.selecter4} troke = '#0066FF' label={<CustomizedLabel />} />

      </LineChart>

      <Table 
        //columns={columns} 
        columns={columns}
        dataSource={data} 
        bordered = {true}
        size = 'small'
        pagination={false}
        onChange={this.handleChange} />
      </div>
    )    
  }
  ItemSelect = (value,key) => {
    console.log(value)
    console.log(key)
    if(key === 1){
      this.setState({selecter1:value});
    }else if(key === 2){
      this.setState({selecter2:value});
    }else if(key === 3){
      this.setState({selecter3:value});
    }else if(key === 4){
      this.setState({selecter4:value});
    }
    this.setState({data:this.state.data})
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
      window.localStorage.setItem("StockListPageDate_Start",dateStrings[0])
      window.localStorage.setItem("StockListPageDate_End",dateStrings[1])
        axios.get(baseURL+'/ShopData/getRangeStock',
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
  componentWillMount(){
    window.addEventListener("resize", this.updateDimensions);
    var Start = window.localStorage.getItem('StockListPageDate_Start');
    var End = window.localStorage.getItem('StockListPageDate_End');

    axios.get(baseURL+'/ShopData/getStockItem',
    {
      params: {
        shopname : window.localStorage.getItem('shopname'),
        branch : window.localStorage.getItem('branch'),
      }
    })
    .then( (response) =>{
      this.setState({itemList:response.data})
      console.log(this.state.itemList)
    })
    .catch(function (error) {
      console.log(error);
    }); 
    console.log(Start+"和"+End)
    if(Start === null || End === null){
      axios.get(baseURL+'/ShopData/getRangeStock',
      {
        params: {
          shopname : window.localStorage.getItem('shopname'),
          branch : window.localStorage.getItem('branch'),
          start:moment().add('day',-6).format('YYYY-MM-DD'),
          end:moment().format('YYYY-MM-DD')
        }
      })
      .then( (response) =>{
        this.setState({data:response.data})
        console.log(this.state.data)
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      axios.get(baseURL+'/ShopData/getRangeStock',
      {
        params: {
          shopname : window.localStorage.getItem('shopname'),
          branch : window.localStorage.getItem('branch'),
          start:Start,
          end:End
        }
      })
      .then( (response) =>{
        this.setState({data:response.data})  
        console.log(this.state.data)
      })
      .catch(function (error) {
        console.log(error);
      }); 
      this.setState({
        startDate:Start,
        endDate:End})
    }
    console.log('componentWillMount');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillUpdate(){
    console.log('componentWillUpdate')
  }
  updateDimensions = (e) => { 
    console.log("AreaChart updateDimensions");
    const {clientWidth, clientHeight} = this.refDom;
    console.log('====================================');
    console.log(clientWidth, clientHeight, this.refDom);
    console.log('====================================');
    this.setState({
      chartWidth:clientWidth
    });
  }
}

export default StockList;