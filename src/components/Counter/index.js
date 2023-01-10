import {Component} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

const data = [
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 400},
  {date: '23-02-2017', count: 100},
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 300},
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 400},
  {date: '23-02-2017', count: 600},
]

class Counter extends Component {
  renderLineChart = () => (
    <div>
      <h1>Line Chart</h1>
      <div className="App">
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  )

  renderBarChart = () => (
    <div>
      <h1>Bar Chart</h1>
      <div>
        <BarChart width={800} height={450} data={data}>
          <CartesianGrid strokeDasharray="" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    </div>
  )

  render() {
    return (
      <div>
        {this.renderLineChart()}
        {this.renderBarChart()}
      </div>
    )
  }
}

export default Counter
