// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')
const { validateProjectId, validateProject } = require('./projects-middleware')
const res = require('express/lib/response')

const router = express.Router()

// router.get('/', (req, res) => {
//     Projects.get(req.)
//         .then(project => {
//             res.status(200).json(project)
//         })
// })

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
})

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(newProject => {
            res.status(200).json(newProject)
        })
})


module.exports = router;