import React, { Component } from "react";
import "./Profile.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import { logoutUser } from "../../redux/reducer";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      editView: false,
    };
  }

  componentDidMount() {
    if (!this.props.user.email) {
      this.props.history.push("/profile");
    }
  }

  handleEditView = () => {
    this.setState({ editView: !this.state.editView });
  };

  handleInput = (val) => {
    this.setState({ email: val });
  };

  handleLogout = () => {
    axios
      .post("/api/auth/logout")
      .then(() => {
        this.props.logoutUser();
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  updateUseremail = () => {
    const { email } = this.state;
    axios
      .put(`/api/auth/user/${this.props.user.user_id}`, { email }, {withCredentials:true})
      .then((res) => {
        this.props.getUser(res.data[0]);
        this.handleEditView();
        this.setState({ email: "" });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="profile-container">
        <span className="profile-text">
          <h1>My Profile</h1>
          <h2>{this.props.user.name}</h2>
          {!this.state.editView ? (
            <h2>
              <img
                className="profile-picture"
                src={this.props.user.image}
                alt={this.props.user.name}
              />
              <button className="edit-button" onClick={this.handleEditView}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <title>ic_photo_camera_24px</title>
                  <g fill="#ffffff">
                    <circle cx="12" cy="12" r="3.2"></circle>
                    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
                  </g>
                </svg>
              </button>
            </h2>
          ) : (
            <div>
              <input
                value={this.state.image}
                placeholder="New Image"
                onChange={(e) => this.handleInput(e.target.value)}
              />
            </div>
          )}
          {!this.state.editView ? (
            <h2>
              {/* {this.props.user.email}{" "} */}
              <button className="edit-button" onClick={this.handleEditView}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <title>ic_markunread_24px</title>
                  <g fill="#ffffff">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                  </g>
                </svg>
              </button>
            </h2>
          ) : (
            <div>
              <input
                value={this.state.email}
                placeholder="New Email"
                onChange={(e) => this.handleInput(e.target.value)}/>
              <button className="submit-button" onClick={this.updateUseremail}>
                Submit
              </button>
            </div>
          )}
          <button className="logout-button" onClick={this.handleLogout}>
            Log Out
          </button>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(
  connect(mapStateToProps, { getUser, logoutUser })(Profile)
);
