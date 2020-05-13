const { Router } = require('express')
const { db } = require('./../firebase');

const router = new Router();

// GET ALL

router.get('/', async (req, res) => {
    
    let hamsters = []

    let snapshot = await db.collection('hamsters').get()

    snapshot.forEach(hamster => {
        hamsters.push(hamster.data())
    })
    
    res.status(200).send(hamsters)
})

// GET RANDOM

router.get('/random', async (req, res) => {

    let hamsters = await db.collection("hamsters").get()

    let randId = Math.floor(Math.random()*hamsters._size)
    
    let snapshot = await db.collection('hamsters').where("id", "==", randId).get()
    
        snapshot.forEach(hamster => {

            res.status(200).send({ randomHamster: hamster.data() })            
        });
})

// GET ONE

router.get('/:id', async (req, res) => {

    let id = parseInt(req.params.id)
    let hamsters = []
    
    await db.collection('hamsters').where("id", "==", id).get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        } 
    
        snapshot.forEach(hamster => {
            hamsters.push(hamster.data());
        });
    })

    res.status(200).send(hamsters)
})

// UPDATE GAMES / WINS / DEFEATS

router.put('/:id/results', async (req, res) => {
    
    let id = parseInt(req.params.id)

    try {

        let results = await db.collection('hamsters').where("id", "==", id).get()
        results.forEach(hamster => {

            let data = hamster.data()
            let wins = data.wins + req.body.wins
            let defeats = data.defeats + req.body.defeats

            db.collection('hamsters').doc(hamster.id).update({
                games: data.games++,
                wins: wins,
                defeats: defeats
            })
            .then(() => {
                res.status(200).send('Hamster wins/defeats/games updated!')
            })
        })
    }
    catch(err){
        console.log(err);
        
    }
        
})

module.exports = router