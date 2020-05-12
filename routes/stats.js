const {Router} = require('express')
const { auth, db } = require('./../firebase');

const router = new Router();

router.get('/total', async (req, res) => {

    let games = []

    await db.collection('games').get()
    .then(snapshot => {
        
        snapshot.forEach(game => {
            games.push(game.data());
          });
    })

    let statsObj = {
        totalGames: games.length
    }

    res.status(200).send(statsObj)
})

module.exports = router