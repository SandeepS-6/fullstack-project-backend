const { ProfileQuery } = require("../querys/ProfileQuery.js");
const { UpdateProfieValues } = require("../querys/ProfileUpdate.js");

async function Profile(req, res) {
  if (req.payload.email.length > 1) {
    const result = await ProfileQuery(req.payload);

    res.statusCode = result.code;
    res.send({
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      likesCount: result.likesCount,
      id: result.id,
    });
  } else {
    res.send({
      message: "Token Expired Login agian",
    });
  }
}
async function UpdateProfile(req, res) {
  if (req.payload.email.length > 1) {
    const profileUpdate = await UpdateProfieValues(req.body);
    res.statusCode = profileUpdate.statusCode;

    res.send({
      firstName: profileUpdate.firstName,
      lastName: profileUpdate.lastName,
      id: profileUpdate.id,
      likesCount: profileUpdate.likesCount,
    });
  } else {
    res.send({
      message: "Token Expired Login agian",
    });
  }
}
module.exports = { Profile, UpdateProfile };
