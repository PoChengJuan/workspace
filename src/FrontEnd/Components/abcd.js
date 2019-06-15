import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,Legend
} from 'recharts';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import axios from 'axios'
import baseURL from '../Components/AxiosAPI'
import './abcd.css'
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;


const initialState = {
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
  incomedata:'',
  expensedata:'',
  chartWidth:1500,
  chartHeight:700
};

class Abc extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

  constructor(props) {
    super(props);
    this.state = initialState;

    this.saveRef = ref => {this.refDom = ref};
    this.updateDimensions = this.updateDimensions.bind(this)

  }


  render() {
    const {
      data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,incomedata
    } = this.state;

    return (
      <div ref={this.saveRef} className="highlight-bar-charts" style={{ userSelect: 'none' }}>
        <RangePicker
          defaultValue={[moment(moment().add('day',-7).format('YYYY-MM-DD'), dateFormat), moment(moment().format('YYYY-MM-DD'), dateFormat)]}
          format={dateFormat}
          onChange={this.DatePickerFunction.bind(this)}
        />
        
        

        <LineChart
          width={1500}
          height={700}
          data={incomedata}
          //onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
          //onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
          //onMouseUp={this.zoom.bind(this)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            //allowDataOverflow
            dataKey="日期"
            //domain={[left, right]}
            type="category"
          />
          <YAxis
            /*allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"*/
          />
          
          <Tooltip />
          <Legend />
          <Line yAxisId="1" type="natural" dataKey="營業額" stroke="#FF0000" animationDuration={300} />
          <Line yAxisId="1" type="natural" dataKey="進貨支出" stroke="#00FF00" animationDuration={300} />
          <Line yAxisId="1" type="natural" dataKey="雜支" stroke="#0000FF" animationDuration={300} />
        </LineChart>

      </div>
    );
  }

  componentWillMount(e) {
    window.addEventListener("resize", this.updateDimensions);

    console.log('componentWillMount');
    axios.get(baseURL+'/ShopData/getRangeData',
      {
        params: {
          shopname : window.localStorage.getItem('shopname'),
          branch : window.localStorage.getItem('branch'),
          start:moment().add('day',-7).format('YYYY-MM-DD'),
          end:moment().format('YYYY-MM-DD')
        }
      }
    )
    .then( (response) =>{
      this.setState({incomedata:response.data})
      
      console.log(this.state.incomedata)
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillUpdate(){
    console.log('componentWillUpdate');
  }
  DatePickerFunction(dates, dateStrings) {
    axios.get(baseURL+'/ShopData/getRangeData',
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
      this.setState({incomedata:response.data})
      console.log(this.state.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
    
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

export default Abc