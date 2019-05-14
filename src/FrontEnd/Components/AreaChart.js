import React from 'react';
import { Row, Col } from 'antd';
import './AreaChart.css'
import {
    XAxis, YAxis, CartesianGrid, Tooltip,
    AreaChart, Area,
  } from 'recharts';

import { DatePicker } from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;

  const data = [
    {
      name: 'Page A', uv: 4000,
    },
    {
      name: 'Page B', uv: 3000,
    },
    {
      name: 'Page C', uv: 2000,
    },
    {
      name: 'Page D', uv: 2780,
    },
    {
      name: 'Page E', uv: 1890,
    },
    {
      name: 'Page F', uv: 2390,
    },
    {
      name: 'Page G', uv: 3490,
    },
    {
        name: 'Page H', uv: 870,
    },
    {
        name: 'Page I', uv: 1490,
    },
    {
        name: 'Page J', uv: 9490,
    },
      
  ];

class AreaChartItem extends React.Component{
    render(){
        return(
            <Row>
                <Col span={24}>
                    <div>
                        <RangePicker
                        defaultValue={[moment('2018/01/01', dateFormat), moment('2018/01/01', dateFormat)]}
                        format={dateFormat}
                        />
                        <AreaChart className = "AreaChart"
                            width={1500}
                            height={700}
                            data={data}
                            syncId="anyId"
                            margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                    </div>
                </Col>
            </Row>
            
        )
    }
}

export default AreaChartItem