import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { getPosts } from "../../../redux/reducer";
import "./CreatePost.scss";
class CreatePost extends React.Component {
  state = {
    title: "",
    image: "",
    review: "",
  };
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  getPosts() {
    axios
      .get("/api/posts")
      .then((res) => {
        // Get posts
        //  console.log(res.data);
        this.props.getPosts(res.data);
        console.log(this.props.posts);
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, image, review } = this.state,
      { user_id } = this.props.user;
    // console.log(this.props.user)
    // {user_id} = this.props.user;
    if (title && image && review) {
      axios
        .post("/api/post", { user_id, title, image, review })
        .then((res) => {
          // Get posts
          this.getPosts();
          this.props.hideReviewForm();
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("Please enter all the fields!");
    }

    // console.log(this.props.posts);
  }
  render() {
    // console.log(this.props.user);
    return (
      <div className="CreatePost-container">
        <h4>Create a review</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={(e) => this.handleInput(e)}
            name="title"
            placeholder="Name of the product"
          />
          <input
            onChange={(e) => this.handleInput(e)}
            name="image"
            placeholder="Image Link"
          />
          <textarea
            onChange={(e) => this.handleInput(e)}
            name="review"
            placeholder="Review"
          />
          <div>
            <button onClick={(e) => this.handleSubmit(e)} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getPosts })(CreatePost);
// export default withRouter(
//   connect(mapStateToProps, { getPosts })(CreatePost)
// );
