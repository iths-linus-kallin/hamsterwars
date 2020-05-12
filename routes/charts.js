const {Router} = require('express')
const { auth, db } = require('./../firebase');

const router = new Router();

router.get('/top', async (req, res) => {

    let topFive = []

    hamsters.sort(await function (a, b) {
        return (a.wins - b.wins).slice(0,5);
    });

    await db.collection('hamsters').where('wins', '>', 0).get()
    .then(snapshot => {
        
        snapshot.forEach(hamster => {
            hamsters.push(hamster.data());
          });
    })

    res.status(200).send(topFive)
})

router.get('/bottom', async (req, res) => {

    let bottomFive = []

    hamsters.sort(await function (a, b) {
        return (-a.wins - b.wins).slice(0,5);
    });

    await db.collection('hamsters').where('wins', '>', 0).get()
    .then(snapshot => {
        
        snapshot.forEach(hamster => {
            hamsters.push(hamster.data());
          });
    })

    res.status(200).send(bottomFive)
})

module.exports = router