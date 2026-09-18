const { LoginValues } = require('../querys/LoginQuery.js');
const { bcrypt } = require('../controllers/Register.js');
const jwt = require('jsonwebtoken');
const { randomUUIDv7 } = require('node:crypto');
const { InsertRefreshTokens } = require('../querys/RefreshQuery.js');

function TokenCreation(payload, secret, expiresTime) {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresTime,
    algorithm: 'HS256', // Header
  });
  return token;
}

async function Login(req, res) {
  let valid;
  valid = typeof req.body.email === 'string' && typeof req.body.password === 'string';

  //Condition before passing the things
  if (valid && req.body.email.length > 1 && req.body.password.length > 1) {
    const { password } = req.body;
    const storedPasswordHash = await LoginValues(req.body);

    if (storedPasswordHash.rows === 1) {
      const comparePassword = await bcrypt.compare(password, storedPasswordHash.password); //User Hash Password Checks here
      if (comparePassword) {
        const randomUUI = randomUUIDv7();

        /* Tokens Creation */
        const jwtToken = TokenCreation(
          { email: req.body.email }, // Payload
          process.env.JWT_SECRET, // Secret: private key used to create and verify the JWT signature
          '15m'
        );
        const refreshToken = TokenCreation(
          { email: req.body.email, token_id: randomUUI },
          process.env.REFRESH_SECRET,
          '7d'
        );
        const refreshValues = {
          token_id: randomUUI,
          status: 'active',
          user_id: storedPasswordHash.id,
        };
        InsertRefreshTokens(refreshValues);

        /* Tokens Stored in Cookie Storage */
        res.cookie('JWT', jwtToken, {
          httpOnly: true,
          secure: true, //make this true for security cross-site = cookie sending
          sameSite: 'none',
        });

        res.cookie('REFRESH', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });

        res.statusCode = 200;
        res.send({
          message: 'Login Sucessfully',
        });
      } else {
        res.statusCode = 401;
        return res.send({
          message: 'Wrong Password Please Enter Correct Password',
        });
      }
    } else {
      res.statusCode = 401;
      return res.send({
        message: 'User Not Found',
      });
    }
  } else {
    res.statusCode = 400;
    res.json({
      message: 'Invalid Parameters',
    });
  }
}
module.exports = { Login, TokenCreation };
