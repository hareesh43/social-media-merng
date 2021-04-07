module.exports.validateRegisterInput = (
  username,
  password,
  confirmPassword,
  email
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username should not be empty";
  }

  if (password === "") {
    errors.password = "password  should not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password does not match";
  }

  if (email.trim() === "") {
    errors.email = "email  should not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "email must be valid";
    }
  }
 
  return {
    errors,
    valid: Object.keys(errors).lenght < 1
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username should not be empty";
  }

  if (password === "") {
    errors.password = "password  should not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).lenght < 1
  };
};
