// IMPORTERA FUNKTIONALITET
const express = require('express');
const app = express();
const { db } = require('./firebase');
const dotenv = require('dotenv').config();
const helmet = require('helmet');

// GÖR OM POSTS TILL JSON
app.use(express.json());

// SERVE PUBLIC-MAPP
app.use('/', express.static('./public'))
app.use('/assets', express.static('./hamsters'))

// // MIDDLEWARE Kolla mot authorization-nyckel i header
let auth = (req, res, next) => {
    
    const APIKey = process.env.APIKEY
    
    if(req.method != 'GET'){
        
        if(APIKey === req.headers['authorization']){
            
            next()

        } else {

            res.status(403).send("You don't have the right API-key")
        }
        
    } else {
        
        next()
        
    }
}

app.use(auth)
app.use(helmet())

// ROUTES
const hamstersRoute = require('./routes/hamsters')
app.use('/hamsters', hamstersRoute)
const chartsRoute = require('./routes/charts')
app.use('/charts', chartsRoute)
const gamesRoute = require('./routes/games')
app.use('/games', gamesRoute)
const statsRoute = require('./routes/stats')
app.use('/stats', statsRoute)

// LOCALHOST
app.listen(3000, () => {
    console.log('Server up and running on port 3000');
})