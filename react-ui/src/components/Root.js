import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Conditions from "./Conditions";
import Medications from "./Medications";
import { fetchCurrentUser } from "../redux/auth";
import DailyCheckin from "./DailyCheckin";
import SingleCondition from "./SingleCondition";
import AddDoctor from "./AddDoctor";
import Documents from "./Documents"
import Profile from "./Profile"
import AllDoctors from "./AllDoctors"
import SingleDoctor from "./SingleDoctor";
import SingleMedication from "./SingleMedication";
import Navbar from "./Navbar";

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }
  render() {
    const { isLoggedIn } = this.props
    return (

      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />

        {isLoggedIn && (
          <>
            {/* Routes placed here are only available after logging in */}
            <Navbar />
            <Route path='/' component={Home} />
            <Route path='/dailycheckin' component={DailyCheckin} />
            <Route exact path='/conditions' component={Conditions} />
            <Route path='/conditions/:id' component={SingleCondition} />
            <Route path="/medications" component={Medications} />
            <Route path="/medications/:id" component={SingleMedication} />
            <Route path="/doctors" component={AddDoctor} />
            <Route path="/doctors/:id" component={SingleDoctor} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/documents/:id" component={Documents} />
          </>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.currentUser.id
  }
}
const mapDispatch = (dispatch) => ({
  fetchInitialData: () => {
    dispatch(fetchCurrentUser());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Root));
