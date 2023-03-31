import React, { Component } from "react";
import "./../assets/Login.css";
import { Navigate } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /* initial state */
 
   
    };
  }
// ###  rendering login page ####

  render() {
    if(this.props.renderAdminPortal === 1){
      return <Navigate to={`/Portal`} />;
    }
    return (
      <div style={{ marginTop: "0px" }} className="wrapper">
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
          
          </div>
        </div>
        <section className="login" id="login">
          <div className="head"></div>
          <p className="msg">
            <img
              src={"http://localhost/ticketAppAPI/images/logo.jpg"}
              width={200}
              height={240}
              alt="logo"
            />
          </p>
          <div className="form">
              <input
                type="text"
                placeholder="Username"
                className="text"
                id="username"
                required
                onChange={this.props.adminUsernameM}
                value={this.props.adminUsername}
              />
              <input
                type="password"
                placeholder="Password"
                className="password"
                onChange={this.props.adminPasswordM}
                value={this.props.adminPassword}
              />
              <div className="error">
                {this.props.error}
              </div>
              <input type="submit" className="LoginButton" value={"Login"} onClick={this.props.adminPortal} />
          </div>
          
        </section>
        <footer></footer>
      </div>
    );
  }
}
export default Login;
