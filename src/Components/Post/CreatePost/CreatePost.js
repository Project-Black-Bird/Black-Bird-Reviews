import React from "react";
import axios from 'axios';
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
  handleSubmit(e) {
    e.preventDefault();
    const {title, image, review} = this.state,
          {user_id} = this.props.user;
    axios.post('/api/post', {user_id, title, image, review})
         .then(()=>{
           // Get posts
           
         })
  }
  render() {
    return (
      <div className="CreatePost-container">
        <h4>Create a review</h4>
        <form onSubmit={this.handleSubmit}>
          <input onChange={(e) => this.handleInput(e)} name="title" placeholder="Name of the product" />
          <input onChange={(e) => this.handleInput(e)} name="image" placeholder="Image Link" />
          <textarea onChange={(e) => this.handleInput(e)} name="review" placeholder="Review" />
          <button onClick={(e)=>this.handleSubmit(e)} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(
  connect(mapStateToProps, { getPosts })(CreatePost)
);