const jwt = require('jsonwebtoken');

module.exports = {
  async createToken(_, res) {
    const token = jwt.sign(
      {
        key: 'stringPayloadToken',
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 432000,
      }
    );

    return res.status(200).json({
      token,
    });
  },
};
