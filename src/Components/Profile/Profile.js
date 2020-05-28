import React, { Component } from "react";
import "./Profile.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import { logoutUser } from "../../redux/reducer";
// import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.name,
      email: this.props.user.email,
      image: this.props.user.image,
      editView: false,
    };
  }

//   componentDidMount() {
//     if (!this.props.user.email) {
//       this.props.history.push("/profile");
//     }
//   }

  handleEditView = () => {
    this.setState({ editView: !this.state.editView });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

  updateUser = () => {
    const { image, email } = this.state;
    console.log(email);
    axios
      .put(`/api/auth/user/${this.props.user.user_id}`, { email, image })
      .then((res) => {
        this.props.getUser(res.data || {});
        this.handleEditView();
        this.setState({ email: email, image: image });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="profile-container">
        <span className="profile-text">
          {/* <h1>My Profile</h1> */}
          {this.state.editView ? (
            <div className="edit-fields-container">
              <input className="image-field"
                value={this.state.image}
                name="image"
                onChange={(e) => this.handleInput(e)}
              />
              <input className="email-field"
                value={this.state.email}
                name="email"
                onChange={(e) => this.handleInput(e)}
              />
              <button className="submit-button" onClick={this.updateUser}>
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <span className="profile-picture-container">
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
                    <title>pencil</title>
                    <g fill="#ffffff">
                      <path
                        fill="#ffffff"
                        d="M22.3,3.9l-2.2-2.2c-1.1-1.1-3.1-1.1-4.2,0L2.3,15.3c-0.1,0.1-0.1,0.2-0.2,0.3c0,0,0,0.1,0,0.1 c0,0,0,0.1,0,0.1l-1,6c-0.1,0.3,0.1,0.6,0.3,0.9C1.5,22.9,1.7,23,2,23c0.1,0,0.1,0,0.2,0l6-1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0 c0.1,0,0.2-0.1,0.3-0.2L22.3,8.1C23.5,7,23.5,5,22.3,3.9z M17,10.6L13.4,7l2.3-2.3l3.6,3.6L17,10.6z"
                      ></path>
                    </g>
                  </svg>
                </button>
              </span>

              <div>
                <button className="logout-button" onClick={this.handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </span>
        <span className="user-name">
          <h2>{this.props.user.name}</h2>
        </span>
        <div className="liked-posts-container">
    <h2>Liked Posts:</h2>
</div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

// export default withRouter(
//   connect(mapStateToProps, { getUser, logoutUser })(Profile)
// );

export default (
    connect(mapStateToProps, { getUser, logoutUser })(Profile)
  );
