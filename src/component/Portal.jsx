import React, { Component } from "react";
import axios from "axios";
import "./../assets/AdminPortal.css";
import { Link, Navigate } from "react-router-dom";
import Nav from "./Nav";
class Portal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* initial state */
      date: new Date(),
      logoutState: 0,
      addStudentState: 0,
      adminEmail: props.adminInfo,
      call: "",
      studentFirstName: "",
      studentLastName: "",
      info: "",
    };
  }
  componentDidMount() {
    // setting defaults rendering for the time and date
    this.intervalID = setInterval(() => this.tick(), 1000);
    this.props.getUserData();
  }
  componentWillUnmount() {
    // clear the old interval
    clearInterval(this.intervalID);
  }
// updating or setting the time lapse
  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
  //  rendering th page 
    if (this.props.logoutAdminPortal === 1) {
      // if state to logout 
      return <Navigate to={"/"} />;
    }
 
    return (
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
          <div className="bkImg"></div>

          <div className="" style={{ position: "absolute" }}>
            <div className="grid-container">
            <Link to={"/Tickets"} className="grid-item">
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: "30px",
                  }}
                >
                  <div className="">Issue Ticket</div>
                </div>

                <div>
                  <img
                    srcSet="http://localhost/ticketAppApi/images/add.jpg"
                    className="reservationImg"
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "15px", textAlign: "center" }}>
                    To request a ticket you can visit this page.
                  </p>
                </div>
              </Link>
           
              <Link className="grid-item" to={"/Status"}>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: "30px",
                  }}
                >
                  <div className="">Ticket Status</div>
                </div>

                <div>
                  <img
                    srcSet="http://localhost/ticketAppApi/images/status.jpg"
                    className="reservationImg"
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>
                <div >
                  <p style={{ fontSize: "15px", textAlign: "center" }}>
                    This service enables you to view your ticket current status.
                  </p>
                </div>
              </Link>
              <Link className="grid-item" to={"/Edit"}>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: "30px",
                  }}
                >
                  <div className="">Edit Ticket</div>
                </div>

                <div>
                  <img
                    srcSet="http://localhost/ticketAppApi/images/editor.jpg"
                    className="reservationImg"
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "15px", textAlign: "center" }}>
                    This service enables you to edit your current ticket.
                  </p>
                </div>
              </Link>
             
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Portal;
