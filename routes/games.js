const {Router} = require('express')
const { db } = require('./../firebase');
const _ = require('underscore');

const router = new Router();

// GET ALL GAMES

router.get('/', async (req, res) => {

    try{
    let games = []

    let snapshot = await db.collection('games').get()
        
        snapshot.forEach(game => {
            games.push(game.data());
          });

    res.status(200).send(games)
    }
    catch(err){
        console.error(err);
        
    }
})

// POST GAME

router.post('/', async (req, res) => {
    
    try{

        db.collection('games').doc().set({
            id: req.body.id,
            timeStamp: new Date(Date.now()),
            contestants: req.body.contestants,
            winner: req.body.winner
        })

        res.status(200).send('DB updated with new game!')
        
    }
    catch(err) {
        console.error(err);
    }
})

module.exports = router