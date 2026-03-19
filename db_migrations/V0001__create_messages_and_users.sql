CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT 'У',
  color TEXT NOT NULL DEFAULT 'from-[#5865f2] to-[#7c3aed]',
  role TEXT NOT NULL DEFAULT 'Участник',
  role_color TEXT NOT NULL DEFAULT '#3ba55c',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  channel_id TEXT NOT NULL,
  sub_channel_id TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel_id, sub_channel_id, created_at);

INSERT INTO users (name, avatar, color, role, role_color) VALUES
  ('Александр', 'А', 'from-[#5865f2] to-[#7c3aed]', 'Администратор', '#faa61a'),
  ('Наташа', 'Н', 'from-pink-500 to-rose-500', 'Участник', '#3ba55c'),
  ('Михаил', 'М', 'from-teal-500 to-cyan-500', 'Модератор', '#5865f2');

INSERT INTO messages (user_id, channel_id, sub_channel_id, text) VALUES
  (1, 'general', 'announcements', 'Добро пожаловать в пространство! Здесь собрана команда. Приватные каналы доступны только по приглашению.'),
  (2, 'general', 'announcements', 'Отличная платформа! Наконец можно общаться без лишних глаз 👀'),
  (3, 'general', 'announcements', 'Получил приглашение в приватный канал — всё работает чётко. Подтверждаю 🔐');
