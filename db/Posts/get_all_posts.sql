SELECT p.post_id,
       p.image,
       p.review,
       p.title,
       u.name,
       u.image,
       l.liked FROM post p
JOIN users u on u.user_id = p.user_id
JOIN likes l on l.posts_id = p.post_id
ORDER BY p.post_id DESC;