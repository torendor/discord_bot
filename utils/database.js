const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

async function getPrefix(guildId) {
  const [rows] = await pool.query("SELECT prefix FROM settings WHERE bot_name = ? LIMIT 1", [guildId]);
  return rows.length ? rows[0].prefix : "!";
}

module.exports = { getPrefix };