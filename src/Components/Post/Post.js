import React from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import CommentForm from "../Comment/CommentForm";
import EditPost from "../Post/EditPost/EditPost";
import "./Post.scss";
class Post extends React.Component {
  state = {
    edit: false,
  };
  constructor(props) {
    super(props);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
  }
  enterEditMode() {
    this.setState({ ...this.state, edit: !this.state.edit });
  }
  doneEditing({ title, image, review }) {
    this.props.updatePost(this.props.post_id, title, image, review);
    this.setState({ ...this.state, edit: false });
  }
  render() {
    return (
      <div className="Post-container">
        {this.state.edit ? (
          <EditPost
            // post_id={this.props.post_id}
            image={this.props.image}
            title={this.props.title}
            review={this.props.review}
            doneEditing={this.doneEditing}
          />
        ) : (
          <>
            <img src={this.props.image} alt="a post image" />
            <span className="title">{this.props.title}</span>
            <span className="review">
              {this.props.review}
              {this.props.review.length > 125 ? (
                <div className="see-more">... See More</div>
              ) : null}
            </span>

            <div className="actions">
              {this.props.user.email && this.props.user.user_id ? (
                <span className="edit-delete">
                  <button className="edit" onClick={this.enterEditMode}>
                    Edit
                  </button>
                  <button className="delete">Delete</button>
                </span>
              ) : null}
              <span className="like-share">
                <button type="button" className="like">
                  {`Like ${this.props.likes || 0}`}
                </button>
                <button type="button" className="share">
                  Share
                </button>
              </span>
            </div>
          </>
        )}
        {this.props.user.user_id && this.props.user.email ? (
          <CommentForm />
        ) : null}
      </div>
    );
  }
}
// Expected prop types
// help catch bugs by
// throwing errors
Post.propTypes = {
  image: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  const { user } = state;
  return { user };
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
