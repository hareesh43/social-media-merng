const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const {SECRET_KEY} = require("../../config");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      password = await bcrypt.hash(password, 12);
      const newUser = User({
        username,
        email,
        password,
        createdAt: new Date().toString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,{expiresIn:'1hr'}
      );
      return {
        ...res._doc,
        id:res._id,
        token
      }
    },
  },
};
