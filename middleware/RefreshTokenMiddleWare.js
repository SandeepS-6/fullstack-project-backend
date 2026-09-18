const jwt = require("jsonwebtoken");

function RefreshTokenMiddleWare(req, res, next) {
  const cookies = req.headers.cookie;
  try {
    if (!cookies) {
      throw new Error("No Refresh Cookie Value found");
    } else {
      const refreshCookieHeader = cookies.split("; ");
      const refreshCookie = refreshCookieHeader.find((e) => {
        return e.startsWith("REFRESH=");
      });
      if (!refreshCookie) {
        throw new Error("No Refresh value found ");
      } else {
        const refreshToken = refreshCookie.slice(8);
        const refereshPayload = jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET,
        );
        req.refreshPayload = {
          email: refereshPayload.email,
          token_id: refereshPayload.token_id,
        };
        next();
      }
    }
  } catch (e) {
    res.statusCode = 401;
    res.json({
      message: e.message,
    });
  }
}

module.exports = { RefreshTokenMiddleWare };
