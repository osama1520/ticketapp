import axios from "axios";
import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Nav from "./Nav";
class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
  }
  componentDidMount() {
   
// getting user data from local storage in the browser

    let id = JSON.parse(localStorage.getItem("myData")).id;
    this.props.getTickets(id);
    console.log(this.props.tickets);
    this.props.getUserData();
    this.setState({ id: id });
  }

  render() {
    // rendering html css annd props variables
    if (this.props.logoutAdminPortal === 1) {
      return <Navigate to={"/"} />;
    }
 
    let { id } = this.state
 
  
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
        <div className="inline-container" style={{top:"0px"}}>
          <div className="optionsWrapper">
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

          
           
            {this.props.tickets.length === 0 || this.props.tickets.tickets.length === 0 ? "" : <select className="inline-itemStatusSorting" onChange={(e) => this.props.getTickets(id , e)}>
              <option>Sort by Date</option>
              <option>Sort by Priority</option>
              <option>Sort by Status</option>
            </select>}
            
          
        
       
           
          </div>

       

          <div className="inline-itemStatus">
            <table id="customers">
          {this.props.tickets.length === 0 || this.props.tickets.tickets.length === 0 ? <div className="emptyWrapper"><div className="emptyDiv"> <img src="http://localhost/ticketAppAPI/images/empty.png"/> </div> <div className="emptyMsg">No available tickets</div></div> : 
          
          
          <thead>
        

                <tr className="itemtitle">
                  <th>Ticket ID</th>
                  <th>Priority</th>
                  <th>Assignee Email</th>
                  <th>Building</th>
                  <th>Time</th>
                  <th>Ticket Type</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created On</th>
                </tr>
      

              </thead>} 

            
              <tbody>
                {(this.props.tickets.tickets || []).map((res, i) => {
                  return (
                    <tr  className="tr" key={i}>
                      {/* {     console.log(res)} */}
                      <td>{res.ticketID}</td>
                      <td>P{res.Priority === null? "1" :res.Priority}</td>
                      <td>{res.asigneeId === null ? "—": res.asigneeId}</td>
                      <td>{res.building === null ? "—" : res.building}</td>
                      <td>{res.duration === null ? "—" :res.duration}</td>
                      <td>{res.ticketType === null || res.ticketType === "" ?"—":res.ticketType} /  <br></br> {res.additional}</td>
                      <td      dangerouslySetInnerHTML={{ __html: res.description  === "" || res.description === null ? "—" :res.description}}></td>
                      {this.state.id === "5" ? (
                        <td
                          onChange={(e) => {
                            let ticketid = res.ticketID;
                            let update;
                            if (e.target.value == "Open") {
                              update = "0";
                            } else if (e.target.value == "In progress") {
                              update = "2";
                            } else if (e.target.value == "Closed") {
                              update = "1";
                            }
                            let obj = {
                              ticketid: ticketid,
                              update: update,
                              pass: "updateStatus",
                            };
                            axios
                              .post("Login.php", obj)
                              .then((res) => {
                                console.log(res);
                                this.props.getTickets(this.state.id);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          <select
                            className="inline-itemStatusSorting"
                            style={{ width: "100%",top:"0px",fontSize:"12px",marginLeft:"0px" }}
                          >
                            {res.status === "0" ?<option selected>Open</option> :<option>Open</option>} 
                            {res.status === "1" ?<option selected>Closed</option> :<option>Closed</option>} 
                            {res.status === "2" ?<option selected>In progress</option> :<option>In progress</option>} 
                    
                          </select>
                        </td>
                      ) : (
                        <td>
                          {res.status === "0" ? (
                            <span style={{ color: "lightgreen" }}>Open</span>
                          ) : res.status === "1" ? (
                            <span style={{ color: "red" }}>Closed</span>
                          ) : res.status === "2" ? (
                            <span style={{ color: "gold" }}>In progress</span>
                          ) : (
                            ""
                          )}
                        </td>
                      )}
                      <td style={{fontSize:"11px"}}>{res.createdOn}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Status;
