// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')


const { validateProjectId, validateProject } = require('./projects-middleware')


const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message:'information could not be retrieved'})
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
    .catch(err =>{
        console.log(err)
        res.status(500).json({message:'information could not be retrieved'})
    })
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message:'information could not be posted'})
        })
})

router.put('/:id', validateProjectId, validateProject, (req, res) => {
        Projects.update(req.params.id, req.body)
        .then(newProject => {
            res.status(200).json(newProject)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message:'information could not be updated'})
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
        Projects.remove(req.params.id)
            .then(() => {
                res.status(200).json()
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json({message:'information could not be deleted'})
            })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message:'information could not be retrieved'})
        })
})



module.exports = router;