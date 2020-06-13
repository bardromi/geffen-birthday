const express = require('express');
const router = express.Router();
const Wish = require('../models/wish');

// @route   GET api/list
// @desc    Get list
router.get('/', (req, res) => {
    Wish.find()
        .sort({date: -1})
        .then(wishes => res.json(wishes))
        .catch(() => res.status(404).json({nopostsfound: 'No posts found'}));
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
    const taken = req.body.taken;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    const set = {
        "taken": taken,
        "first_name": firstName,
        "last_name": lastName
    }

    Wish.findOne(
        {_id: req.params.wish_id}
    ).then(wish => {
        if (!wish.taken || (!wish.first_name && !wish.last_name) || wish.first_name === firstName && wish.last_name === lastName) {
            Wish.findOneAndUpdate(
                {_id: req.params.wish_id},
                {$set: set},
                {new: true}
            ).then(wish => {
                res.json(wish)
            })
        } else {
            res.json({
                "taken": wish.taken,
                "error": "you cant change others gifts"
            })
        }
    })

    // Wish.findOneAndUpdate(
    //     {_id: req.params.wish_id},
    //     {$set: taken},
    //     {new: true}
    // ).then(wish => {
    //     res.json(wish)
    // })
});

module.exports = router;
