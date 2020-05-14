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
        let games = []
        let results = await db.collection('games').get()
        
        results.forEach(game => {

            games.push(game.data())
        })
        console.log(games);
        
        if(games === undefined || games.length == 0){
            db.collection('games').doc().set({
                id: 1,
                timeStamp: new Date(Date.now()),
                contestants: req.body.contestants,
                winner: req.body.winner
            })
            
            res.status(200).send('DB updated with your first game!')

        } else {

            let sortedGames = _.sortBy(games, 'id')
            let highestId = sortedGames.slice(-1)
            let newId = []
            for(id of highestId){
                newId.push(id.id) 
            }
                

            db.collection('games').doc().set({
                id: parseInt(newId)+1,
                timeStamp: new Date(Date.now()),
                contestants: req.body.contestants,
                winner: req.body.winner
            })

            res.status(200).send('DB updated with new game!')
        }   
        
    }
    catch(err) {
        console.error(err);
    }
})

module.exports = router