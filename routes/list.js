const express = require('express');
const router = express.Router();
const Wish = require('../models/wish');

// @route   GET api/list
// @desc    Get list
router.get('/', (req, res) => {
    Wish.find()
        .sort({date: -1})
        .then(wishes => res.json(wishes))
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});

// @route   POST api/list
// @desc    Add wish to list
router.post('/', (req, res) => {
    const newWish = new Wish({
        name: req.body.name,
        link: req.body.link,
        image: req.body.image,
        taken: req.user.taken
    });

    newWish.save().then(post => res.json(post));
});

// @route   PUT api/list/:wish_id
// @desc    Add wish to list
router.put('/:wish_id', (req, res) => {
    let taken = {"taken": req.body.taken}
    Wish.findOneAndUpdate(
        {_id: req.params.wish_id},
        {$set: taken},
        {new: true}
    ).then(wish => {
        res.json(wish)
    })
});

module.exports = router;
