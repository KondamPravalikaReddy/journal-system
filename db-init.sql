CREATE DATABASE IF NOT EXISTS journal_dev;
CREATE USER IF NOT EXISTS 'journal_user'@'localhost' IDENTIFIED BY 'journal_password';
GRANT ALL PRIVILEGES ON journal_dev.* TO 'journal_user'@'localhost';
FLUSH PRIVILEGES;
