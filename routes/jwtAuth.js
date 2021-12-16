const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//register

router.post("/register", validInfo, async (req, res) => {
  try {
    //destructer the req.body
    const { username, email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // make sure the email is not in use
    if (user.rows.length !== 0) {
      return res.status(401).json("Email is already in use.");
    }

    // hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    // insert user into database
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    // generating web token
    const token = jwtGenerator(newUser.rows[0].user_id);
    const userID = newUser.rows[0].user_id;

    res.json({ token, userID});
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    // deconstruct the req.body
    const { email, password } = req.body;

    // check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect.");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect.");
    }

    const token = jwtGenerator(user.rows[0].user_id);
    const userID = user.rows[0].user_id;
    res.json({ token, userID});
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/isVerified", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
