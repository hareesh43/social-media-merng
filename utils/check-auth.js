const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports.checkAuth = (context) => {
  //context = {...headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // authHeader is in the Bearer ... format so
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid / Expired token");
      }
    }
    throw Error("Authentication token not provided ' Bearer [token]' ");
  }
  throw Error("Authorization  authHeader not provided ");
};
