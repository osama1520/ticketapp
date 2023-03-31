import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//  a json format to select asignee data
const departments = {
  softwareDepartment: [
    {
      id: "1",
      name: "John Smith",
      title: "Software Engineer",
      email: "john.smith@example.com",
    },
    {
      id: "2",
      name: "Jane Doe",
      title: "Software Engineer",
      email: "jane.doe@example.com",
    },
    {
      id: "3",
      name: "Bob Johnson",
      title: "Software Engineer",
      email: "bob.johnson@example.com",
    },
    {
      id: "4",
      name: "Samantha Lee",
      title: "Software Engineer",
      email: "samantha.lee@example.com",
    },
  ],
  hardwareDepartment: [
    {
      id: "5",
      name: "Tom Wilson",
      title: "Hardware Technician",
      email: "tom.wilson@example.com",
    },
    {
      id: "6",
      name: "Kelly Chen",
      title: "Hardware Test Engineer",
      email: "kelly.chen@example.com",
    },
    {
      id: "7",
      name: "David Kim",
      title: "Hardware Technician",
      email: "david.kim@example.com",
    },
    {
      id: "8",
      name: "Maria Rodriguez",
      title: "Hardware Technician",
      email: "maria.rodriguez@example.com",
    },
  ],
  networkDepartment: [
    {
      id: "9",
      name: "Mike Brown",
      title: "Network Administrator",
      email: "mike.brown@example.com",
    },
    {
      id: "10",
      name: "Karen Liu",
      title: "Network Administrator",
      email: "karen.liu@example.com",
    },
    {
      id: "11",
      name: "Jackie Zhang",
      title: "Network Administrator",
      email: "jackie.zhang@example.com",
    },
    {
      id: "12",
      name: "Patrick Lee",
      title: "Network Administrator",
      email: "patrick.lee@example.com",
    },
  ],
};


