// Write your "actions" router here!
const express = require('express');

const { validateActions } = require('./actions-middlware')

const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions =>{
            res.status(200).json(actions)
        })
})

router.get('/:id',validateActions, (req, res) => {
    res.status(200).json(req.action)
})



module.exports = router