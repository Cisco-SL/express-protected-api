const userRouter = require('express').Router();
const myCustomFilter = require('../middleware/MyCustomFilter')
const loginMiddleware = require('../middleware/Login')
const userService = require('../services/UserService')

// protected routes using my custom filter =)
userRouter.use(["/post"], myCustomFilter());


userRouter.post("/signup", async (req,res) => {
    const {
        username, email, password
    } = req.body;
    const result = await userService.create(username, email, password);
    res.json(result);
})

userRouter.post("/login", loginMiddleware(), (req, res) => {
    res.json({message: `Welcome!`})
})

userRouter.post("/logout", (req,res) => {
    res.clearCookie("Bearer");
    res.json("Chauchaa");
})

userRouter.post("/post", (req,res) => {
    res.json("A la orden, mi Capitán");
})

module.exports = userRouter;