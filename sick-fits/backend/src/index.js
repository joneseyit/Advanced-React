const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()
//TODO Use express middleware to handle cookies
server.express.use(cookieParser())

// decode the JW so we can get the user id on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies
    if(token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        //put uerID on request
        req.userId = userId
    }
    next();

})


// TODO use express to  populate current user

server.start(
    {
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL
        }, 
    },    
        
    deets => {
            console.log('Server is now running on port ', deets.port)
        }
    
);

