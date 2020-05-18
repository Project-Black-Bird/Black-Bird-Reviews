module.exports = {
    createPost: (req,res) =>{
        const {user_id, image, review} = req.body,
              db = req.app.get('db');
        db.posts.get_all_posts()
        .then(posts=> res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    },
    getAllPosts: (req, res) =>{

    }
}