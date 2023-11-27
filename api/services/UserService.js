const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

const userService = {

    create: async function (username, email, password) {
        let user = {};
        try {
            if (password.length < 6)
                throw new Error("La contraseña debe tener un mínimo de seis (6) caracteres");

            password = await bcrypt.hash(password, salt);
            user = await User.create(
                {
                    username: username,
                    email: email,
                    password: password
                }
            );
            return {ok: true};
        } catch (error) {
            return { 
                "ok": false,
                "error": error.message
            };
        }
    }
}

module.exports = userService;