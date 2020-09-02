import React, { Component } from 'react';
import { scaleLinear, scaleBand, scaleTime } from 'd3-scale';
import XYAxis from './XY-axis';
import Line from './Line';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import { getChartThunk } from '../../redux/score';
import { connect } from 'react-redux';
class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        // {name: 'Jun 30', value: 7},
        // {name: 'Jul 01', value: 7},
        // {name: 'Jul 02', value: 3},
        // {name: 'Jul 03', value: 8},
        // {name: 'Jul 04', value: 1},
        // {name: 'Jul 05', value: 4},
        // {name: 'Jul 06', value: 3},
        // {name: 'Jul 07', value: 6},
        // {name: 'Jul 08', value: 8},
        // {name: 'Jul 09', value: 2},
        // {name: 'Aug 22', value: 10}
      ],
    }
    this.weeklyData = this.weeklyData.bind(this);
    this.monthlyData = this.monthlyData.bind(this);
  }
  async componentDidMount() {
    await this.props.getChart();
    const rate = this.props.chart.map(eachScore => eachScore.rate);
    const date = this.props.chart.map(eachDate => new Date(eachDate.date));
    const shortDate = date.map(d => String(d).slice(4, 10))
    console.log(typeof (shortDate[0]))
    this.setState((prevState) => {
      const data = shortDate.map((d, i) => ({
        name: d,
        value: rate[i]
      }))
      return {
        data
      }
    })
  }
  weeklyData() {
    const rate = this.props.chart.map(eachScore => eachScore.rate);
    const weeklyRate = rate.slice(-7)
    const date = this.props.chart.map(eachDate => new Date(eachDate.date));
    const weeklyDate = date.slice(-7)
    const shortDate = weeklyDate.map(d => String(d).slice(4, 10))
    console.log(shortDate)
    this.setState((prevState) => {
      const data = shortDate.map((d, i) => ({
        name: d,
        value: weeklyRate[i]
      }))
      return {
        data
      }
    })
  }
  monthlyData() {
    const rate = this.props.chart.map(eachScore => eachScore.rate);
    const weeklyRate = rate.slice(-30)
    const date = this.props.chart.map(eachDate => new Date(eachDate.date));
    const weeklyDate = date.slice(-30)
    const shortDate = weeklyDate.map(d => String(d).slice(4, 10))
    console.log(shortDate)
    this.setState((prevState) => {
      const data = shortDate.map((d, i) => ({
        name: d,
        value: weeklyRate[i]
      }))
      return {
        data
      }
    })
  }
  render() {
    const { data } = this.state;
    // console.log(data)
    const parentWidth = 500;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.01)
    // const xScale = scaleTime()
    // .domain(extent(data, d => d.name))
    // .range([0, width])
    // .nice();


    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.value))
    // .curve(curveMonotoneX);

    return (
      <div>
        <h4>How I've Felt Over Time</h4>
        <button onClick={this.weeklyData}>Last week</button>
        <button onClick={this.monthlyData}>Last month</button>
        <svg
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    chart: state.chart,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getChart: () => dispatch(getChartThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);

