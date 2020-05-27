import React from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import CommentForm from "../Comment/CommentForm";
import EditPost from "../Post/EditPost/EditPost";
import "./Post.scss";
import Comments from "../Comments/Comments";
import Comment from "../Comment/Comment";
import CommentsMock from "../Comments/COMMENTS_MOCK.json";
import Axios from "axios";
class Post extends React.Component {
  initialCommentsLimit = 3;
  state = {
    edit: false,
    showComments: false,
    seeMoreReview: false,
    reviewPreviewLength: 150,
    commentsPerPage: 5,
    commentsLimit: 3,
    comments: [],
    renderedComments: [],
  };

  constructor(props) {
    super(props);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    this.getMoreComments = this.getMoreComments.bind(this);
    this.toggleMoreReview = this.toggleMoreReview.bind(this);
    this.state.commentsLimit = this.initialCommentsLimit;
  }
  getMoreComments() {
    /* 
    get more comments, starting at the last comment_id.
    this function currently assumes that all comments were fetched
    when the user toggled comments on.
    */
    console.log("getMoreComments");
    this.setState(
      {
        ...this.state,
        commentsLimit: this.state.commentsLimit + this.state.commentsPerPage,
      },
      () => {
        this.renderComments();
      }
    );
  }
  getComments() {
    return Axios.get(`/api/comments/post/${this.props.post_id}`)
      .then((response) => {
        console.log("getComments", this.props.post_id, response.data);
        this.setState({ ...this.state, comments: response.data || [] });
        return Promise.resolve(response.data);
      })
      .catch((e) => {
        console.error(e);
        return Promise.reject(e);
      });
  }
  componentDidMount() {
    console.log("componentDidMount");
    this.getComments();
  }
  toggleComments() {
    if (this.state.showComments === false && this.state.comments.length > 0) {
      // get the latest comments
      this.getComments().then((response) => {
        this.setState(
          {
            ...this.state,
            renderedComments: this.renderComments(),
          },
          () => {
            this.setState({ ...this.state, showComments: true });
          }
        );
      });
    } else {
      this.setState({
        ...this.state,
        showComments: false,
        renderedComments: [],
      });
    }
  }
  enterEditMode() {
    this.setState({ ...this.state, edit: !this.state.edit });
  }
  doneEditing({ title, image, review }) {
    this.props.updatePost(this.props.post_id, title, image, review);
    this.setState({ ...this.state, edit: false });
  }
  renderComments(arr) {
    let renderedComments = [];
    for (
      let commentIndex = 0;
      commentIndex <
      (this.state.commentsLimit < this.state.comments.length
        ? this.state.commentsLimit
        : this.state.comments.length);
      commentIndex++
    ) {
      let comment = this.state.comments[commentIndex];
      console.log("renderedComments", comment);
      renderedComments.push(
        <Comment
          comment_id={comment.comment_id}
          text={comment.text}
          username={comment.username}
          toggleComments={this.toggleComments}
        />
      );
      this.setState({ ...this.state, renderedComments });
    }
    return renderedComments;
  }
  toggleMoreReview() {
    this.setState({
      ...this.state,
      seeMoreReview: !this.state.seeMoreReview,
      commentsLimit: this.initialCommentsLimit,
    });
  }
  render() {
    return (
      <div
        className="Post-container"
        data-see-more-review={this.state.seeMoreReview}>
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
              {this.props.review.length > this.state.reviewPreviewLength ? (
                <>
                  {this.state.seeMoreReview ? (
                    this.props.review
                  ) : (
                    <>
                      {this.props.review.substring(
                        0,
                        this.state.reviewPreviewLength
                      )}
                      <div className="see-more" onClick={this.toggleMoreReview}>
                        ... See More
                      </div>
                    </>
                  )}
                </>
              ) : (
                this.props.review
              )}
            </span>
            {this.state.seeMoreReview ? (
              <span className="hide-review" onClick={this.toggleMoreReview}>
                Hide Review
              </span>
            ) : null}

            <div className="actions">
              {this.props.user.user_id === this.props.user_id ? (
                <span className="edit-delete">
                  <button className="edit" onClick={this.enterEditMode}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => this.props.deletePost(this.props.post_id)}>
                    Delete
                  </button>
                </span>
              ) : null}
              <span className="like-share-comments">
                <button
                  type="button"
                  className="comment"
                  onClick={this.toggleComments}>
                  {(this.state.comments || []).length} Comments
                </button>
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
          <CommentForm
            showComments={this.toggleComments}
            user_id={this.props.user.user_id}
            post_id={this.props.post_id}
            edit={this.state.edit}
          />
        ) : null}
        {this.state.showComments ? (
          <div className="Comments-container">
            {this.state.renderedComments}
            <button onClick={this.getMoreComments}>load more comments</button>
            <button onClick={this.toggleComments}>Hide Comments</button>
          </div>
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
  post_id: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
};
function mapStateToProps(state) {
  const { user } = state;
  return { user };
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
