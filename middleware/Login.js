const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


module.exports = function login() {
    return async (req, res, next) => {
        let token, user;
        const { email, password } = req.body;

        try {
            user = await User.findOne({email : email});
            
            if (!user)
                throw new Error("No existe el usuario.");
            let passwordIsOk = await bcrypt.compare(password, user.password);

            if (!passwordIsOk)
                throw new Error("Credenciales no válidas.");
            
            user = user.toJSON();
            token = jwt.sign(user, SECRET)

            res.cookie("Bearer", token, {
                secure: true,
                httpOnly: true,
                exp: '2h'
            });
            res.json(user);
        } catch (error) {
            res.json({ 
                "ok": false,
                "error": error.message
            })
        }
    }
}