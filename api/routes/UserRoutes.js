const userRouter = require('express').Router();
const myCustomFilter = require('../middleware/MyCustomFilter')
const loginMiddleware = require('../middleware/LoginMiddleware')
const userService = require('../services/UserService')

// protected routes using my custom filter =)
/* userRouter.use(["/post"], myCustomFilter());
 */

userRouter.post("/signup", async (req, res) => {
    const {
        username, email, password
    } = req.body;
    const result = await userService.create(username, email, password);
    res.json(result);
})

userRouter.post("/login", loginMiddleware());

userRouter.get("/validate", myCustomFilter(),
    (req, res) => {
        res.json({
            ok: true,
            user: req.token
        })
    })

userRouter.post("/logout", (req, res) => {
    res.clearCookie("Bearer");
    res.clearCookie("User");
    res.json({ ok: true });
})


/* userRouter.post("/post", (req,res) => {
    res.json("A la orden, mi Capitán");
}) */

module.exports = userRouter;