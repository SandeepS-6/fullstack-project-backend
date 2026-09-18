const { randomUUIDv7 } = require("node:crypto");
const { TokenCreation } = require("./Login");
const {
  UpdateRefreshValues,
  InsertRefreshTokens,
} = require("../querys/RefreshQuery");

const cookieSecurity = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};
async function RefreshController(req, res) {
  // new Token ID
  const token_id = randomUUIDv7();

  const refreshValues = {
    token_id: req.refreshPayload.token_id,
  };

  const result = await UpdateRefreshValues(refreshValues);
  const insertValues = {
    token_id: token_id,
    user_id: result.user_id,
    status: "active",
  };
  InsertRefreshTokens(insertValues);

  const jwtNew = TokenCreation(
    {
      email: req.refreshPayload.email,
    },
    process.env.JWT_SECRET,
    "15m",
  );
  const refreshNew = TokenCreation(
    {
      email: req.refreshPayload.email,
      token_id: token_id,
    },
    process.env.REFRESH_SECRET,
    "7d",
  );

  res.cookie("JWT", jwtNew, cookieSecurity);
  res.cookie("REFRESH", refreshNew, cookieSecurity);
  // console.log(res.get("set-cookie"));
  res.json({
    accessToken: jwtNew,
    refreshToken: refreshNew,
  });
}
module.exports = { RefreshController };
