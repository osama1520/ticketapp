import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Nav from "./Nav";
import { Link, Navigate } from "react-router-dom";
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      password: undefined,
      email: undefined,
      phone: undefined,
      selectedImg: undefined,
    };
    // bind function to use "this" event in the methods
    this.addUser = this.addUser.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  componentDidMount() {
    // setting user data in the local storage in the browser memory
    this.props.getUserData();
    let x = JSON.parse(localStorage.getItem("myData"));
    console.log(x);
    this.setState({ info: x });


    // an event to hide the modal gallery "pop up"
    let modal = document.querySelector(".modalGallery");
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
//start of set methods  to set the state with value
  onChangeFirstName(e) {
    this.setState({ firstname: e.target.value });
  }
  onChangeLastName(e) {
    this.setState({ lastname: e.target.value });
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  onChangeMobile(e) {
    this.setState({ phone: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
//end of set methods  to set the state with value
  addUser() {
    // start of add user method
    let firstname = this.state.firstname;
    let lastname = this.state.lastname;
    let username = this.state.username;
    let password = this.state.password;
    let phone = this.state.phone;
    let email = this.state.email;
    let occupation = this.state.occupation;
    let selectedImg = this.state.selectedImg;
    let filex = document.querySelector("#imgupload").files[0];
    // start of validation process
    if (occupation === undefined || occupation === "Select Occupation") {
      this.setState({ vali0: "Please provide occupation." });
      this.setState({ vali1: "" });
      this.setState({ vali4: "" });
      this.setState({ vali3: "" });
      this.setState({ vali2: "" });
      this.setState({ vali5: "" });
      this.setState({ vali6: "" });
      return;
    }
    if (firstname === undefined) {
      this.setState({ vali1: "Please provide firstname." });
      this.setState({ vali0: "" });
      this.setState({ vali4: "" });
      this.setState({ vali3: "" });
      this.setState({ vali2: "" });
      this.setState({ vali5: "" });
      this.setState({ vali6: "" });
      return;
    }
    if (lastname === undefined) {
      this.setState({ vali2: "Please provide lastname." });
      this.setState({ vali4: "" });
      this.setState({ vali3: "" });
      this.setState({ vali5: "" });
      this.setState({ vali1: "" });
      this.setState({ vali6: "" });
      this.setState({ vali0: "" });
      return;
    }
    if (username === undefined) {
      this.setState({ val3: "Please provide username." });
      this.setState({ vali0: "" });
      this.setState({ vali4: "" });
      this.setState({ vali5: "" });
      this.setState({ vali2: "" });
      this.setState({ vali1: "" });
      this.setState({ vali6: "" });

      return;
    }
    if (password === undefined) {
      this.setState({ vali4: "Please provide passwoord." });
      this.setState({ vali5: "" });
      this.setState({ vali3: "" });
      this.setState({ vali0: "" });
      this.setState({ vali2: "" });
      this.setState({ vali1: "" });
      this.setState({ vali6: "" });
      return;
    }
    if (phone === undefined) {
      this.setState({ vali5: "Please provide phone." });
      this.setState({ vali4: "" });
      this.setState({ vali3: "" });
      this.setState({ vali2: "" });
      this.setState({ vali1: "" });
      this.setState({ vali0: "" });
      this.setState({ vali6: "" });
      return;
    }
    if (email === undefined) {
      this.setState({ vali6: "Please provide email." });
      this.setState({ vali4: "" });
      this.setState({ vali3: "" });
      this.setState({ vali2: "" });
      this.setState({ vali1: "" });
      this.setState({ vali0: "" });
      this.setState({ vali5: "" });

      return;
    }
    if (selectedImg === undefined && filex === undefined) {
      console.log(12);
      this.setState({ vali7: "Please provide profile image." });
      this.setState({ vali5: "" });
      this.setState({ vali3: "" });
      this.setState({ vali2: "" });
      this.setState({ vali1: "" });
      this.setState({ vali0: "" });
      this.setState({ vali4: "" });
      return;
    }
   // end of validation process
    let form = new FormData();
    // insertting a user without formData
    if (filex === undefined) {
      console.log(selectedImg);
      let obj = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        phone: phone,
        email: email,
        occupation: occupation,
        selectedImg: selectedImg,
        pass: "insertSelected",
      };
      axios
        .post("Login.php", obj)
        .then((res) => {
          console.log(res);
          this.setState({ vali7: "" });
          this.setState({ vali6: "" });
          this.setState({ vali5: "" });
          this.setState({ vali3: "" });
          this.setState({ vali2: "" });
          this.setState({ vali1: "" });
          this.setState({ vali4: "" });
          this.setState({ vali0: "" });
          this.setState({ re: 1 });
          alert("You have succesfully added a user");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // insert form with form data
      console.log(filex);
      form.append("fileg", filex);
      axios
        .post(
          "Login.php?firstname=" +
            firstname +
            "&lastname=" +
            lastname +
            "&username=" +
            username +
            "&password=" +
            password +
            "&phone=" +
            phone +
            "&email=" +
            email +
            "&occupation=" +
            occupation +
            "&pass=insertSelectedForm",
          form
        )
        .then((res) => {
          console.log(res);
          this.setState({ vali0: "" });
          this.setState({ vali7: "" });
          this.setState({ vali6: "" });
          this.setState({ vali5: "" });
          this.setState({ vali3: "" });
          this.setState({ vali2: "" });
          this.setState({ vali1: "" });
          this.setState({ vali4: "" });
          this.setState({ re: 1 });
          alert("You have succesfully added a user");
          // reserting states and declaring an alert message
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log(filex);

    console.log(selectedImg);

    console.log(firstname, lastname, username, password, phone, email);
  }

  render() {
    //render method
    if (this.state.re === 1) {
      // sending user back to portanl message after inserting a user
      return <Navigate to={"/Portal"} />;
    }
    if (this.props.logoutAdminPortal === 1) {
      // sending user back if clicked on log out button from the nav bar.
      return <Navigate to={"/"} />;
    }
    return (
      // return function with html and css element 
      <>
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
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                      borderRadius: "50%",
                      border: "2px solid #333",
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
                        srcSet={"http://localhost/ticketAppAPI/images/add.png"}
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
        {this.props.info && (
          <Nav
            logout={this.props.logout}
            user={this.props.info}
            data={this.props.getUserData}
            date={this.props.date}
          />
        )}
        <Link to={"../Portal"} className="inline-itemStatusBack">
          <img
            src="http://localhost/ticketAppApi/images/back.jpg"
            width={18}
            height={18}
            style={{ position: "relative", top: "4px", left: "3px" }}
          />
        </Link>
        <div style={{ marginTop: "0px" }} className="wrapper">
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
            </div>
          </div>
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
                fontWeight: "bold",
              }}
            >
              Add User{" "}
            </div>
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                borderRadius: "50%",
                border: "4px solid #333",
              }}
              src={"http://localhost/ticketAppAPI/images/admin.png"}
              width={150}
              height={150}
              onClick={() => {
                let modal = document.querySelector(".modalGallery");
                modal.style.display = "block";
              }}
            />

          

            <div className="form">
              <select
                className="text"
                style={{
                  color: "#004db0",
                }}
                onChange={(e) => {
                  this.setState({ occupation: e.target.value });
                  console.log(this.state.occupation);
                }}
              >
                <option>Select Occupation</option>
                <option>User</option>
                <option>Admin</option>
              </select>
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {this.state.vali0}
              </div>
              <input
                type="text"
                placeholder="Firstname"
                className="text"
                id="Firstname"
                required
                onChange={this.onChangeFirstName}
                value={this.state.firstname}
              />
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {this.state.vali1}
              </div>
              <input
                type="text"
                placeholder="Lastname"
                className="text"
                id="Lastname"
                required
                onChange={this.onChangeLastName}
                value={this.state.lastname}
              />
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {this.state.vali2}
              </div>
              <input
                type="text"
                placeholder="Username"
                className="text"
                id="username"
                autoComplete="off"
                onChange={this.onChangeUsername}
                value={this.state.username}
              />
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {this.state.vali3}
              </div>
              <input
                type="password"
                autoComplete="off"
                placeholder="Password"
                className="text"
                id="Password"
                onChange={this.onChangePassword}
                value={this.state.password}
              />
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {this.state.vali4}
              </div>
              <input
                type="number"
                placeholder="Mobile Number"
                className="text"
                id="Mobile"
                required
                onChange={this.onChangeMobile}
                value={this.state.phone}
              />
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {this.state.vali5}
              </div>

              <input
                type="email"
                placeholder="Email"
                className="text"
                id="Email"
                required
                onChange={this.onChangeEmail}
                value={this.state.email}
              />
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {this.state.vali6}
              </div>
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {this.state.vali7}
              </div>
              <input
                type="submit"
                className="LoginButton"
                value={"Add User"}
                onClick={this.addUser}
              />
            </div>
          </section>
          <footer></footer>
        </div>
      </>
    );
  }
}

export default Add;
