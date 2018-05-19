const express = require("express")

// initializes main express router
const apiRoutes = express.Router()

// import api sub-routes
const itemRoutes = require("./items/routes.js")

// tells main express router to use subroutes
apiRoutes.use("/data_findings", itemRoutes)

// exports api routes to the main server file
module.exports = apiRoutes