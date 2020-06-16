const express = require('express');
const router = express.Router();
const Wish = require('../models/wish');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// @route   GET api/list
// @desc    Get list
router.get('/', (req, res) => {
    Wish.find()
        .sort({date: -1})
        .then(wishes => {
            return res.json(wishes);
        })
        .catch(() => res.status(404).json({nopostsfound: 'No posts found'}));
});

// @route   POST api/list/upload
// @desc    Add wish to list
router.route("/upload_local").post(upload.single('image'), (req, res) => {
    let path = req.file.path.split('\\');
    const newWish = new Wish({
        name: req.body.title,
        link: req.body.link,
        image: path[path.length - 1],
        taken: false
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
