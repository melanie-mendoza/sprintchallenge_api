const express = require('express');

// import router files
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

const server = express();

// Configure your server here
server.use(express.json()); //**Parses incoming request bodies which allows us to use req.body.name, etc. on POST and PUT requests. */
server.use(actionsRouter);
server.use(projectsRouter);


server.use((err, req, res, next) => {
	console.log(err)

  res.status(500).json({
		message: "Something went wrong."
  });
});


// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
