import React from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import CommentForm from "../Comment/CommentForm";
import EditPost from "../Post/EditPost/EditPost";
import "./Post.scss";
import Comments from "../Comments/Comments";
import Comment from "../Comment/Comment";
import CommentsMock from "../Comments/COMMENTS_MOCK.json";
class Post extends React.Component {
  initialCommentsLimit = 3;
  state = {
    edit: false,
    showComments: false,
    seeMoreReview: false,
    reviewPreviewLength: 150,
    commentsPerPage: 5,
    commentsLimit: 0,
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
    // let lastRenderedElement = this.state.renderedComments[
    //   this.state.renderedComments.length - 1
    // ];
    // if (lastRenderedElement) {
    // }

    //  let startIndex = this.state.comments.findIndex((comment)=>{})
  }
  toggleComments() {
    if (this.state.showComments === false) {
      // get the latest comments
      this.setState({ ...this.state, comments: CommentsMock }, () => {
        this.setState({
          ...this.state,
          renderedComments: this.renderComments(),
          showComments: true,
        });
      });
    } else {
      this.setState({ ...this.state, showComments: !this.state.showComments });
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
      renderedComments.push(
        <Comment
          comment_id={comment.comment_id}
          text={comment.text}
          username={comment.username}
        />
      );
      this.setState({ ...this.state, renderedComments });
    }
    return renderedComments;
  }
  toggleMoreReview() {
    this.setState({ ...this.state, seeMoreReview: !this.state.seeMoreReview });
  }
  render() {
    return (
      <div
        className="Post-container"
        data-see-more-review={this.state.seeMoreReview}
      >
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
                  <button
                    className="action-buttons"
                    onClick={this.enterEditMode}
                  >
                    <svg
                      className="space"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 22 22"
                    >
                      <title>ic_edit_24px</title>
                      <g fill="#2a7180">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                      </g>
                    </svg>
                    Edit post
                  </button>
                  <>|</>
                  <button
                    className="action-buttons"
                    onClick={() => this.props.deletePost(this.props.post_id)}
                  >
                    <svg
                      className="space"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 40 40"
                    >
                      <title>ic_delete_forever_48px</title>
                      <g fill="#2a7180">
                        <path d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"></path>
                      </g>
                    </svg>
                    Delete post
                  </button>
                  <>|</>
                </span>
              ) : null}
              <span className="like-share-comments">
                <button
                  type="button"
                  className="action-buttons"
                  onClick={this.toggleComments}
                >
                  Comments {(this.props.comments || []).length}
                </button>
                <>|</>
                <button type="button" className="action-buttons">
                  <svg
                    className="space"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 22 22"
                  >
                    <title>like-2</title>
                    <g fill="#2a7180">
                      <path d="M5,22H3c-0.6,0-1-0.4-1-1v-9c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v9C6,21.6,5.6,22,5,22z"></path>{" "}
                      <path
                        fill="#2a7180"
                        d="M20,10h-5V7c0-1.7-1-4-2.5-4.9C11.8,1.8,11,2.2,11,3v4l-3,3.6V21l0.3,0.1C9.4,21.7,10.7,22,12,22h7 c1.1,0,2-0.9,2-2l1-8C22,10.9,21.1,10,20,10z"
                      ></path>
                    </g>
                  </svg>
                  {`${this.props.likes || 0}`}
                </button>
                <>|</>
                <button type="action-buttons" className="action-buttons">
                  Share
                </button>
              </span>
            </div>
          </>
        )}
        {this.props.user.user_id && this.props.user.email ? (
          <CommentForm edit={this.state.edit} />
        ) : null}
        {this.state.showComments ? (
          <div className="Comments-container">
            {this.state.renderedComments}
            <button onClick={this.getMoreComments}>View more comments</button>
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
};
function mapStateToProps(state) {
  const { user } = state;
  return { user };
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
