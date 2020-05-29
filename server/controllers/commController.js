module.exports = {
  createComment: (req, res) => {
    const { user_id, post_id, comment } = req.body,
      db = req.app.get("db");
    db.comments
      .create_comment(user_id, comment, post_id)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.status(500).send(err);
        console.log(err);
      });
  },
  getCommentCountForPost: function (req, res) {
    if (req.params.post_id == null) {
      res.status(400).send("Missing post_id in request");
      return;
    } else if (+req.params.post_id > 0) {
      req.app
        .get("db")
        .comments.get_comments_count(req.params.post_id)
        .then((result) => {
          console.log("RESULT", result);
          if (result.length > 0) {
            res
              .status(200)
              .json({
                post_id: req.params.post_id,
                count: (result[0] || {}).count,
              });
          } else {
            res
              .status(500)
              .send(
                `Database result was empty for post_id:${req.params.post_id}`
              );
          }
        });
    } else {
      res.status(422).send(`req.params.post_id was not a valid format`);
    }
  },
  getUserComments: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");
    db.comments
      .get_user_comments(id)
      .then((comments) => res.status(200).send(comments))
      .catch((err) => console.log(err));
  },
  getPostComments: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");
    db.comments
      .get_post_comments(id)
      .then((comments) => res.status(200).send(comments))
      .catch((err) => console.log(err));
  },
  editUserComment: (req, res) => {
    const { id } = req.params,
      { comment } = req.body,
      db = req.app.get("db");

    db.comments
      .edit_user_comment(id, comment)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
  deleteUserComment: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");

    console.log(id);

    db.comments
      .delete_user_comment(id)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
};
