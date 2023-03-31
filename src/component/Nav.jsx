import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
// !!!### rendering nav bar ###!!!
    let time  =     this.props.date.toLocaleString().split(",")[1]
    let date  =     this.props.date.toLocaleString().split(",")[0]
    return (
      <div className="header">
        <div style={{ marginLeft: "15px" }}>
          <Link to={"/Portal"}>
            <img
              srcSet={process.env.PUBLIC_URL + "images/logolight.jpg"}
              width={70}
              height={80}
              alt="logo"
            />
          </Link>
        </div>
        <div className="leftHeaderWrapper">
          <span style={{
            border:"1px solid #fff",
            padding:"5px"
          }}> 
         Date: {date}
          <br></br>
         Time: {time}
          
          </span>
        </div>
        <div className="headerWrapper">
          <div className="dropdown">
            <div
              style={{
                marginLeft: "0px",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                srcSet={this.props.user.profileImage}
                width={44}
                height={44}
                style={{ borderRadius: "50%" }}
              />{" "}
              <span style={{ marginLeft: "10px" }}>
                {this.props.user.firstName} <br></br>{" "}
                <strong>{this.props.user.occupation}</strong>
              </span>
            </div>
            <div className="dropdown-content">
              <p style={{ cursor: "pointer" }}>
                <Link
                  to={"/Profile"}
                  style={{
                    color: "#004db0",
                    textDecoration: "none",
                    width: "135px",
                    display: "block",
                  }}
                  className="LoginButton"
                >
                  Profile
                </Link>
              </p>
              {this.props.user.occupation === "Admin" ? (
                <p style={{ cursor: "pointer" }}>
                  <Link
                    to={"/Add"}
                    style={{
                      color: "#004db0",
                      textDecoration: "none",
                      width: "135px",
                      display: "block",
                    }}
                    className="LoginButton"
                  >
                    Add User
                  </Link>
                </p>
              ) : (
                ""
              )}

              <p style={{ cursor: "pointer" }}>
                <Link
                  to={"/Settings"}
                  style={{
                    color: "#004db0",
                    textDecoration: "none",
                    width: "135px",
                    display: "block",
                  }}
                  className="LoginButton"
                >
                Change Password
                </Link>
              </p>
              <p style={{ cursor: "pointer" }}>
                <Link
                  onClick={this.props.logout}
                  to={""}
                  style={{
                    color: "#004db0",
                    textDecoration: "none",
                    width: "135px",
                    display: "block",
                  }}
                  className="LoginButton"
                >
                  Logout
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Nav;
