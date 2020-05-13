const {Router} = require('express');
const { db } = require('./../firebase');
const _ = require('underscore');

const router = new Router();

// GET TOTAL GAMES STATS

router.get('/total', async (req, res) => {

    let games = []

    await db.collection('games').get()
    .then(snapshot => {
        
        snapshot.forEach(game => {
            games.push(game.data());
          });
    })
    
    let statsObj = {
        totalGames: games.length,
    }

    res.status(200).send(statsObj)
})

// GET FAVFOOD STATS

router.get('/favfood', async (req, res) => {

    let hamsters = []

    await db.collection('hamsters').get()
    .then(snapshot => {
        
        snapshot.forEach(hamster => {
            hamsters.push(hamster.data());
          });
    })
    
    let tagArray = _.pluck(hamsters,'favFood')
    let mostFavFood = _.chain(tagArray).countBy().pairs().max(_.last).head().value();
    
    let statsObj = {
        mostFavFood: mostFavFood
    }

    res.status(200).send(statsObj)
})

module.exports = router