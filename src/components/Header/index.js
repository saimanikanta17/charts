import {Component} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Header extends Component {
  state = {timeLineDetails: []}

  componentDidMount() {
    this.getStateDetails()
  }

  getFormattedData = (eachDistrict, districts) => {
    const districtName = eachDistrict
    let {confirmed, deceased, recovered} = districts[eachDistrict].total

    if (confirmed === undefined) {
      confirmed = 0
    }
    if (deceased === undefined) {
      deceased = 0
    }
    if (recovered === undefined) {
      recovered = 0
    }

    const active = confirmed - (recovered + deceased)

    return {
      districtName,
      confirmed,
      deceased,
      recovered,
      active,
    }
  }

  getTimeLineDetails = (lastTen, dates) => {
    const resultList = []
    lastTen.forEach(keyDate => {
      if (dates[keyDate]) {
        const {total, delta} = dates[keyDate]

        const confirmedCases = total.confirmed ? total.confirmed : 0
        const deceasedCases = total.deceased ? total.deceased : 0
        const recoveredCases = total.recovered ? total.recovered : 0

        const confirmed = delta.confirmed ? delta.confirmed : 0
        const deceased = delta.deceased ? delta.deceased : 0
        const recovered = delta.recovered ? delta.recovered : 0
        const tested = delta.tested ? delta.tested : 0
        resultList.push({
          date: keyDate,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmedCases - (deceasedCases + recoveredCases),
        })
      }
    })
    return resultList
  }

  getStateDetails = async () => {
    const stateCode = 'AP'
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const responseTime = await fetch(url)
    const fetchedDataTime = await responseTime.json()

    const {districts} = fetchedData[stateCode]
    const districtsNames = Object.keys(districts)
    const districtsDetails = districtsNames.map(eachDistrict =>
      this.getFormattedData(eachDistrict, districts),
    )

    const lastUpdated = fetchedData[stateCode].meta.last_updated
    const {dates} = fetchedDataTime[stateCode]
    const datesArray = Object.keys(dates)
    datesArray.reverse()
    const lastTen = datesArray.slice(0, 10)

    const timeLineDetails = this.getTimeLineDetails(lastTen, dates)

    const stateName = statesList.find(state => state.state_code === stateCode)
      .state_name
    const stateStats = fetchedData[stateCode].total
    const {confirmed, deceased, recovered, tested} = stateStats
    const stateDetails = {
      stateCode,
      stateName,
      confirmed,
      deceased,
      recovered,
      active: confirmed - (recovered + deceased),
      tested,
      lastUpdated,
    }
    console.log(districtsDetails)
    console.log(fetchedData)
    console.log(fetchedDataTime)
    console.log(lastTen)
    console.log(dates)
    console.log(timeLineDetails)
    console.log(stateDetails)
    this.setState({timeLineDetails})
  }

  renderLineChart = t => {
    const {timeLineDetails} = this.state
    return (
      <div>
        <h1>Line Chart</h1>
        <div>
          <LineChart
            width={730}
            height={250}
            data={timeLineDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={t} stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    )
  }

  renderBarChart = () => {
    const {timeLineDetails} = this.state
    return (
      <div>
        <h1>Bar Chart</h1>
        <div>
          <BarChart width={800} height={300} data={timeLineDetails}>
            <XAxis dataKey="date" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="deceased"
              fill="red"
              className="bar"
              label={{position: 'top', color: 'white'}}
            />
          </BarChart>
        </div>
      </div>
    )
  }

  render() {
    const list = ['confirmed', 'deceased', 'recovered', 'active']
    return (
      <div>
        <ul>{list.map(t => this.renderLineChart(t))}</ul>
        {this.renderBarChart()}
      </div>
    )
  }
}

export default Header
