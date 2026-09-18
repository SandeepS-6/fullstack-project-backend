const jwt = require("jsonwebtoken");

function TokenVerification(req, res, next) {
  try {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      throw new Error("No Cookie Sent");
    } else {
      const cookies = cookieHeader.split("; ");
      const jwtCookie = cookies.find((e) => {
        return e.startsWith("JWT=");
      });
      if (!jwtCookie) {
        throw new Error("Invalid access token");
      } else {
        //undefined behaves as false in a boolean context.
        //NOT OPERATOR TURNS INTO REVERSE SO UNDEFIND AS THE VALUE IS FALSE BUT WITH NOT OPERATOR IS TRUE
        const jwtToken = jwtCookie.slice(4); //slice will gives the new array
        const decodePayload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.payload = decodePayload;
        next();
      }
    }
  } catch (e) {
    res.statusCode = 401;
    res.send({
      message: e.message,
    });
  }
}

module.exports = { TokenVerification };
