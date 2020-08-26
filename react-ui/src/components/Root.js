import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Conditions from "./Conditions";
import Medications from "./Medications";
import { fetchCurrentUser } from "../redux/auth";
import DailyCheckin from "./DailyCheckin";
import SingleCondition from "./SingleCondition";
// import AllDoctors from "./AllDoctors"
import AddDoctor from "./AddDoctor";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UploadDocuments from "./UploadDocuments";
import SingleMedication from "./SingleMedication";

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }
  render() {
    return (
      <Router>
        <div id="app">
          <div>
            <Navbar />
          </div>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dailycheckin" components={DailyCheckin} />
            <Route exact path="/conditions" component={Conditions} />
            <Route path="/conditions/:id" component={SingleCondition} />
            <Route path="/medications" component={Medications} />
            <Route path="/medications/:id" component={SingleMedication} />
            <Route path="/doctors" component={AddDoctor} />
            <Route path="/uploadDoc" component={UploadDocuments} />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null;

const mapDispatch = (dispatch) => ({
  fetchInitialData: () => {
    dispatch(fetchCurrentUser());
  },
});

export default connect(mapState, mapDispatch)(Root);
