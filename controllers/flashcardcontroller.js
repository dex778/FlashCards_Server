const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validateSession');
const flashcard = require('../models/flashcard');

//Endpoint to create Flashcard with word and definiton

router.post('/create', validateSession, (req,res) => {
    const newCard = {
        word: req.body.word,
        definition: req.body.definition,
        owner: req.user.id,
      };
      if (req.body.setId) {
        newCard.setId = req.body.setId;
      }
      flashcard.create(newCard)
    .then(flashcards => res.status(200).json(flashcards))
    .catch (err=> res.status(500).json({error:err}))
})

//Get all flashcards for specific user

router.get('/flashcard', validateSession, (req, res) => {
    let userid = req.user.id
    flashcard.findAll({
      where: {owner: userid}
    })
    .then(flashcardss => res.status(200).json(flashcardss))
    .catch(err => res.status(500).json({error: err}))
});

//Endpoint to get flashcard by word

router.get('/:word', function(req,res) {
    let word = req.params.word;
    flashcard.findAll({
        where: {word: word}
    })
    .then(flashcards => res.status(200).json(flashcards))
    .catch(err => res.status(500).json({error: err}))
    // console.log(err)
})


//Endpoint to update flashcard
router.put("/update/:id", validateSession, function (req, res) {
    const updateFlashcard = {
        word: req.body.word,
        definition: req.body.definition      
    };
    const query = { where: { 
        id: req.params.id 
    } };
    flashcard.update(updateFlashcard, query)
        .then((flashcards) => res.status(200).json(flashcards))
        .catch((err) => res.status(500).json({ error: err }));
});


//Endpoint to delete flashcard

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { 
        where: { 
            id: req.params.id
        } };
    flashcard.destroy(query)
        .then(() => res.status(200).json({ message: "Flashcard Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;