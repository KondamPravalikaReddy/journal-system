const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // file will be auto-created
  logging: false
});

sequelize.authenticate()
  .then(() => console.log("✓ SQLite connected"))
  .catch(err => {
    console.error("✗ DB error:", err);
    process.exit(1);
  });

module.exports = sequelize;
