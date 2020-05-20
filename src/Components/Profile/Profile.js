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
        axios.post('/api/auth/logout')
        .then(() => {
            this.props.logoutUser();
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    updateUseremail = () => {
        const {email} = this.state;
        axios.put(`/api/auth/user/${this.props.user.user_id}`, {email})
        .then(res => {
            this.props.getUser(res.data[0]);
            this.handleEditView();
            this.setState({email: ''});
        })
        .catch(err => console.log(err));
    }

  render() {
    return (
      <div className="profile-container">
        <span className="profile-text">
          <h1>My Profile</h1>
          <button className="logout-button" onClick={this.handleLogout}>
            Log Out
          </button>
          <h1>Account Details</h1>
          {!this.state.editView ? (
            <h2>
                 <img
            className="profile-picture"
            src={this.props.user.image}
            alt={this.props.user.name}
          />{" "}
              <button className="edit-button" onClick={this.handleEditView}>
                Edit Image
              </button>
            </h2>
          ) : (
            <div>
              <input
                value={this.state.email}
                placeholder="New Image"
                onChange={(e) => this.handleInput(e.target.value)}
              />
            </div>
          )}
          
          {/* <img
            className="profile-picture"
            src={this.props.user.image}
            alt={this.props.user.name}
          /> */}
          <h2>{this.props.user.name}</h2>
          {!this.state.editView ? (
            <h2>
              {this.props.user.email}{" "}
              <button className="edit-button" onClick={this.handleEditView}>
                Edit Email
              </button>
            </h2>
          ) : (
            <div>
              <input
                value={this.state.email}
                placeholder="New Email"
                onChange={(e) => this.handleInput(e.target.value)}
              />
            </div>
          )}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(
  connect(mapStateToProps, { getUser, logoutUser })(Profile)
);
