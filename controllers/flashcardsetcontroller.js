const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validateSession');
const flashcard = require("../models/flashcard");
const flashcardset = require('../models/flashcardSet');

//Endpoint to create Flashcard set with set name word and definiton

router.post('/create', validateSession, (req,res) => {
    flashcardset.create({
        setName: req.body.setName,
        owner: req.user.id
    })
    .then(flashcardset => res.status(200).json(flashcardset))
    .catch (err=> res.status(500).json({error:err}))
})

//Get all flashcards for specific user

router.get('/flashcard', validateSession, (req, res) => {
    let userid = req.user.id
    flashcardset.findAll({
      where: {owner: userid}
    })
    .then(flashcardss => res.status(200).json(flashcardss))
    .catch(err => res.status(500).json({error: err}))
});

//Endpoint to get flashcard by setName

router.get("/flashCard/:setId", function (req, res) {
    const setId = req.params.setId;
    flashcard.findAll({
        where: { setId },
      })
      .then((flashcards) => res.status(200).json(flashcards))
      .catch((err) => res.status(500).json({ error: err }));
    // console.log(err)
  });


//Endpoint to update flashcard
router.put("/update/:id", validateSession, function (req, res) {
    const updateFlashcardSet = {
        setName: req.body.setName,      
    };
    const query = { where: { 
        id: req.params.id 
    } };
    flashcardset.update(updateFlashcardSet, query)
        .then((flashcardset) => res.status(200).json(flashcardset))
        .catch((err) => res.status(500).json({ error: err }));
});


//Endpoint to delete flashcard

router.delete("/delete/:id", validateSession, async function (req, res) {
    const query = {
      where: {
        id: req.params.id,
      },
    };
  
    try {
      await flashcard.destroy({
        where: {
          setId: req.params.id,
        },
      });
  
      await flashcardset.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      return res.status(200).json({ message: "Flashcard Entry Removed" });
    } catch (error) {
      return res.status(500).json({ error: err });
    }
  });

  module.exports = router