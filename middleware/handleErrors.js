const handleErrors = (err) => {
  let errors = { name: "", email: "", phone: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message === "This email is not registered") {
    errors.email = "This email is not registered";
  }

  if (err.message === "Incorrect email or password") {
    errors.email = "Incorrect email or password";
    errors.password = "Incorrect email or password";
  }

  return errors;
};

module.exports = { handleErrors };
