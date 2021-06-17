const projects = require("./projects-model");

function checkIfProjectIdExists() {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then((project) => {
                if (project) {
                    req.project = project
                    next()
                } else {
                    res.status(404).json({
                        message: "Project not found.",
                    })
                }
            })
            .catch((error) => {
                next(error)
            })
    }
}

function checkProjectData() {
    return (req, res, next) => {
        if (!req.body.name || !req.body.description) {
            res.status(400).json({
                message: "Missing project name or description.",
            })
        } else {
            next()
        }
    }
}

module.exports = {
    checkIfProjectIdExists,
    checkProjectData,
}