const {Router} = require('express')
const { db } = require('./../firebase');
const _ = require('underscore');

const router = new Router();

// TOP 5

router.get('/top', async (req, res) => {

    try{
        let hamsters = []
        
        let snapshot = await db.collection('hamsters').get()
            
        snapshot.forEach(hamster => {
            hamsters.push(hamster.data());
        });

        let sortedHamsters = _.sortBy(hamsters, 'wins')
        let topFive = sortedHamsters.slice(-5)
        
        res.status(200).send({topFiveHamsters: topFive})
    }
    catch(err){
        console.error(err);
    }
})

// BOTTOM 5

router.get('/bottom', async (req, res) => {

    try{

        let hamsters = []
        let snapshot = await db.collection('hamsters').get()
            
        snapshot.forEach(hamster => {
            hamsters.push(hamster.data());
        });

        let sortedHamsters = _.sortBy(hamsters, 'wins')
        let bottomFive = sortedHamsters.slice(0, 5)
        
        res.status(200).send({bottomFiveHamsters: bottomFive})
    }
    catch(err){
        console.error(err);
    }
})

module.exports = router