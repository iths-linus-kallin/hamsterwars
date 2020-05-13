const {Router} = require('express')
const { db } = require('./../firebase');
const _ = require('underscore');

const router = new Router();

// TOP 5

router.get('/top', async (req, res) => {

    try{
        let hamsters = []
        
        await db.collection('hamsters').get()
        .then(snapshot => {
            
            snapshot.forEach(hamster => {
                hamsters.push(hamster.data());
            });
        })

        let sortedHamsters = _.sortBy(hamsters, 'wins')

        let topFive = sortedHamsters.slice(-5)
        
        res.status(200).send(topFive)
    }
    catch(err){
        console.log(err);
    }
})

// BOTTOM 5

router.get('/bottom', async (req, res) => {

    try{
        let hamsters = []
        
        await db.collection('hamsters').get()
        .then(snapshot => {
            
            snapshot.forEach(hamster => {
                hamsters.push(hamster.data());
            });
        })

        let sortedHamsters = _.sortBy(hamsters, 'wins')

        let bottomFive = sortedHamsters.slice(0, 5)
        
        res.status(200).send(bottomFive)
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router