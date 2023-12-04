const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


module.exports = function login() {
    return async (req, res, next) => {
        console.log("a")
        let token, user, passwordIsOk;

        const { email, password } = req.body;
        try {

            user = await User.findOne({ email: email });
            if (!user)
                throw new Error("No existe el usuario.");

            passwordIsOk = await bcrypt.compare(password, user.password);
            if (!passwordIsOk)
                throw new Error("Credenciales no válidas.");
            
            user = user.toJSON();
            delete user.password;

            token = jwt.sign(user, SECRET,
                {
                    expiresIn: "7d"
                })
            res.cookie("Bearer", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                exp: '7d'
            });
            res.json({
                "ok": true,
                user
            });
        } catch (error) {
            res.json({
                "ok": false,
                "error": error.message
            })
        }
    }
}