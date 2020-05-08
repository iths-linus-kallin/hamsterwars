// IMPORTERA FUNKTIONALITET
const express = require('express');
const app = express();

// GÖR OM POSTS TILL JSON
app.use(express.json());

// SERVE PUBLIC-MAPP
app.use('/', './public')

// MIDDLEWARE


// ROUTES
const assetsRoute = require('./routes/assets')
app.use('/assets', assetsRoute)
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