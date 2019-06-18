import React from 'react';
import './Achieving.css'
import { Table, Button, DatePicker } from 'antd';
import axios from 'axios'
import baseURL from './AxiosAPI'
import moment from 'moment';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';
  const data = [
    {
      name: 'Page A', uv: 4000, pv: 1200, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    }
  ];

class Achieving extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return(
            <div ref={this.saveRef}>
           <p> Achieving</p>
           <BarChart
                width={this.props.Width}
                height={700}
                data={data}
                margin={{
                top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#82ca9d" />
                <Bar dataKey="pv" stackId="a" fill="#ff0000" />
                <Bar dataKey="amt" stackId="a" fill="#8884d8" />

            </BarChart>
            </div>
        )
    }
}

export default Achieving