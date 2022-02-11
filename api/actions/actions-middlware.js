// add middlewares here related to actions
const Actions = require('./actions-model')

module.exports = {
    validateActions
}

async function validateActions(req, res, next){
    const id = req.params.id;
    const result = await Actions.get(id)
    if(result == null){
        res.status(404).json({message:'Action not found'})
    } else {
        req.action= result;
        next()
    }
}