import axios from "axios";
import React, { Component } from "react";
import Nav from "./Nav";
import { Link, Navigate } from "react-router-dom";
class Settings extends Component {
  constructor(props) {
    super(props);
    // setting bind functtion to method to use "this" event in the method.
    this.updatePassword = this.updatePassword.bind(this);
    this.state = {
      validation: "",
      info: [],
    };
    this.assignAtt = this.assignAtt.bind(this);
  }

  componentDidMount() {
    // set timeout for assignat which retreives user data to avoid crashes
    setTimeout(() => {
      this.assignAtt();
    }, 500);
  }
  assignAtt() {
    // assignat which retreives user data 
    this.props.getUserData();
    let x = JSON.parse(localStorage.getItem("myData"));
    console.log(x);
    setTimeout(() => {
      this.setState({ info: x });
    }, 500);
    this.setState({
      firstname: x.firstName,
      lastname: x.lastName,
      phone: x.phone,
    });
  }
  // start of setting states value 
  onChangeCurrentPassword = (e) => {
    this.setState({ current: e.target.value });
  };
  onChangeNewPassword = (e) => {
    this.setState({ new: e.target.value });
  };
  ConfirmPassword = (e) => {
    this.setState({ confirm: e.target.value });
  };
  // end of setting states value 
  updatePassword = (e) => {
    // update password method with validation and axios call
    let userid = this.state.info.id;
    let current = this.state.current;
    let newPass = this.state.new;
    let confirm = this.state.confirm;
    console.log(this.state.info);
    console.log(current);
    console.log(newPass);
    console.log(confirm);
    if (this.state.info.password !== current) {
      this.setState({
        validation: "Password is incorrect",
      });
      this.setState({
        validation2: "",
      });
      this.setState({
        validation3: "",
      });
     
      return
    } 
     if (newPass !== confirm || newPass === undefined || confirm === undefined) {
      this.setState({
        validation: "",
      });
      this.setState({
        validation2: "Please enter new password",
      });
      this.setState({
        validation3: "Please confirm password",
      });
      return
    } 
     if (this.state.info.password == current && newPass == confirm) {
      // axios call
      let obj = {
        userid: userid,
        current: current,
        newPass: newPass,
        confirm: confirm,
        pass: "updatePassword",
      };
      axios
        .post("Login.php", obj)
        .then((res) => {
          console.log(res);
          alert("Password changed Successfully, You will be logout");

          this.setState({
            validation: "Password changed Successfully.",
          });
          this.assignAtt();
          this.setState({ re: 1 });
          this.props.logout();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    if (this.state.re === 1) {
      // after updating password user will be navigated to index page
      return <Navigate to={"/"} />;
    }
    if (this.props.logoutAdminPortal === 1) {
            // after updating password user will be navigated to index page
            // user will need to sign in with the new password for security purposes 
      return <Navigate to={"/"} />;
    }
    return (
      // return function to return html css and props variables.
      <>
        {this.props.info && (
          <Nav
            logout={this.props.logout}
            user={this.props.info}
            data={this.props.getUserData}
            date={this.props.date}
          />
        )}

        <div style={{ marginTop: "0px" }} className="wrapper">
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
            </div>
          </div>
          <Link to={"../Portal"} className="inline-itemStatusBack">
              <img
                src="http://localhost/ticketAppApi/images/back.jpg"
                width={18}
                height={18}
                style={{ position: "relative", top: "4px", left: "3px" }}
              />
            </Link>
          <section className="login" id="login" style={{ width: "30%" }}>
            <div className="head" style={{ color: "#333", fontWeight: "bold" }}>
              Change Password{" "}
            </div>

            <div className="form">
              <input
                type="password"
                placeholder="Current Password"
                className="text"
                id="username"
                required
                onChange={this.onChangeCurrentPassword}
              />
              <div
                style={{
                  color: "red",
                  textAlign: "left",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "15px",
                }}
              >
                {this.state.validation}
              </div>

              <input
                type="password"
                placeholder="New Password"
                className="text"
                id="username"
                required
                onChange={this.onChangeNewPassword}
              />
              <div
                style={{
                  color: "red",
                  textAlign: "left",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "15px",
                }}
              >
                {this.state.validation2}
              </div>

              <input
                type="password"
                placeholder="Confirm Password"
                className="text"
                id="username"
                onChange={this.ConfirmPassword}

              />
              <div
                style={{
                  color: "red",
                  textAlign: "left",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "15px",
                }}
              >
                {this.state.validation3}
              </div>
              <input
                type="submit"
                className="LoginButton"
                value={"Update"}
                onClick={this.updatePassword}
              />
            </div>
          </section>
          <footer></footer>
        </div>
      </>
    );
  }
}

export default Settings;
