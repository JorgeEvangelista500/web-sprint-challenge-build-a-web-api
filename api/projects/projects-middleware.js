// add middlewares here related to projects
const Projects = require('./projects-model')

module.exports = {
    validateProjectId,
    validateProject
}

async function validateProjectId(req, res, next) {
    const id =req.params.id;
    const result = await Projects.get(id)
    if(result == null) {
        res.status(404).json({message: 'Project not found'})
    } else {
        req.project = result;
        next();
    }
}

function validateProject(req, res, next) {
    if(!req.body.name) {
        res.status(400).json({message:'missing required name field'})
    } else if(!req.body.description) {
        res.status(400).json({message:'missing required description field'})
    } else if(req.body.completed ==null) {
        res.status(400).json({message:'missing required completed field'})
    } else {
        next()
    }
}