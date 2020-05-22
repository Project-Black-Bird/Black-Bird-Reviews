SELECT p.post_id,
       p.image,
       p.review,
       p.title,
       u.user_id FROM posts p
JOIN users u on u.user_id = p.user_id
-- JOIN likes l on l.post_id = p.post_id
ORDER BY p.post_id DESC;