SELECT
    posts.id AS postId,
    posts.content AS postContent,
    posts.reply_to AS postReplyTo,
    posts.posted_at AS postPostedAt,
    users.id AS userId,
    users.name AS userName,
    users.image AS userImage
  FROM posts
  LEFT OUTER JOIN users
    ON posts.posted_by = users.id
  WHERE posts.posted_on = ?;