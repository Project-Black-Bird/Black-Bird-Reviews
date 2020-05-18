UPDATE posts
SET image = $1,
    review = $2, 
    title = $3
where post_id = $4;