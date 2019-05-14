import React from 'react';
import {
  PieChart, Pie,
} from 'recharts';

import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];


class PieChartItem extends React.Component{
    render(){
        return(
            <div>
                <RangePicker
                defaultValue={[moment('2018/01/01', dateFormat), moment('2018/01/01', dateFormat)]}
                format={dateFormat}
                />
                <PieChart width={1200} height={800}>
                <Pie data={data01} dataKey="value" cx={400} cy={400} outerRadius={300} fill="#8884d8" />
                <Pie data={data02} dataKey="value" cx={400} cy={400} innerRadius={320} outerRadius={350} fill="#82ca9d" label />
                </PieChart>
            </div>
            
        )
    }
}
export default PieChartItem;
