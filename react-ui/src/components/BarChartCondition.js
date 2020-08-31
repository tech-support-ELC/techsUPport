import React, { Component } from 'react';
import {getChartThunk} from '../redux/score';
import { connect } from 'react-redux';
import * as d3 from 'd3';
class BarChart extends Component {
    async componentDidMount() {
        await this.props.getChart();
        const rate = this.props.chart.map(eachScore => eachScore.rate)
        this.drawBarChart(rate)
    }
    drawBarChart(data) {
      const canvasHeight = 400
      const canvasWidth = 1000
      const scale = 20
      const svgCanvas = d3.select(this.refs.canvas)
        .append('svg')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight)
        .style('border', '1px solid black')
      svgCanvas.selectAll('rect')
        .data(data).enter()
        .append('rect')
        .attr('width', 10)
        .attr('height', (datapoint) => datapoint * scale)
        .attr('fill', 'yellow')
        .attr('x', (datapoint, iteration) => iteration * 16)
        .attr('y', (datapoint) => canvasHeight - datapoint * scale)
      svgCanvas.selectAll('text')
        .data(data).enter()
        .append('text')
        .attr('x', (dataPoint, i) => i * 16 + 10)
        .attr('y', (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
        .text(dataPoint => dataPoint)
      }
    render() { return <div ref="canvas"></div> }
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

export default connect(mapStateToProps, mapDispatchToProps)(BarChart)
