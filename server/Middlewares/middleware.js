const jwt = require("jsonwebtoken");
const User = require("../Model/userSchema");
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwToken;
    if (!token) return res.status(401).json({ error: "Please Login First" });
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const crrUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!crrUser) {
      return res.status(401).json({ error: "Unauthorized Request" });
    }
    req.token = token;
    req.crrUser = crrUser;
    req.userId = crrUser._id;
    res.status(200).json({ crrUser, message: "Authenticated" });
    next();
  } catch (err) {
    res.status(401).send("Invalid Token Is Found");
    console.log(err);
  }
};

module.exports = authenticate;
