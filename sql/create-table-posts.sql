CREATE TABLE posts (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, /* 投稿ID 自動連番 */
  content VARCHAR(4095) NOT NULL, /* 投稿文 */
  reply_to INTEGER, /* 返信先投稿ID */
  posted_on INTEGER NOT NULL, /* 投稿先スレッドID */
  posted_by INTEGER NOT NULL, /* 投稿者ユーザーID */
  posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP /* 投稿日時 */
);
