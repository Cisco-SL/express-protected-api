require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const db = require('./db')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const userRouter = require('./routes/UserRoutes')
const PostRouter = require('./routes/PostRoutes')
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(userRouter);
app.use(PostRouter);
app.use("/images", express.static("uploads"))
/* app.use("/", express.static("app/dist"))
app.get("*", (req, res) => {
    res.sendFile("index.html", {root: "app/dist"})
}) */
async function main() {

    app.listen(PORT, () => {
        console.log(`Server is listening...`)
    })

    db.connect();
}

main().catch(err => console.log(err));




