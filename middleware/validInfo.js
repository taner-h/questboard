module.exports = function(req, res, next) {
    const { email, username, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, username, password].every(Boolean)) {
        return res.status(401).send("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).send("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).send("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).send("Invalid Email");
      }
    }
  
    next();
  };