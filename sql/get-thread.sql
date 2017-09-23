SELECT
    threads.id AS threadId,
    threads.title AS threadTitle,
    threads.lat AS latitude,
    threads.lng AS longitude,
    threads.description AS threadDescription,
    threads.created_at AS threadCreatedAt,
    categories.id AS categoryId,
    categories.name AS categoryName,
    users.id AS userId,
    users.name AS userName,
    users.image AS userImage
  FROM threads
  LEFT OUTER JOIN categories
    ON threads.category_id = categories.id
  LEFT OUTER JOIN users
    ON threads.created_by = users.id
  WHERE threads.id = ?;