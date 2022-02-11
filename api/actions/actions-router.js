// Write your "actions" router here!
const express = require('express');
const req = require('express/lib/request');

const { validateActionsId, validateActions } = require('./actions-middlware')

const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions =>{
            res.status(200).json(actions)
        })
})

router.get('/:id', validateActionsId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateActions, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(200).json(action)
    })
})

router.put('/:id', validateActionsId, validateActions, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
})

router.delete('/:id', validateActionsId, (req, res) => {
        Actions.remove(req.params.id)
            .then(()=> {
                res.status(200).json()
            })
})



module.exports = router