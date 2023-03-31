import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";

class Tickets extends Component {
  constructor(props) {
    super(props);
    //  sending bind function in the method to use "this" event
    this.onChangeDate = this.onChangeDate.bind(this);
    this.submitReservation = this.submitReservation.bind(this);
    this.onChangeTextarea = this.onChangeTextarea.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    // state declaretion
    this.state = {
      info: "",
      eventDate: undefined,
      room: undefined,
      duration: undefined,
      time: undefined,
      ticketAppShow: 0,
    };
  }
  componentDidMount() {
    // get user data from local storage and event call foor the modal to hide it
    let x = JSON.parse(localStorage.getItem("myData"));
    this.setState({ info: x });
    this.props.getTickets(x.id);
    this.props.getUserData();


    var modal = document.getElementById("myModal");
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        this.setState({ ticketAppShow: 0 });
        this.setState({ timeVali: "" });
        this.setState({ durationVali: "" });
        this.setState({ dateVali: "" });
        this.setState({ roomVali: "" });
        this.setState({duration:""})
        this.setState({room:""})
        this.setState({eventDate:""})
        document.querySelector("#roomNumber").value = "Room"
        document.querySelector("#duration").value = "Duration"
        document.querySelector("#dateEvent").value = ""
      }
    });
  }

  submitReservation = (e) => {
    // submiting reservation method with validation aand axios call.
    var building = "Building 10";
    var userid = this.state.info.id;
    var duration = this.state.duration;
    var room = this.state.room;
    var date = this.state.eventDate;
    var name = this.state.info.firstName + " " + this.state.info.lastName
    var email = this.state.info.email
    if (date === undefined || date === "") {
      this.setState({ dateVali: "You must enter date." });
      this.setState({ timeVali: "" });
      this.setState({ durationVali: "" });

      this.setState({ roomVali: "" });
      return;
    }
   
    if (room === undefined || room ==="" || room === "Room") {
      this.setState({ roomVali: "You must enter room." });
      this.setState({ timeVali: "" });
      this.setState({ durationVali: "" });
      this.setState({ dateVali: "" });

      return;
    }
    if (duration === undefined || duration === "" ||duration ==="Duration") {
      this.setState({ durationVali: "You must enter duration." });
      this.setState({ timeVali: "" });

      this.setState({ dateVali: "" });
      this.setState({ roomVali: "" });
      return;
    }

    function sendReservationConfirmationEmail() {
      // email confirmation method
      axios
        .post(
          "phpmailer.php?email="+email+"&name="+ name +"&building=" +
            building +
            "&duration=" +
            duration +
            "&date=" +
            date
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log(userid);
    const obj = {
      building: building,
      userid: userid,
      duration: duration,
      room: room,
      date: date,
      type: "Reservation",
      pass: "submitRequest",
    };
    axios
      .post("Login.php", obj)
      .then((res) => {
  
        this.setState({duration:undefined, eventDate:undefined,room:undefined})
        console.log(res);
        var modal = document.querySelector(".modal");
        modal.style.display = "none";
        let modal1 = document.querySelector(".modalSuccess");
        modal1.style.display = "block";
        if (modal1.style.display === "block") {
          setTimeout(() => {
            modal1.style.display = "none";
          }, 1500);
        }
        sendReservationConfirmationEmail();

        this.setState({ timeVali: "" });
        this.setState({ durationVali: "" });
        this.setState({ dateVali: "" });
        this.setState({ roomVali: "" });
        this.setState({duration:""})
        this.setState({room:""})
        this.setState({eventDate:""})
        document.querySelector("#dateEvent").value = ""
        document.querySelector("#roomNumber").value = "Room"
        document.querySelector("#duration").value = "Duration"
      })
      .catch((err) => {
        console.log(err);
      });
  };
// start of set state method to rreturn a value
  onChangeTextarea(e) {
    this.setState({ Textarea: e.target.value });
  }
  onChangeFile(e) {
    this.setState({ file: e.target.value });
  }
  onChangeDate(e) {
    console.log(e.target.value);
    this.setState({ eventDate: e.target.value });
    console.log(1);
  }
  // end of set state method to return a value
  render() {
// return function in rendering method tto return html css and props variables.
    if (this.props.logoutAdminPortal === 1) {
      return <Navigate to={"/"} />;
    }

   

    return (
      <>
        <div id="success" className="modalSuccess">
          <div className="modal-content">
            <section
              className="login"
              id="login"
              style={{ backgroundColor: "#fff" }}
            >
              <p style={{ color: "#004db0" }}>
                You have successfully reservered a room.
              </p>
            </section>
          </div>
        </div>
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
            {this.state.ticketAppShow === 1 ? (
              <div className="modal-content">
                <section className="login" id="login">
                <div style={{textAlign:"center"}}>
                  <strong style={{
                    color:"#333",
                    textDecoration:"underline"
                  
                  }}>
                    Reservation
                  </strong>
                  </div>
                  <div
                    style={{
                      color: "#333",
                      position: "relative",
                      top: "15px",
                      fontSize: "14px",
                    }}
                  >
                    Building:
                  </div>
                  <select
                  style={{
                    backgroundColor:"#ccc",
                    cursor:"not-allowed"
                  }}
                    disabled
                    className="LoginButton"
                    onChange={(e) => {
                      this.setState({ building: e.target.value });
                    }}
                  >
                    <option>Building 10</option>
                  </select>
                  <div
                    style={{ color: "#333", position: "relative", top: "15px" }}
                  >
                    * Date:
                  </div>
                  <input
                    className="LoginButton"
                    type="date"
                    id="dateEvent"
                    style={{
                      width:"455px"
                    }}
                    value={this.state.eventDate}
                    onChange={this.onChangeDate}
                  />
            
            <div style={{ color: "red",position: "relative", top: "10px",fontSize:"12px" }}>{this.state.dateVali}</div>

                  <div
                    style={{
                      color: "#333",
                      position: "relative",
                      top: "15px",
                      fontSize: "14px",
                    }}
                  >
                    * Room Number:
                  </div>

                  <select
                    className="LoginButton"
                    id="roomNumber"
                    onChange={(e) => {
                      this.setState({ room: e.target.value });
                    }}
                  >
                    <option>Room</option>
                    <option>10.1.1</option>
                    <option>10.1.2</option>
                    <option>10.1.3</option>
                    <option>10.2.1</option>
                    <option>10.2.2</option>
                    <option>10.2.3</option>
                  </select>
                  <div style={{ color: "red",position: "relative", top: "10px",fontSize:"12px" }}>{this.state.roomVali}</div>
                  <div
                    style={{
                      color: "#333",
                      position: "relative",
                      top: "15px",
                      fontSize: "14px",
                    }}
                  >
                    * Duration:
                  </div>
                  <select
                    className="LoginButton"
                    id="duration"
                    onChange={(e) => {
                      this.setState({ duration: e.target.value });
                    }}
                  >
                    <option>Duration</option>
                    <option>7 AM - 7:30 AM</option>
                    <option>7:30 AM - 8:00 AM</option>
                    <option>8:00 AM - 8:30 AM</option>
                    <option>8:30 AM - 9:00 AM</option>
                    <option>9:00 AM - 9:30 AM</option>
                    <option>9:30 AM - 10:00</option>
                    <option>10:00 AM - 10:30 AM</option>
                    <option>10:30 AM - 11:00 AM</option>
                    <option>11:00 AM - 11:30 AM</option>
                    <option>11:30 AM - 12:00 PM</option>
                    <option>12:00 PM - 12:30 PM</option>
                    <option>12:30 PM - 01:00 PM</option>
                  </select>
                  <div style={{ color: "red",position: "relative", top: "12px",fontSize:"12px" }}>{this.state.durationVali}</div>
                 


                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      className="LoginButton"
                      type="button"
                      value="Request Ticket"
                      onClick={this.submitReservation}
                    />
                    <input
                      className="LoginButton"
                      type="button"
                      value="Cancel"
                      style={{
                        marginLeft: "5px",
                      }}
                      onClick={(e) => {
                        var modal = document.getElementById("myModal");
                        modal.style.display = "none";
                        this.setState({ ticketAppShow: 0 });
                        this.setState({ timeVali: "" });
                        this.setState({ durationVali: "" });
                        this.setState({ dateVali: "" });
                        this.setState({ roomVali: "" });
                        this.setState({duration:undefined})
                        this.setState({room:undefined})
                        this.setState({eventDate:""})
                        document.querySelector("#dateEvent").value = ""
                        
                        
                      }}
                    />
                  </div>
                </section>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="" style={{ position: "absolute" }}>
            <Link to={"../Portal"} className="inline-itemStatusBack">
              <img
                src="http://localhost/ticketAppApi/images/back.jpg"
                width={18}
                height={18}
                style={{ position: "relative", top: "4px", left: "3px" }}
              />
            </Link>
            <div className="grid-container">
              <div
                className="grid-item"
                onClick={(e) => {
                  this.setState({ ticketAppShow: 1 });
                  this.props.showModal(e);
                  this.setState({ timeVali: "" });
                  this.setState({ durationVali: "" });
                  this.setState({ dateVali: "" });
                  this.setState({ roomVali: "" });
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: "30px",
                  }}
                >
                  Reserve a room
                </div>

                <div>
                  <img
                    srcSet="http://localhost/ticketAppApi/images/reserve.jpg"
                    className="reservationImg"
                    style={{ width: "90px", height: "90px" }}
                  />
                  <div>
                    <p style={{ fontSize: "15px", textAlign: "center" }}>
                      Use this service to reserve a room on campus
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to={"/IT"}
                className="grid-item"
         
              >
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: "30px",
                  }}
                >
                  Hardware/Software
                </div>

                <div>
                  <img
                    srcSet="http://localhost/ticketAppApi/images/cpu.jpg"
                    className="reservationImg"
                    style={{ width: "90px", height: "90px" }}
                  />
                  <div>
                    <p style={{ fontSize: "15px", textAlign: "center" }}>
                      Use this service to receive assistance on Software or
                      Hardware Problems
                    </p>
                  </div>
                </div>
              </Link>

       
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tickets;
