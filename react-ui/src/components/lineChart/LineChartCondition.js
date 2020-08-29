import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './XY-axis';
import Line from './Line';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import {getChartThunk} from '../../redux/score';
import { connect } from 'react-redux';
class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }
  async componentDidMount() {
    await this.props.getChart();
    const rate = this.props.chart.map(eachScore => eachScore.rate);
    const date = this.props.chart.map(eachDate => eachDate.date.slice(5));
    this.setState((prevState) => {
      const data = date.map((d, i) => ({
        name: d,
        value: rate[i]
      }))
      return {
        data
      }
    })
    console.log(this.state)
}
  // randomData = (e) => {
  //   e.preventDefault();
  //   const rate = this.props.chart.map(eachScore => eachScore.rate);
  //   const date = this.props.chart.map(eachDate => eachDate.date.slice(5));
  //   this.setState((prevState) => {
  //     const data = date.map((d, i) => ({
  //       name: d,
  //       value: rate[i]
  //     }))
  //     return {
  //       data
  //     }
  //   })
  // }
  render() {
    const { data } = this.state;
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
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX);

    return (
      <div>
        <button onClick={this.randomData}>Randomize data</button>
        <svg
          className="lineChartSvg"
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

