// Write your "actions" router here!
const express = require('express');

const { validateActionsId, validateActions, validateProjectAction } = require('./actions-middlware')

const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions =>{
            res.status(200).json(actions)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message:'information could not be retrieved'})
        })
})

router.get('/:id', validateActionsId, (req, res) => {
    res.status(200).json(req.action)
    .catch(err =>{
        console.log(err)
        res.status(500).json({message:'information could not be retrieved'})
    })
})

router.post('/', validateActions, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(200).json(action)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message:'information could not be posted'})
    })
})

router.put('/:id', validateActionsId, validateActions, validateProjectAction, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message:'information could not be updated'})
        })
})

router.delete('/:id', validateActionsId, (req, res) => {
        Actions.remove(req.params.id)
            .then(()=> {
                res.status(200).json()
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json({message:'information could not be deleted'})
            })
})



module.exports = router