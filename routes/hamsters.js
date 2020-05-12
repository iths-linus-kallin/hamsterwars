const { Router } = require('express')
const { db, auth } = require('./../firebase');

const router = new Router();

router.get('/', async (req, res) => {
    
    let hamsters = []

    let snapshot = await db.collection('hamsters').get()

    snapshot.forEach(hamster => {
        hamsters.push(hamster.data())
    })
    
    res.status(200).send(hamsters)
})

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

router.put('/:id/result', async (req, res) => {
    
    let id = parseInt(req.params.id)

    await db.collection('hamsters').where("id", "==", id).update({
        games: 5
    })

    // await db.collection('hamsters').where("id", "==", id).update({
    //     wins, defeats
    // })

    res.status(200).send('Hamster wins/defeats/games updated!')
})

router.get('/random', async (req, res) => {
    
    let id = parseInt(4)
    
    let hamsters = []
    console.log('hej');

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

    // await function randomHamster(){
        
    //     let array = []

    //     let snapShot = db.collection('hamsters').get()
        
    //     snapShot.forEach(hamster => {
    //         array.push(hamster.data());
    //     });
        
    //     return Math.floor(Math.random() * Math.floor(array.length))
    // }

    res.status(200).send(hamsters)
})


module.exports = router