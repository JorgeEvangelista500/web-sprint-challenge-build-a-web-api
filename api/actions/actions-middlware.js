// add middlewares here related to actions
const Actions = require('./actions-model')

module.exports = {
    validateActionsId,
    validateActions
}

async function validateActionsId(req, res, next){
    const id = req.params.id;
    const result = await Actions.get(id)
    if(result == null){
        res.status(404).json({message:'Action not found'})
    } else {
        req.action= result;
        next()
    }
}

function validateActions(req, res, next) {
    if(!req.body.description) {
        res.status(400).json({message:'missing required description field'})
    } else if(!req.body.notes) {
        res.status(400).json({message:'missing required notes field'})
    } else if(req.body.completed == null) {
        res.status(400).json({message:'missing required completed field'})
    } else {
        next()
    }
}