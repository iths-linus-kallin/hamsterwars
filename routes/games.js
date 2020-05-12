const {Router} = require('express')
const { auth, db } = require('./../firebase');

const router = new Router();

router.get('/', async (req, res) => {

    let games = []

    await db.collection('games').get()
    .then(snapshot => {
        
        snapshot.forEach(game => {
            games.push(game.data());
          });
    })

    res.status(200).send(games)
})

router.post('/', async (req, res) => {
    
    await db.collection('games').doc().set({
        id: 2,
        timeStamp: new Date(Date.now()),
        contestants: [
            { id: 1 },
            { id: 2 }
        ],
        winner: { id: 1 }
    })

    res.status(200).send('DB updated with new game!')
})

module.exports = router