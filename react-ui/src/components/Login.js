import React from "react";
import { connect } from "react-redux";
import { login } from "../redux/auth";
// import { API_URL } from "../redux/API_URL";
import { Link } from "react-router-dom";

/* -----------------    COMPONENT     ------------------ */

const Login = (props) => {
  const { handleSubmit } = props;
  return (
    <div className="loginSignup">
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <label>Email</label>
        <input name="email" type="email" required />
        <label>Password</label>
        <input name="password" type="password" required />

        <button type="submit">Log in</button>
      </form>
      <p>OR</p>
      {/* <a target="_self" href={`${API_URL}/auth/google`}> */}
      <a target="_self" href="/auth/google">
        Log in with Google
      </a>

      <Link to="/signup" id="signup">
        Sign up
      </Link>
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit: (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const credentials = { email, password };
    dispatch(login(credentials, ownProps.history));
  },
});

export default connect(null, mapDispatch)(Login);
