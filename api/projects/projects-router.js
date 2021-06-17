// Write your "projects" router here!
const express = require("express");
const projects = require("./projects-model");
const { checkProjectData, checkIfProjectIdExists } = require("./projects-middleware");

const router = express.Router();

router.get("/api/projects", (req, res, next) => {
    projects.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            next(error)
        })
})

router.get("/api/projects/:id", checkIfProjectIdExists(), (req, res) => {
    res.status(200).json(req.project)
})

router.post("/api/projects", (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
            message: "Missing project name or description.",
        })
    }
    projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error adding project.",
        })
    })
})

router.put("/api/projects/:id", checkProjectData(), checkIfProjectIdExists(), (req, res) => {
    projects.update(req.params.id, req.body)
        .then((project) => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message:"The project could not be found.",
                })
            }
        })
        .catch((error) =>  {
            next(error)
        })          
})

router.delete("/api/projects/:id", (req, res) => {
    projects.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The project has been deleted.",
                })
            } else {
                res.status(404).json({
                    message: "The project could not be found.",
                })
            }
        })
        .catch((error) => {
            next(error)
        })
})

router.get("/api/projects/:id/actions", (req, res) => {
    projects.getProjectActions(req.params.id)
        .then((action) => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "Action not found.",
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error",
            })
        })
})


module.exports = router