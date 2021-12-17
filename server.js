const express = require("express");
const cors = require("cors");
const authorization = require("./middleware/authorization");
const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// routes

app.use("/auth", require("./routes/jwtAuth"));
app.use("/manage", require("./routes/manage"));

// add a group
app.post("/groups", async (req, res) => {
  try {
    const {
      userID,
      gameSystem,
      gameVersion,
      adventureName,
      adventureLength,
      language,
      totalPlayerCount,
      currentPlayerCount,
      playerExpLevel,
      medium,
      platform,
      communicationMethod,
      location,
      hosting,
      sessionFrequency,
      sessionLength,
      gmTimeZone,
      sessionDay,
      sessionHour,
      gameStyle,
      gmStyle,
      adventureStyle,
      gmExperinceLevel,
      storyGenre,
      campaignPrimer,
      storyStyle,
    } = req.body;

    const createTime = new Date(Date.now()).toISOString();

    const newGroup = await pool.query(
      "INSERT INTO groups (creator_id , create_time , game_system, game_version, adventure_name, adventure_length, game_language , story_style , total_player_count, current_player_count, player_experience_level, medium, platform, communication_method, session_location, hosting, primer, story_genre, gm_experience_level, adventure_style, gm_style, player_style, session_time, session_day, session_length, session_frequency, gm_timezone) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING *",
      [
        userID,
        createTime,
        gameSystem,
        gameVersion,
        adventureName,
        adventureLength,
        language,
        storyStyle,
        totalPlayerCount,
        currentPlayerCount,
        playerExpLevel,
        medium,
        platform,
        communicationMethod,
        location,
        hosting,
        campaignPrimer,
        storyGenre,
        gmExperinceLevel,
        adventureStyle,
        gmStyle,
        gameStyle,
        sessionHour,
        sessionDay,
        sessionLength,
        sessionFrequency,
        gmTimeZone,
      ]
    );

    res.json(newGroup.rows[0]);



  } catch (err) {
    console.error(err.message);
  }
});

// get all groups

app.get("/groups?", async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    // console.log(page);
    // console.log(limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allGroups = await pool.query(
      "SELECT  * FROM groups ORDER BY group_id DESC"
    );

    const pageCount = Math.floor((allGroups.rows.length - 1)/ limit) + 1;    
    const response = {}

    // console.log(allGroups.rows)
     response.groups = allGroups.rows.slice(startIndex, endIndex);
     response.pageCount = pageCount;
    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

// get all groups of a user
app.get("/groups/:user_id", async (req, res) => {
    try {
        const {user_id} = req.params;
        const response = {}

        const gmGroups = await pool.query("SELECT * FROM groups WHERE creator_id = $1", [user_id]);
        response.gm = gmGroups.rows;

        const playerGroups = await pool.query("SELECT * FROM players INNER JOIN groups ON players.group_id = groups.group_id WHERE user_id = $1", [user_id]);
        response.player = playerGroups.rows;

        const requestedGroups = await pool.query("SELECT * FROM requests INNER JOIN groups ON requests.group_id = groups.group_id WHERE user_id = $1", [user_id]);
        response.request = requestedGroups.rows;

        res.json(response);

    } catch (err) {
        console.error(err.message)
    }

});

// app.get("/groups/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const group = await pool.query("SELECT * FROM groups WHERE group_id = $1", [
//       id,
//     ]);
//     res.json(group.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// add a player to a group

app.post("/players", async (req, res) => {
  try {
    const { userID, groupID } = req.body;

    const newPlayer = await pool.query(
      "INSERT INTO players (user_id, group_id) VALUES ($1, $2) RETURNING *",
      [userID, groupID]
    );

    const requests = await pool.query(
      "DELETE FROM requests WHERE user_id = $1 AND group_id = $2",
      [userID, groupID]
    );

    res.json(newPlayer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all players of a group by id

app.get("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const players = await pool.query(
      "SELECT users.user_id, username FROM players INNER JOIN users on players.user_id = users.user_id WHERE group_id = $1",
      [id]
    );
    res.json(players.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// send a request to a group
app.post("/requests", async (req, res) => {
  try {
    const { userID, groupID } = req.body;

    const isInGroup = await pool.query(
      "SELECT * FROM players WHERE user_id = $1 AND group_id = $2",
      [userID, groupID]
    );

    if (isInGroup.rows.length !== 0) {
      return res
        .status(401)
        .json("Can't send a request. User is already in group.");
    }

    const newRequest = await pool.query(
      "INSERT INTO requests (user_id, group_id) VALUES ($1, $2) RETURNING *",
      [userID, groupID]
    );

    res.json(newRequest.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



// get all requests of a group by id

app.get("/requests/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const requests = await pool.query(
      "SELECT user_id, group_id FROM requests WHERE group_id = $1",
      [id]
    );
    res.json(requests.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a request

app.delete("/requests", async (req, res) => {
  try {
    const { userID, groupID } = req.body;
    const deleteRequest = await pool.query(
      "DELETE FROM requests WHERE user_id = $1 AND group_id =$2",
      [userID, groupID]
    );

    res.json("Request is deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a user

app.delete("/players", async (req, res) => {
  try {
    const { userID, groupID } = req.body;
    const deletePlayer = await pool.query(
      "DELETE FROM players WHERE user_id = $1 AND group_id =$2",
      [userID, groupID]
    );

    res.json("Player is deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// get userID by email
app.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await pool.query(
      "SELECT user_id FROM users WHERE email = $1",
      [email]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
