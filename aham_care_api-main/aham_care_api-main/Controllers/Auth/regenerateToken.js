const jwt = require("jsonwebtoken");
const User = require("../../models/user")
const {generateAccessToken} =require("../../utils/JWT")
module.exports = async (req, res) => {
    const { refreshToken } = req.body;

    // verify refresh token
    jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // check if user exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // generate new access token
        const accessToken = generateAccessToken({ id: user._id });

        // send new access token to client
        res.json({ accessToken, success: true    });
    });
};