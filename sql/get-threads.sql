SELECT *
FROM (
  SELECT
    threads.id AS threadId,
    threads.title AS threadTitle,
    threads.latitude AS latitude,
    threads.longitude AS longitude,
    threads.description AS threadDescription,
    categories.id AS categoryId,
    categories.name AS categoryName,
    (
      6371 * ACOS(
        COS(RADIANS(?)) *
        COS(RADIANS(threads.latitude)) *
        COS(RADIANS(threads.longitude) - RADIANS(?)) +
        SIN(RADIANS(?)) *
        SIN(RADIANS(threads.latitude))
      )
    ) AS distance
  FROM threads
  LEFT OUTER JOIN categories
    ON threads.category_id = categories.id
) threads_tmp
WHERE distance < 5
;