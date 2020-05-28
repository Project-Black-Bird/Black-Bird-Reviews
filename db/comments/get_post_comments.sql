select *,
(select name from 
        users where user_id = comments.user_id) as username
from comments where post_id = $1
ORDER BY
comment_id DESC;