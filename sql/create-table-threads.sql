CREATE TABLE threads (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, /* スレッドID 自動連番 */
  lat FLOAT NOT NULL, /* スレッド座標の緯度 */
  lng FLOAT NOT NULL, /* スレッド座標の経度 */
  title VARCHAR(255) NOT NULL, /* スレッドタイトル */
  description VARCHAR(255) NOT NULL, /* スレッドの説明 */
  category_id INTEGER NOT NULL DEFAULT 0, /* カテゴリID */
  created_by INTEGER NOT NULL, /* スレッド作成者ユーザーID */
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP /* スレッド作成日時 */
);
