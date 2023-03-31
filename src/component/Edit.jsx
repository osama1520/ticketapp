import axios from "axios";
import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Nav from "./Nav";

import ReactQuill from "react-quill";
class Edit extends Component {
  constructor(props) {
    super(props);
    // setting the bind function for the methods
    this.onChangeFile = this.onChangeFile.bind(this);
    this.updateReqeust = this.updateReqeust.bind(this);
    this.onChangeTextarea = this.onChangeTextarea.bind(this);

    this.state = {
      id: null,
      textArea: undefined,
    };
  }
  componentDidMount() {
    //getting user data from the local storage
    let id = JSON.parse(localStorage.getItem("myData")).id;
    this.props.getTickets(id);
    console.log(this.props.tickets);
    this.props.getUserData();
    this.setState({ id: id });
  }
  cancelTicket(ev, res, index) {
    // cancel method to delete tickets from the data base
    let ticketID = ev.ticketID;
    let userId = ev.userID;
    console.log(res);
    // setting variablee into object
    let obj = {
      ticketID: ticketID,
      pass: "deleteTicket",
    };
    // axios call to the api
    axios
      .post("Login.php", obj)
      .then((res) => {
        console.log(res);
        this.props.getTickets(userId);
        // rendering ticket table
      })
      .catch((err) => {
        console.log(err);
      });
   
  }
  editTicket(ev, res, index) {
    // calling the ticket edit modal
    var modal = document.querySelectorAll(".modal")[res];
    var modalRoom = document.querySelectorAll(".editModal")[res];

   
    console.log(ev);
    if(ev.ticketType === "Hardware" || ev.ticketType === "Software" || ev.ticketType ==="Network"){
      modal.style.display = "block";

    }else{
      this.setState({editReservation : 1})
      modalRoom.style.display = "block";
      
    }
    // When the user clicks on the button, open the modal
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (e) => {
      if (e.target === modal || e.target ===modalRoom) {
        modal.style.display = "none";
        modalRoom.style.display = "none";
        this.setState({ validationTwo: "" });
        this.setState({vali1 :"",vali2:"",vali3:"", reservationError:""})
        this.setState({editReservation : 0,room :undefined,eventDate:undefined,duration:undefined, reservationError:""})
      }
    });
  }
  // start of set method to return the value from the inputs
  onChangeTextarea(e) {
    this.setState({ textArea: e });
  }
  onChangeFile(e) {
    this.setState({ file:  e.target.files[0] });
  }
   // end of set method to return the value from the inputs
  updateReqeust = (res, index) => {
    // the update method to edit or update a ticket
    let userid = this.state.id;
    let txtAreaVal = this.state.textArea;
console.log(res.ticketID, userid, index)
    let filex = this.state.file;
    let form = new FormData();
    form.append("fileUpdate", filex);
    console.log(txtAreaVal);
    console.log(filex);
    if (filex === undefined && txtAreaVal === undefined) {
      this.setState({ validationTwo: "There is no change found" });
      return;
    }

    axios
      .post(
        "Login.php?userid=" +
          userid +
          "&ticketid=" +
          res.ticketID +
          "&txtareaval=" +
          txtAreaVal +
          "&pass=update",
        form
      )
      .then((res) => {
        this.setState({file:undefined})
        this.setState({textArea:undefined})
        console.log(this.state.file, this.state.textArea)
        var modal = document.querySelectorAll(".modal")[index];
        modal.style.display = "none";
        let modal1 = document.querySelector(".modalSuccess");
        modal1.style.display = "block";
        if (modal1.style.display === "block") {
          setTimeout(() => {
            modal1.style.display = "none";
          }, 1000);
        }
        this.props.getTickets(userid);
        console.log(res);
        this.setState({ validationTwo: "" });
  

      })
      .catch((err) => {
        console.log(err);
      });
  };
  updateReservation = (res, index, e) => {
    // update reservation metthod 
    //  validation the user input
    let room = this.state.room;
    let building = "Building 10";
    let eventDate = this.state.eventDate;
    let duration = this.state.duration;
    if(eventDate === undefined) {
      console.log(eventDate,room,building )
      this.setState({vali1:"Please fill the date" })
      this.setState({vali3:"" })
      this.setState({vali2:"" })
      return
    }else if(room === undefined){
      this.setState({vali2:"Please fill the room number" })
      this.setState({vali1:"" })
      this.setState({vali3:"" })
      return
    }else if(duration === undefined){
      this.setState({vali1:"" })
      this.setState({vali2:"" })
      this.setState({vali3:"Please fill the duration" })
      return
    }
    else{
    console.log(duration)

      let userid = this.state.id;
      //  setting variables into object to send through axios call to the api
      const obj = {
        room:room,
        building: building,
        userid: res.userID,
        ticketID:res.ticketID,
        duration:duration,
        eventDate:eventDate,
        type: "Reservation",
        pass: "updateReservation",
      };
      axios
        .post("Login.php", obj)
        .then((res) => {
          console.log(res);
         
          let modal = document.querySelectorAll(".editModal")[index];
          modal.style.display = "none";
          let modal1 = document.querySelector(".modalSuccess");
          modal1.style.display = "block";
          if (modal1.style.display === "block") {
            setTimeout(() => {
              modal1.style.display = "none";
            }, 1500);
          }
          // console.log(res.userID)
          this.setState({vali1:"" })
          this.setState({vali2:"" })
          this.setState({vali3:"" })
          this.props.getTickets(userid);
          this.setState({editReservation : 0,room :undefined,eventDate:undefined,duration:undefined, reservationError:""})
  
        })
        .catch((err) => {
          console.log(err);
        });
    }
  

  
  };
  render() {
    // render method with returrn function of html and css and props and state variables
    if (this.props.logoutAdminPortal === 1) {
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
        <div id="success" className="modalSuccess">
          <div className="modal-content" style={{ width: "59%" }}>
            <section
              className="login"
              id="login"
              style={{ backgroundColor: "#fff" }}
            >
            <p style={{ color: "#004db0" }}>
                <strong>You have updated your ticket</strong> 
              </p>
            </section>
          </div>
        </div>
      
       
        <div className="inline-container">
        <Link
          to={"../Portal"}
        
          className="inline-itemStatusBack"
        >
            <img
                src="http://localhost/ticketAppApi/images/back.jpg"
                width={18}
                height={18}
                style={{ position: "relative", top:"4px",left:"3px" }}
              />
        </Link>
        {console.log(this.props.tickets)}
          {this.props.tickets.length === 0 ||
          this.props.tickets.tickets.length === 0 ? (
            <div className="inline-itemStatus" style={{
              position:"relative",
              bottom:"150px"
            }}>
              <div className="emptyWrapper">
                <div className="emptyDiv">
                  {" "}
                  <img src="http://localhost/ticketAppAPI/images/empty.png" />{" "}
                </div>{" "}
                <div className="emptyMsg">No available tickets</div>
              </div>
            </div>
          ) : (
            (this.props.tickets.tickets || []).map((res, i) => {
              return (
                <div className="inline-item" key={i}>
                    <div id="editModal" className="editModal">
          
     
     <div className="modal-content">
      {
        this.state.editReservation === 1 ?    <section className="login" id="login">
        <div style={{textAlign:"center"}}>
          <strong style={{
            color:"#333",
            textDecoration:"underline"
          
          }}>
            Reservation
          </strong>
          </div>
          <div style={{textAlign:"center"}}>
        

          <div
            style={{
              color: "#333",
              position: "relative",
              top: "15px",
              fontSize: "14px",
              textAlign:"left"
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
          >
            <option>Building 10</option>
          </select>
          <div
            style={{
              color: "#333",
              position: "relative",
              top: "15px",
              fontSize: "14px",
              textAlign:"left"
            }}
          >
            * Date:
          </div>
          <input
            className="LoginButton"
            type="date"
            style={{
              width:"455px"
            }}
            value={this.state.eventDate}
            onChange={(e)=>{
              this.setState({eventDate:e.target.value})
            }}
          />
         
          </div>
    
          <div style={{ color: "red",position: "relative", top: "10px",fontSize:"12px" }}>{this.state.vali1}</div>
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
          <div style={{ color: "red",position: "relative", top: "10px",fontSize:"12px" }}>{this.state.vali2}</div>
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
          <div style={{ color: "red",position: "relative", top: "10px",fontSize:"12px" }}>{this.state.vali3}</div>
         


          <div
            style={{
              display: "flex",
            }}
          >
            <input
              className="LoginButton"
              type="button"
              value="Request Ticket"
              onClick={this.updateReservation.bind(this, res, i)}
            />
            <input
              className="LoginButton"
              type="button"
              value="Cancel"
              style={{
                marginLeft: "5px",
              }}
              onClick={(e) => {
                var modal = document.querySelectorAll("#editModal")[i];
                modal.style.display = "none";
                this.setState({vali1 :"",vali2:"",vali3:"", reservationError:""})
                this.setState({editReservation : 0,room :undefined,eventDate:undefined,duration:undefined, reservationError:""})
              }}
            />
          </div>
        </section> : ""
      }
             
              </div>
          </div>
       
                  <div
                    id={`myModal-${res.ticketID}`}
                    className="modal"
                    key={res.ticketID}
                  >
                    <div className="modal-content" style={{ width: "59%" }}>
                      <section
                        className="login"
                        id="login"
                        style={{ backgroundColor: "#fff" }}
                      >
                        <label htmlFor="file" style={{ color: "#000" }}>
                          Select a file:
                        </label>
                        <input
                          type="file"
                          id="file"
                          name="fileUpdate"
                          style={{ color: "#000" }}
                          onChange={this.onChangeFile}
                        />
                        <br></br>
                        <br></br>

                        <ReactQuill
                          style={{ height: "150px" }}
                          defaultValue={res.description}
                          onChange={this.onChangeTextarea}
                        />
                        <br></br>
                        <br></br>
                        <input
                          className="LoginButton"
                          type="button"
                          value="Update"
                          onClick={this.updateReqeust.bind(this, res, i)}
                        />

                        <div
                          style={{
                            color: "red",
                            textAlign: "center",
                            fontSize: "14px",
                            marginTop: "20px",
                          }}
                        >
                          {this.state.validationTwo}
                        </div>
                      </section>
                    </div>
                  </div>
                  <div style={{ float: "right", display: "flex" }}>
                    <div
                      style={{ marginRight: "5px" }}
                      onClick={this.cancelTicket.bind(this, res, i)}
                      className="crudbtn"
                    >
                      Cancel
                      {/* {console.log(res.userId , this.state.id)} */}
                    </div>
                    {res.userID === this.state.id ? (
                      <div
                        style={{ marginRight: "5px", marginLeft: "10px" }}
                        className="crudbtn"
                        onClick={this.editTicket.bind(this, res, i)}
                      >
                        Update
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div style={{ textAlign: "left", fontWeight: "bold" }}>
                    <div className="">Ticket Type: {res.ticketType}</div>
                  </div>
                  <div style={{ textAlign: "left", fontWeight: "400" }}>
              
                    {res.ticketType !== "Hardware" &&
                    res.ticketType !== "Network" &&
                    res.ticketType !== "Software" ? (
                      ""
                    ) : (
                            <div style={{padding:"5px", width:"70%"}}>
                        <div className=""> Assignee: {res.asigneeId}</div>
                        <div className="">Ticket About : {res.ticketTopic}</div>
 <div className=""> Ticket Created : {res.createdOn}</div>
                    <div className=""> Ticket ID : {res.ticketID}</div>
                        </div>

                    )}
                 
                    
                    {res.ticketType !== "Hardware" &&
                    res.ticketType !== "Network" &&
                    res.ticketType !== "Software" ? (
                      <div style={{padding:"5px", width:"35%"}}>
                      <div className="">Location: {res.building}</div>
                        <div className="">Reservation Time: {res.duration}</div>
                        <div className="">Reservation Room: {res.room}</div>
                        <div className="">Reservation Date: {res.dateEvent}</div>
                      </div>
                       
                    ) : (
                      ""
                    )}

                   
                  </div>

                  <div>
                    {
                        res.description === null ? "" :   <p
                        className="font"
                          dangerouslySetInnerHTML={{ __html: "Description: " + res.description }}
                        ></p>
                    }
                  
                  </div>
                  <div>
                    {res.files !== null ? (
                      <a
                        href={res.files}
                        target="_blank"
                        className="crudbtn"
                        style={{
                          border: "1px solid #ccc",
                          paadding: "5px",
                        }}
                      >
                        Attachments
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  }
}

export default Edit;
