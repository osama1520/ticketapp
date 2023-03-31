import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Nav from "./Nav";
import { Link, Navigate } from "react-router-dom";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      firstname: "",
      lastname: "",
      phone: "",
    };
    // setting the bind function for the method to use "this" event
    this.updateProfile = this.updateProfile.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  componentDidMount() {
    // returning user data from local storage in thhe browser history
    this.props.getUserData();
    let x = JSON.parse(localStorage.getItem("myData"));
    console.log(x);
    this.setState({ info: x });
    this.setState({
      firstname: x.firstName,
      lastname: x.lastName,
      phone: x.phone,
      email: x.email,
      selectedImg:x.profileImage
    });
// a modal gallery event to click of too hide
    let modal = document.querySelector(".modalGallery");
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
//  start of setting state to return value from the input
  onChangeFirstName(e) {
    this.setState({ firstname: e.target.value });
  }
  onChangeLastName(e) {
    this.setState({ lastname: e.target.value });
  }
  onChangeMobile(e) {
    this.setState({ phone: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  //  end of setting state to return value from the input
  updateProfile() {
    // update method to update user data including validation and axios call to the PHP API.
    let firstname = this.state.firstname;
    let lastname = this.state.lastname;
    let phone = this.state.phone;
    let email = this.state.email;
    let selectedImg = this.state.selectedImg
    // let files = document.getElementById("imgupload").files
    let filex = document.querySelector("#imgupload").files;
    let form = new FormData();
    form.append("filep", filex[0]);
    let obj = {
      userid: this.state.info.id,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      pass: "UpdateProfile",
    };
    console.log(
      firstname,
      lastname,
      phone,
      email,
      filex,
      selectedImg
    );
    if(selectedImg !== undefined){
      document.querySelector("#imgupload").value  =""

    }
    console.log(document.querySelector("#imgupload").files)
    if (
      firstname === undefined &&
      lastname === undefined &&
      phone === undefined &&
      email === undefined &&
      filex.length === 0 &&
      selectedImg === undefined
    ) {
      console.log(selectedImg)
      return;
    }
    console.log(selectedImg)
    axios
      .post(
        "Login.php?userid=" +
          obj.userid +
          "&email=" +
          email +
          "&firstname=" +
          obj.firstname +
          "&lastname=" +
          obj.lastname +
          "&phone=" +
          obj.phone +
          "&selected=" +
          selectedImg +
          "&pass=" +
          obj.pass,
        form
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("myData", JSON.stringify(res.data.feedData[0]));
        this.setState({ img: res.data.feedData[0].profileImage });
        this.props.getUserData();

        this.setState({ val: "You successfully updated profile" });
        setTimeout(() => {
          this.setState({ val: "" });
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // render methhod to that include a condition when userr logout and returning htmt, css, and props variables
    if (this.props.logoutAdminPortal === 1) {
      return <Navigate to={"/"} />;
    }
    // console.log(this.state.firstName);
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
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
            </div>
          </div>
          <div id="gallery" className="modalGallery">
            <div className="modal-content" style={{ width: "59%" }}>
              <section
                className="login"
                id="login"
                style={{ backgroundColor: "#fff",position:"relative" }}
              >
                  <div style={{
                    color:"gray",
                    display:"block",
                    position:"absolute",
                    left:"10px",
                    bottom:"10px",
                    fontSize:"14px"
                  }}>

                
                      * Image will be updated when you click on update button.
                  </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "#333",
                    marginBottom: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Choose a Profile Image
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      display: "inline",
                      textAlign: "center",
                      color: "#333",
                      marginBottom: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <img
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                        borderRadius: "50%",
                        border: "2px solid #333",
                      }}
                      src={"http://localhost/ticketAppAPI/images/admin.png"}
                      width={120}
                      height={120}
                      onClick={(e) => {
                        this.setState({ selectedImg: e.target.src });
                        e.target.style.border = "2px solid blue";
                        this.setState({ admin: e.target.src });
                        this.setState({ admin1: e.target });
                        this.state.user1.style.border = "2px solid #333";
                        this.state.manager1.style.border = "2px solid #333";
                        this.state.add1.style.border = "2px solid #333";
                        document.querySelector("#imgupload").value = "";
                      }}
                    />
                    User 1
                  </div>
                  <div
                    style={{
                      padding: "10px",
                      display: "inline",
                      textAlign: "center",
                      color: "#333",
                      marginBottom: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <img
                      style={{
                        border: "2px solid #333",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                        borderRadius: "50%",
                      }}
                      src={"http://localhost/ticketAppAPI/images/manager.png"}
                      width={120}
                      height={120}
                      onClick={(e) => {
                        this.setState({ selectedImg: e.target.src });
                        e.target.style.border = "2px solid blue";
                        this.setState({ manager: e.target.src });
                        this.setState({ manager1: e.target });
                        this.state.user1.style.border = "2px solid #333";
                        this.state.admin1.style.border = "2px solid #333";
                        this.state.add1.style.border = "2px solid #333";
                        document.querySelector("#imgupload").value = "";
                      }}
                    />
                    User 2
                  </div>
                  <div
                    style={{
                      padding: "10px",
                      display: "inline",
                      textAlign: "center",
                      color: "#333",
                      marginBottom: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <img
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                        borderRadius: "50%",
                        border: "2px solid #333",
                      }}
                      src={"http://localhost/ticketAppAPI/images/user.png"}
                      width={120}
                      height={120}
                      onClick={(e) => {
                        this.setState({ selectedImg: e.target.src });
                        e.target.style.border = "2px solid blue";
                        this.setState({ user: e.target.src });
                        this.setState({ user1: e.target });
                        this.state.manager1.style.border = "2px solid #333";
                        this.state.admin1.style.border = "2px solid #333";
                        this.state.add1.style.border = "2px solid #333";
                        document.querySelector("#imgupload").value = "";
                      }}
                    />
                    User 3
                  </div>
                  <div
                    style={{
                      padding: "10px",
                      display: "inline",
                      textAlign: "center",
                      color: "#333",
                      marginBottom: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <div
                      style={{
                        padding: "0px",
                        display: "inline",
                        textAlign: "center",
                        color: "#333",
                        marginBottom: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      <label htmlFor="imgupload">
                        <img
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block",
                            borderRadius: "50%",
                            border: "2px solid #333",
                          }}
                          srcSet={
                            "http://localhost/ticketAppAPI/images/add.png"
                          }
                          width={120}
                          height={120}
                          onClick={(e) => {
                            this.setState({ selectedImg: e.target.src });
                            this.setState({ add: e.target.src });
                            this.setState({ add1: e.target });

                            e.target.style.border = "2px solid blue";
                            this.state.manager1.style.border = "2px solid #333";
                            this.state.admin1.style.border = "2px solid #333";
                            this.state.user1.style.border = "2px solid #333";
                            // this.setState({manager:""})
                            // this.setState({manager1:""})
                            // this.setState({admin1:""})
                            // this.setState({admin:""})
                          }}
                        />
                      </label>
                      Add Image
                      <input
                        type="file"
                        id="imgupload"
                        name="file"
                        style={{ display: "none" }}
                      />
               
                    </div>
                  
                  </div>
                

                </div>
              </section>
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
          <section
            className="login"
            id="login"
            style={{ width: "30%", marginTop: "100px" }}
          >
            <div
              className="head"
              style={{
                color: "#333",
                marginBottom: "10px",
                fontWeight: "Bold",
              }}
            >
              Profile{" "}
            </div>

            {this.state.img ? (
              <img
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  borderRadius: "50%",
                  border: "2px solid #333",
                }}
                srcSet={this.state.img}
                width={150}
                height={150}
                onClick={() => {
                  let modal = document.querySelector(".modalGallery");
                  modal.style.display = "block";
                }}
              />
            ) : (
              <img
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  borderRadius: "50%",
                  border: "2px solid #333",
                }}
                srcSet={this.state.info.profileImage}
                width={150}
                height={150}
                onClick={() => {
                  let modal = document.querySelector(".modalGallery");
                  modal.style.display = "block";
                }}
              />
            )}

            <div className="form">
              <input
                type="text"
                placeholder="Firstname"
                className="text"
                id="username"
                required
                onChange={this.onChangeFirstName}
                value={this.state.firstname}
              />
              <input
                type="text"
                placeholder="Lastname"
                className="text"
                id="username"
                required
                onChange={this.onChangeLastName}
                value={this.state.lastname}
              />
              <input
                type="text"
                placeholder="Username"
                className="text"
                id="username"
                disabled
                value={this.state.info.username}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                className="text"
                id="username"
                required
                onChange={this.onChangeMobile}
                value={this.state.phone}
              />
              <input
                type="email"
                placeholder="Email"
                className="text"
                id="username"
                required
                onChange={this.onChangeEmail}
                value={this.state.email}
              />

              <input
                type="submit"
                className="LoginButton"
                value={"Update"}
                onClick={this.updateProfile}
              />
              <div
                style={{
                  color: "green",
                  marginTop: "15px",
                  textAlign: "center",
                }}
              >
                {this.state.val}
              </div>
            </div>
          </section>
          <footer></footer>
        </div>
      </>
    );
  }
}

export default Profile;
