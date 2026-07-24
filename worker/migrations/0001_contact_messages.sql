CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 1 AND 120),
  email TEXT NOT NULL CHECK(length(email) BETWEEN 3 AND 254),
  message TEXT NOT NULL CHECK(length(message) BETWEEN 1 AND 5000),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
