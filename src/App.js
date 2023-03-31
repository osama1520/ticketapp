import "./App.css";
import React, { Component } from "react";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/Login";
import Portal from "./component/Portal";
import Tickets from "./component/Tickets";
import Add from "./component/Add";
import Edit from "./component/Edit";
import Status from "./component/Status";
import IT from "./component/IT";
import Profile from "./component/Profile";
import Settings from "./component/Settings";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.con = [];
    // setting bind function to the methods to use "this" event
    this.logout = this.logout.bind(this);
    this.adminPortal = this.adminPortal.bind(this);
    this.adminPasswordM = this.adminPasswordM.bind(this);
    this.adminUsernameM = this.adminUsernameM.bind(this);
    this.showModal = this.showModal.bind(this);
    this.getTickets = this.getTickets.bind(this);
    this.getUserData = this.getUserData.bind(this);
    // state declaretion
    this.state = {
      date: new Date(),
      adminUsername: "",
      adminPassword: "",
      renderAdminPortal: 0,
      logoutAdminPortal: 0,
      occupation: "",
      adminInfo: {},
      status: "",
      userData: "",
      tickets: [],
      error: "",
    };
  }
  componentDidMount() {
    // setting innterval to update the time and date
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
     // clear the old  innterval to update the time and date
    clearInterval(this.intervalID);
  }
  // set value to state
  adminPasswordM(e) {
    this.setState({ adminPassword: e.target.value });
  }
  adminUsernameM(e) {
    this.setState({ adminUsername: e.target.value });
  }
    // end set value to state
  adminPortal = (e) => {
    // login into portal for both user and admin its called adminPortal but works for both user and admin but in the admin only will be able to add user 
    let adminName =
      this.state.adminUsername === null
        ? JSON.parse(localStorage.getItem("myData")).username
        : this.state.adminUsername;
    let adminPassword =
      this.state.adminPassword === null
        ? JSON.parse(localStorage.getItem("myData")).password
        : this.state.adminPassword;
    let obj = {
      adminName: adminName,
      adminPassword: adminPassword,
      pass: "loginToAdminPortal",
    };
    axios
      .post("Login.php", obj)
      .then((res) => {
        console.log(res);
        if (res.data == false) {
          console.log("err");
          console.log(res.data);
          this.setState({ error: "Username or password is incorrect." });
        } else {
          console.log(res.data);
          this.setState({ userData: res.data });
          localStorage.setItem("myData", JSON.stringify(res.data));
          this.setState({ renderAdminPortal: 1 });
          this.setState({ logoutAdminPortal: 0 });
          this.setState({ occupation: res.data.occupation });
          this.getTickets(res.data.id);
          this.getUserData();
          this.setState({ error: "" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  logout = () => {
    // logout method clears local storage and states
    localStorage.clear();
    this.newVal(1);
    // this.setState({status:1})
    this.setState({ logoutAdminPortal: 1 });
    this.setState({ renderAdminPortal: 0 });
    this.setState({ adminUsername: null });
    this.setState({ adminPassword: null });
    return <Navigate to={`/`} />;
  };
  newVal = (val) => {
    // update the status value in the whole app
    this.setState({ status: val });
    // console.log(this.state.status)
  };
  showModal(e) {
    // modal mmethod to shoow it or hide it
    var modal = document.getElementById("myModal");

  

    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function () {
    //   modal.style.display = "none";
    // };

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
  getTickets = (id, e) => {
    // get the tickets data from the database
    var value = "";
    if (e && e.target) {
      console.log(e.target.value);
      value = e.target.value;
    }

    const obj = {
      id: id,
      sort: value,
      pass: "checkTicket",
    };
    axios
      .post("Login.php", obj)
      .then((res) => {
        console.log(res);
        this.setState({ tickets: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(id);
  };
  getUserData() {
    // return user data from the local storage
    let x = JSON.parse(localStorage.getItem("myData"));
    this.setState({ info: x });

    // checking ticket status equal to 0 to redirect to preview
    axios
      .post("Login.php", { userid: x.id, pass: "checkTicket" })
      .then((res) => {
        // console.log(res.data)
        if (res.data !== null) {
          this.newVal(res.data.status);
        } else {
          this.newVal(null);
        }
      });
  }
  tick() {
    this.setState({
      date: new Date(),
    });
  }
  render() {
    // render method to create pages direactory and to pass methods through the app
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Login
                  adminUsername={this.state.adminUsername}
                  adminPassword={this.state.adminPassword}
                  adminUsernameM={this.adminUsernameM}
                  adminPasswordM={this.adminPasswordM}
                  adminPortal={this.adminPortal}
                  showModal={this.showModal}
                  renderAdminPortal={this.state.renderAdminPortal}
                  occupation={this.state.occupation}
                  error={this.state.error}
                />
              }
            />
            <Route
              exact
              path="/Portal"
              element={
                <Portal
                  adminUsername={this.state.adminUsername}
                  adminPassword={this.state.adminPassword}
                  adminUsernameM={this.adminUsernameM}
                  adminPasswordM={this.adminPasswordM}
                  adminPortal={this.adminPortal}
                  logout={this.logout}
                  showModal={this.showModal}
                  logoutAdminPortal={this.state.logoutAdminPortal}
                  status={this.state.status}
                  newVal={this.newVal}
                  date={this.state.date}
                  info={this.state.info}
                  getUserData={this.getUserData}
                />
              }
            />
            <Route
              exact
              path="/Tickets"
              element={
                <Tickets
                  showModal={this.showModal}
                  tickets={this.state.tickets}
                  getTickets={this.getTickets}
                  logout={this.logout}
                  newVal={this.newVal}
                  date={this.state.date}
                  info={this.state.info}
                  getUserData={this.getUserData}
                  logoutAdminPortal={this.state.logoutAdminPortal}
                />
              }
            />

            <Route
              exact
              path="/Edit"
              element={
                <Edit
                  showModal={this.showModal}
                  logout={this.logout}
                  status={this.state.status}
                  tickets={this.state.tickets}
                  getTickets={this.getTickets}
                  newVal={this.newVal}
                  date={this.state.date}
                  info={this.state.info}
                  getUserData={this.getUserData}
                  logoutAdminPortal={this.state.logoutAdminPortal}
                />
              }
            />
            <Route
              exact
              path="/Status"
              element={
                <Status
                  showModal={this.showModal}
                  logout={this.logout}
                  status={this.state.status}
                  tickets={this.state.tickets}
                  getTickets={this.getTickets}
                  newVal={this.newVal}
                  date={this.state.date}
                  info={this.state.info}
                  getUserData={this.getUserData}
                  logoutAdminPortal={this.state.logoutAdminPortal}
                />
              }
            />
   <Route
              exact
              path="/Add"
              element={
                <Add
                  showModal={this.showModal}
                  logout={this.logout}
                  status={this.state.status}
                  tickets={this.state.tickets}
                  getTickets={this.getTickets}
                  newVal={this.newVal}
                  date={this.state.date}
                  info={this.state.info}
                  getUserData={this.getUserData}
                  logoutAdminPortal={this.state.logoutAdminPortal}
                />
              }
            />
            <Route
              exact
              path="/IT"
              element={
                <IT
                  showModal={this.showModal}
                  logout={this.logout}
                  status={this.state.status}
                  tickets={this.state.tickets}
                  getTickets={this.getTickets}
                  adminUsername={this.state.adminUsername}
                  adminPassword={this.state.adminPassword}
                  adminUsernameM={this.adminUsernameM}
                  adminPasswordM={this.adminPasswordM}
                  adminPortal={this.adminPortal}
                  logoutAdminPortal={this.state.logoutAdminPortal}
                  newVal={this.newVal}
                  date={this.state.date}
                  info={this.state.info}
                  getUserData={this.getUserData}
                />
              }
            />
            <Route
              exact
              path="/Profile"
              element={
                <Profile
                  adminPortal={this.adminPortal}
                  getUserData={this.getUserData}
                  logout={this.logout}
                  info={this.state.info}
                  date={this.state.date}
                  logoutAdminPortal={this.state.logoutAdminPortal}
                />
              }
            />
            <Route
              exact
              path="/Settings"
              element={
                <Settings
                  adminPortal={this.adminPortal}
                  getUserData={this.getUserData}
                  logout={this.logout}
                  info={this.state.info}
                  logoutAdminPortal={this.state.logoutAdminPortal}
                  date={this.state.date}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
