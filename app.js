require('dotenv').config();

const Express = require('express');
const app = Express();
const cors = require('cors')
const database = require('./db');
const userController = require('./controllers/userController')
const flashcardcontroller = require('./controllers/flashcardcontroller')
const flashcardsetcontroller = require('./controllers/flashcardsetcontroller')

app.use(require('./middleware/headers'));
app.use(Express.json())
app.use(cors())

app.use("/", userController)
app.use('/card', flashcardcontroller)
app.use('/set', flashcardsetcontroller)


database.sync();

//drop tables by  db.sync({force:true})

app.listen(process.env.PORT, () => console.log(`[${process.env.PORT}]: THE APP IS RUNNING`))