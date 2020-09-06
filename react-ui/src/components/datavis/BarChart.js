import React from "react";
import { getTodayScoreThunk } from "../../redux/dcTodayScore";
import { connect } from 'react-redux';
function BarGroup(props) {
  let barPadding = 2
  let barColour = '#348AA7'
  let widthScale = d => d * 10

  let width = widthScale(props.d.value)
  let yMid = props.barHeight * 0.5

  return <g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
    <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
    <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
  </g>
}

class BarChart extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  async componentDidMount() {
    await this.props.getTodayScore();
    const rate = this.props.todayScore.map(eachScore => eachScore.rate);
    const name = this.props.todayScore.map(eachScore => eachScore.name);
    this.setState((prevState) => {
      const data = name.map((d, i) => ({
        name: d,
        value: rate[i],
      }));
      return {
        data,
      };
    });
  }
  render() {
    let barHeight = 30

    let barGroups = this.state.data.map((d, i) =>
    <g transform={`translate(0, ${i * barHeight})`}>
      <BarGroup d={d} barHeight={barHeight} />
    </g>)

    return <svg width="800" height="300" >
      <g className="container">
        <text className="title" x="10" y="30">Today Conditions</text>
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>
  }
}

const mapStateToProps = state => {
  return {
    todayScore: state.todayScore,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTodayScore: () => dispatch(getTodayScoreThunk()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BarChart)
