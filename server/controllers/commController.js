module.exports = {
    createComment: (req,res) =>{
        const {user_id, post_id, comment} = req.body,
        db = req.app.get('db');

        db.comments.create_comment(user_id, comment, post_id)
            .then(()=> res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    },
    getUserComments: (req, res)=>{
        const {id} = req.params,
            db = req.app.get('db');
        db.comments.get_user_comments(id)
        .then(comments => res.status(200).send(comments))
        .catch(err => console.log(err));
    },
    getPostComments: (req, res)=>{
        const {id} = req.params,
            db = req.app.get('db');
        db.comments.get_post_comments(id)
        .then(comments => res.status(200).send(comments))
        .catch(err => console.log(err));
    },
    editUserComment: (req,res)=>{
        const {id} = req.params,
        {comment} = req.body,
        db = req.app.get('db');

        db.comments.edit_user_comment(id, comment)
            .then(()=> res.sendStatus(200))
            .catch(err=> res.status(500).send(err));  
    },
    deleteUserComment: (req,res)=>{
        const {id} = req.params,
        db = req.app.get('db');

        console.log(id);
        
        db.comments.delete_user_comment(id)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    }
}