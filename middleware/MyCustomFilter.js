const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function myCustomFIlter() {
    return (req, res, next) => {

        const ROLES = ["ADMIN"];
        
        const bearer = req.cookies.Bearer;
        try {

            if (!bearer) 
                throw new Error("Primero tenés que iniciar sesión.");

            jwt.verify(bearer, SECRET)
            const token = jwt.decode(bearer);
            const allowed = ROLES.includes(token.role);

            if (!allowed) 
                throw new Error("No tenés permisos, papu =|");

            next();
            
        } catch (error) {
            res.json(error.message)
        }

    }
};