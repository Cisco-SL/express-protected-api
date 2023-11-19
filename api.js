require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const db = require('./db')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const userRouter = require('./routes/UserRoutes')
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(userRouter);

async function main() {

    app.listen(PORT, () => {
        console.log(`Server is listening...`)
    })

    db.connect();
}

main().catch(err => console.log(err));




