const express = require('express');
const userRoutes = require('./routes/userRoutes');
const securedRouter = require('./routes/securedRoutes/securedRouter');
const bodyParser = require('body-parser');
const authMiddleware = require('./authentication/authMiddleware');
const helmet = require('helmet');
const cors = require('cors')

const server = express();
const port = process.env.port || 5000;

const corsOptions = {}

function logger(req, res, next){
    console.log(`${Date.now()}: ${req.method} at ${req.url}`)
    next();
}

server.use(logger);
// SOMETHING IS WRONG WITH  CORS
server.use(helmet())
server.use(cors())
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use("/auth", userRoutes)
server.use("/protected", authMiddleware ,securedRouter )

server.get('/', (req, res) =>{
    res.status(200).json({location: "At backend root."})
})

server.listen(port, ()=>{
    console.log(`SERVER is on port: ${port}`)
})
