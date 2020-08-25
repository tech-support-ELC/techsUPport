import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Conditions from "./Conditions";
import Medications from "./Medications";
<<<<<<< HEAD
import { fetchCurrentUser } from '../redux/auth'
import DailyCheckin from './DailyCheckin';
import SingleCondition from './SingleCondition';
import AllDoctors from "./AllDoctors"
import SingleDoctor from "./SingleDoctor"
// import AddDoctor from "./AddDoctor"
=======
import { fetchCurrentUser } from "../redux/auth";
import DailyCheckin from "./DailyCheckin";
import SingleCondition from "./SingleCondition";
// import AllDoctors from "./AllDoctors"
import AddDoctor from "./AddDoctor";
>>>>>>> 6398b5b8d03a7d22afc5826ae2cdc0e4af6163f0
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
        <div>
          <Navbar />
        </div>
        <div>
          <h1>This is the root</h1>
<<<<<<< HEAD
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route exact path='/dailycheckin/score' components={DailyCheckin} />
          <Route exact path='/conditions' component={Conditions} />
          <Route path='/conditions/:id' component={SingleCondition} />
          <Route path="/medications" component={Medications} />
          <Route path="/doctors" component={AllDoctors} />
          <Route path="/doctors/:id" component={SingleDoctor} />
=======
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dailycheckin" components={DailyCheckin} />
          <Route exact path="/conditions" component={Conditions} />
          <Route path="/conditions/:id" component={SingleCondition} />
          <Route exact path="/medications" component={Medications} />
          <Route path="/medications/:id" component={SingleMedication} />
          <Route path="/doctors" component={AddDoctor} />
>>>>>>> 6398b5b8d03a7d22afc5826ae2cdc0e4af6163f0
          <Route path="/uploadDoc" component={UploadDocuments} />
        </div>
        <div>
          <Footer />
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
