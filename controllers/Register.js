const { regsiterQuery } = require("../querys/RegistrationQuery");
const bcrypt = require("bcrypt");

async function HashByCrypt(password, salt) {
  return bcrypt.hash(password, salt);
}

async function Register(req, res) {
  let isValid;
  isValid =
    typeof req.body.firstName === "string" &&
    typeof req.body.lastName === "string" &&
    typeof req.body.email === "string" &&
    typeof req.body.password === "string";
  if (
    isValid &&
    req.body.firstName.length > 1 &&
    req.body.lastName.length > 1 &&
    req.body.email.length > 1 &&
    req.body.password.length > 1
  ) {
    const { password } = req.body;

    req.body.password = await HashByCrypt(password, 2); //dont give the extra object syntax it will create another object

    let result = await regsiterQuery(req.body);
    res.statusCode = result.statusCode;
    res.json({
      message: result.message,
    });
  } else {
    res.statusCode = 400;
    res.send({
      message: "Validation Error",
    });
  }
}

module.exports = { Register, bcrypt, HashByCrypt };
