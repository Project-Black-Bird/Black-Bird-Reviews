SELECT p.post_id,
       p.image,
       p.review,
       p.title,
       (select count(*) from 
        comments where post_id = p.post_id) as comment_count,
        (select count(*) from likes where post_id = p.post_id) as likes_count,
        u.user_id
       FROM posts as p
JOIN users u on u.user_id = p.user_id
-- JOIN likes l on l.post_id = p.post_id
ORDER BY p.post_id DESC;