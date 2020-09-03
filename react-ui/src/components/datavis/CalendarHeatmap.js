import React from "react";
import { connect } from "react-redux";
import { getChartThunk } from "../../redux/score";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { getTodayScoreThunk, getTodayScore } from "../../redux/dcTodayScore";
export class Heatmap extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  async componentDidMount() {
    await this.props.getChart();
    await this.props.getTodayScore();
    const len = this.props.todayScore.length;
    const count = this.props.chart.map((eachScore) => eachScore.rate);
    const date = this.props.chart.map((eachDate) => eachDate.date);
    const countWithoutToday = count.slice(0, -len);
    const dateWithoutToday = date.slice(0, -len);
    const todayCount = count.slice(-len);
    const average = Math.floor(todayCount.reduce((accum, each) => {
      return accum+each
    }, 0)/len);
    const todayDate = date.slice(-len)[0];
    countWithoutToday.push(average);
    dateWithoutToday.push(todayDate);
    this.setState((prevState) => {
      const data = dateWithoutToday.map((d, i) => ({
        date: d,
        count: countWithoutToday[i],
      }));
      return {
        data,
      };
    });
  }
  render() {
    const chart = this.props.chart;
    const data = this.state.data;
    console.log(data)
    return (
      <div>
        <div>
          {chart && chart.length > 0 ? (
            <CalendarHeatmap
              values={data}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count}`;
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    chart: state.chart,
    todayScore: state.todayScore,
  };
};

const mapDispatch = (dispatch) => ({
  getChart: () => dispatch(getChartThunk()),
  getTodayScore: () => dispatch(getTodayScoreThunk()),
});

export default connect(mapState, mapDispatch)(Heatmap);