class IT extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ticketSoftware: 0,
      priority: "Select Priority",
      info: "",
      ticketAppShow: 0,
    };
    this.onChangeTextarea = this.onChangeTextarea.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  componentDidMount() {
    // returning thhe data in localstorage and a event listner to click out of the popup modal
    const departmentKeys = Object.keys(departments);

    // Select a random department key
    const randomDepartmentKey =
      departmentKeys[Math.floor(Math.random() * departmentKeys.length)];

    // Get the employees in the randomly selected department
    const randomDepartmentEmployees = departments[randomDepartmentKey];
    this.setState({ deptU: randomDepartmentEmployees[0].name });
    this.props.getUserData();
  
    let x = JSON.parse(localStorage.getItem("myData"));
    this.setState({ info: x });
    this.props.getTickets(x.id);
    this.props.getUserData();

    var modal = document.getElementById("myModal");

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        this.setState({ ticketAppShow: 0 });
        this.setState({ validationTicket: "" });
        this.setState({ subVali: "",validationTxt:"" });
        this.setState({fileVali:""})
        this.setState({ subVali: "" });
            this.setState({subcategory:undefined,priority:undefined})
        this.setState({ Textarea: undefined });
      }
    });
  }
  // start oof setting states to return a value from the inputs 
  onChangeTextarea = (e) => {
    this.setState({ Textarea: e });
  };
  onChangeFile(e) {
    this.setState({ file: e.target.value });
  }
  // end of setting states to return a value from the inputs 
  submitReqeust = (e) => {
    // submiting a ticket
    var userid = this.state.info.id;
    var name = this.state.info.firstName + " " + this.state.info.lastName
    var email = this.state.info.email
    var issue = this.state.option;
    var condition = this.state.category;
    var txtAreaVal = this.state.Textarea;
    var priority = this.state.priority;
    let sub= this.state.subcategory
    console.log(userid);
    function sendReservationConfirmationEmail() {
      // email confiration to send email confirmation using axios to the api phpmailer.
      console.log(priority);
      axios
        .post("phpmailer.php?email="+email+"&name="+ name +"&issue="+issue+"&sub="+sub+"&priority=" + priority + "&category=" + condition)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // validating priority input

    if (priority === "1 High") {
      priority = 1;
    } else if (priority === "2 Normal") {
      priority = 2;
    } else if (priority === "3 Low") {
      priority = 3;
    }
    let filex = document.querySelector("#file").files[0];
    let form = new FormData()

    form.append("file", filex);
//  validating other input like subcategory, priority, file, and text value
    console.log(txtAreaVal, this.state.priority, this.state.subcategory);
    if (this.state.subcategory === "Sub Category" || this.state.subcategory === undefined) {
      this.setState({ subVali: "Please fill sub category" });
      this.setState({ validationTicket: "" });
      this.setState({ validationTxt: "" });
      return;
    }
    if (this.state.priority === "Select Priority" || this.state.priority === undefined) {
      this.setState({ validationTicket: "Please Fill the priority" });
      this.setState({ subVali: "" });
      this.setState({ validationTxt: "" });
      return;
    }
    console.log(filex !== "undefined" )
    console.log(filex )
    let filey = ""
    if(filex !== undefined){
       filey = filex.name.split(".")[1] === "undefined" ? "" : filex.name.split(".")[1] 

    }else{

    }
    console.log(filex)
    console.log(filey)
  
    if( filex !== undefined && filey !== "pdf" &&  filey !== "docx" && filey !== "png" &&filey !== "jpg"){
      this.setState({fileVali:"File format is not supported"})
      this.setState({ validationTicket: "" });
      this.setState({ subVali: "" });
      this.setState({ validationTxt: "" });
      return
    }

 
    if (txtAreaVal === undefined) {
      this.setState({ validationTicket: "" });
      this.setState({ subVali: "" });
      this.setState({ validationTxt: "Please Fill the text area" });
      return;
    }
    const x = [];
// searching for a random asignee to resolve the ticket
    Object.values(departments).forEach((dept) => {
      const name = dept.find((employee) => employee.name === this.state.deptU);
      if (name) {
        x.push({
          department: Object.keys(departments).find(
            (key) => departments[key] === dept
          ),
          ...name,
        });
      }
    });
    console.log(x);
    let objDept = {
      department: x[0].department,
      id: x[0].id,
      name: x[0].name,
      title: x[0].title,
      email: x[0].email,
      userid: this.state.info.id,
      pass: "deptProcess",
    };
// axios call 
    axios
      .get(
        "Login.php?userid=" +
          this.state.info.id +
          "&issue=" +
          issue +
          "&sub="+
          sub +
          "&priority=" +
          priority +
          "&condition=" +
          condition +
          "&txtareaval=" +
          txtAreaVal +
          "&asigneeId=" +
          objDept.email +
          "&pass=submit",
        form
      )
      .then((res) => {
        console.log(res);
        
        this.setState({ Textarea: "" });
        document.getElementById("myModal").style.display = "none";
     
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
         this.setState({ ticketAppShow: 0 });
          this.setState({ validationTicket: "" });
        this.setState({ subVali: "",validationTxt:"" });

        this.setState({ subVali: "" });
        this.setState({subcategory:undefined,priority:undefined})
        this.setState({ Textarea: undefined });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let name = this.state.info.firstName + " " + this.state.info.lastName;
    if (this.props.logoutAdminPortal === 1) {
      return <Navigate to={"/"} />;
    }

    return (
      <>
        <div id="success" className="modalSuccess">
          <div className="modal-content" style={{ width: "59%" }}>
            <section
              className="login"
              id="login"
              style={{ backgroundColor: "#fff" }}
            >
              <p style={{ color: "#004db0" }}>
                <strong>Thank you for submiting the form!</strong> You should
                receive a confirmation email shortly.
              </p>
            </section>
          </div>
        </div>
        <div id="alert" className="modalAlert">
          <div className="modal-content" style={{ width: "59%" }}>
            <section
              className="login"
              id="login"
              style={{ backgroundColor: "#fff", textAlign: "center" }}
            >
              <p
                style={{
                  color: "#333",
                }}
              >
                Are you sure you want to cancel this form?
              </p>
              <div
                style={{
                  display: "flex",
                }}
              >
                <input
                  className="LoginButton"
                  type="button"
                  value="Yes"
                  onClick={(e) => {
                    this.setState({fileVali:""})
                    this.setState({ ticketAppShow: 0 });
                    this.setState({ timeVali: "" });
                    this.setState({ durationVali: "" });
                    this.setState({ dateVali: "" });
                    this.setState({ roomVali: "" });
                    this.setState({ subVali: "",validationTxt:"" });
                    this.setState({subcategory:undefined, Textarea:undefined,priority:undefined})
                    var modal = document.getElementById("myModal");
                    modal.style.display = "none";
                    var modal = document.querySelector(".modalAlert");
                    modal.style.display = "none";
                  }}
                />
                <input
                  className="LoginButton"
                  type="button"
                  value="No"
                  style={{
                    marginLeft: "5px",
                  }}
                  onClick={(e) => {
                    var modal = document.querySelector(".modalAlert");
                    modal.style.display = "none";
                  }}
                  // onClick={this.submitReservation}
                />
              </div>
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
              <div className="modal-content" style={{ width: "59%" }}>
                <section
                  className="login"
                  id="login"
                  style={{ backgroundColor: "#fff" }}
                >
                  <br></br>
                  <div style={{textAlign:"center"}}>
                  <strong style={{
                    color:"#333",
                    textDecoration:"underline"
                  
                  }}>
                    Issue a Ticket
                  </strong>
                  </div>
                 
                  <div
                    style={{ color: "#333", position: "relative", top: "15px" }}
                  >
                    Name:
                  </div>
                  <input className="LoginButton" value={name} disabled    style={{
                    backgroundColor:"#ccc",
                    cursor:"not-allowed"
                  }}></input>
                  <div
                    style={{ color: "#333", position: "relative", top: "15px" }}
                  >
                    Issue:
                  </div>
                  <input
                    className="LoginButton"
                    // placeholder="Your Problem"
                    value={this.state.option}
                    disabled
                    style={{
                      backgroundColor:"#ccc",
                      cursor:"not-allowed"
                    }}
                  ></input>
                  <div
                    style={{ color: "#333", position: "relative", top: "15px" }}
                  >
                    Available Technician:
                  </div>
                  <input
                    className="LoginButton"
                    // placeholder="Your Problem"
                    value={this.state.deptU}
                    disabled
                    style={{
                      backgroundColor:"#ccc",
                      cursor:"not-allowed"
                    }}
                  ></input>
                  
                  <div
                    style={{ color: "#333", position: "relative", top: "15px" }}
                  >
                    * Subcategory:
                  </div>

                  {this.state.option === "Software" ? (
                    <select
                      id="mySelect"
                      className="LoginButton"
                      style={{
                        width:"102%"
                      }}
                      onChange={(e) =>
                        this.setState({ subcategory: e.target.value })
                      }
                    >
                      {" "}
                      <option>Sub Category</option>
                      <option>Application Installation</option>
                      <option>Reset PC</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    ""
                  )}
                      {this.state.option === "Trouble Shooting" ? (
                    <select
                      id="mySelect"
                      className="LoginButton"
                      onChange={(e) =>
                        this.setState({ subcategory: e.target.value })
                      }
                    >
                      {" "}
                      <option>Sub Category</option>
                      <option>Hard Drive Failure</option>
                      <option>Network Connectivity Problem</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    ""
                  )}
                       {this.state.option === "D2L Issues" ? (
                    <select
                      id="mySelect"
                      className="LoginButton"
                      onChange={(e) =>
                        this.setState({ subcategory: e.target.value })
                      }
                    >
                      {" "}
                      <option>Sub Category</option>
                      <option>Site is not available</option>
                      <option>Other</option>
                    </select>
                    
                  ) : (
                    ""

                  )}
                   <div style={{ color: "red", textAlign: "left",marginTop:"5px" }}>
                    {this.state.subVali}
                  </div>
  
                  <div
                    style={{ color: "#333", position: "relative", top: "15px" }}
                  >
                    * Priority:
                  </div>
                  <select
                    id="mySelect"
                    className="LoginButton"
                    style={{
                      width:"102%"
                    }}
                    onChange={(e) =>
                      this.setState({ priority: e.target.value })
                    }
                  >
                    <option>Select Priority</option>
                    <option>1 High</option>
                    <option>2 Normal</option>
                    <option>3 Low</option>
                  </select>
                
                  <div style={{ color: "red", textAlign: "left",marginTop:"5px" }}>
                   {this.state.validationTicket}
                  </div>
                  <div
                    style={{ color: "#333", position: "relative", top: "15px" }}
                  >
                    Attach a File:{" "}
                    <span style={{ color: "gray", fontSize: "12px" }}>
                      pdf/word/jpg [Max size 10MB]
                    </span>
                  </div>

          
                  <input
                    type="file"
                    className="LoginButton"
                    id="file"
                    name="fileUpdate"
                    style={{ color: "#000" }}
                    onChange={this.onChangeFile}
                  />
                       <div style={{ color: "red", textAlign: "left",marginTop:"5px" }}>
                   {this.state.fileVali}
                  </div>
           
                  <br></br>
                  <div
                    style={{ color: "#333", position: "relative", top: "15px" }}
                  >
                    * Please describe your issue here:
                  </div>
                  <br></br>
                  <ReactQuill
                    style={{ height: "150px" }}
                    value={this.state.Textarea}
                    onChange={this.onChangeTextarea}
                  />
                  <br></br> 
                  <br></br>
                 
                  <div style={{ color: "red", textAlign: "left",marginTop:"5px" }}>
                    {this.state.validationTxt}
                  </div>
                
                  
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      className="LoginButton"
                      type="button"
                      value="Request Ticket"
                      onClick={this.submitReqeust}
                    />
                    <input
                      className="LoginButton"
                      type="button"
                      value="Cancel"
                      style={{
                        marginLeft: "5px",
                      }}
                      onClick={(e) => {
                        let modalAlert = document.querySelector(".modalAlert");
                        modalAlert.style.display = "block";
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
            <Link
              to={"../Portal"}
              style={{ marginLeft: "auto", backgroundColor: "#f7f7f7" }}
              className="inline-itemStatusBack"
            >
              <img
                src="http://localhost/ticketAppApi/images/back.jpg"
                width={18}
                height={18}
                style={{ position: "relative", top: "4px", left: "3px" }}
              />
            </Link>
            <div className="grid-containerTickets">
              <div
                className="grid-item"
                onClick={(e) => {
                  this.setState({ option: "Trouble Shooting" });
                  this.setState({ category: "Hardware" });
                  this.setState({ ticketAppShow: 1 });
                  this.props.showModal();
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: "30px",
                  }}
                >
                  <div className="">Trouble Shooting</div>
                </div>

                <div>
                  <img
                    srcSet="http://localhost/ticketAppApi/images/troubleshooting.jpg"
                    className="reservationImg"
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "15px", textAlign: "center" }}>
                    For hardware and network trouble shooting select this
                    option.
                  </p>
                </div>
              </div>
              <div
                className="grid-item"
                onClick={(e) => {
                  this.setState({ ticketAppShow: 1 });
                  console.log(e.target.value);
                  this.setState({
                    option: "Software",
                  });
                  this.setState({ category: "Software" });
                  this.props.showModal();
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: "30px",
                  }}
                >
                  <div className="">Software</div>
                </div>

                <div>
                  <img
                    srcSet="http://localhost/ticketAppApi/images/software.jpg"
                    className="reservationImg"
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "15px", textAlign: "center" }}>
                    Software
                  </p>
                </div>
              </div>

              <div
                className="grid-item"
                onClick={(e) => {
                  this.setState({ ticketAppShow: 1 });
                  console.log(e.target.value);
                  this.setState({ option: "D2L Issues" });
                  this.setState({ category: "Software" });
                  this.props.showModal();
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: "30px",
                  }}
                >
                  <div className="">D2L issues</div>
                </div>

                <div>
                  <img
                    srcSet="http://localhost/ticketAppApi/images/d2l.jpg"
                    className="reservationImg"
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "15px", textAlign: "center" }}>
                    D2L issues
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default IT;
