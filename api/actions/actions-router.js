// Write your "actions" router here!
const express = require("express");
const actions = require("./actions-model");
const { checkIfActionIdExists, checkActionData } = require("./actions-middleware");

const router = express.Router();

router.get("/api/actions", (req, res, next) => {
    actions.get()
        .then((actions) => {
            res.status(200).json(actions)    
        })
        .catch((error) => {
            next(error)
        })
})

router.get("/api/actions/:id", (req, res) => {
    actions.get(req.params.id)
        .then((action) => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "User not found.",
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


router.post("/api/actions", (req, res) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        return res.status(400).json({
            message: "Missing action.",
        })
    }
    actions.insert(req.body)
    .then((action) => {
        res.status(201).json(action)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error adding action.",
        })
    })
})


router.put("/api/actions/:id", checkActionData(), (req, res) => {
    actions.update(req.params.id, req.body)
    .then((action) => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({
                message: "The action could not be found.",
            })
        }
    })
    .catch((error) => {
        next(error)
    })
})

router.delete("/api/actions/:id", (req, res) => {
    actions.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The action has been deleted.",
                })
            } else {
                res.status(404).json({
                    message: "The action could not be found.",
                })
            }
        })
        .catch((error) => {
            next(error)
        })
})

module.exports = router