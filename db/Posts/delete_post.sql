DELETE FROM comments
WHERE post_id = $1;

DELETE FROM posts
where post_id = $1;