const express = require("express"),
    createItemCont = require("./controller.js"),
    itemRoutes = express.Router()

// CRUD routes for the example feature
// these routes can pass data down that is in the http request query string
// the colon that precedes the variable name tells express that 
// the variable name should be passed down as a parameter and will
// contain the information that was included in the query string
// as you can see the route is defined and then the next argument
// is a method imported from the itemController.js file
// this method is what receives the data from the request
// and performs logic on it, then returns the result as json 
// or an error to where you made the http request from
itemRoutes.post("/findings", createItemCont.post)
itemRoutes.post("/findings/filter", createItemCont.get)
itemRoutes.get("/findings/:id", createItemCont.get)
itemRoutes.get("/findings", createItemCont.get)
itemRoutes.put("/findings/:id", createItemCont.update)
itemRoutes.delete("/findings/:id", createItemCont.delete)

// exports the express routes back to the router.js file, to be hooked up
// to the main server file
module.exports = itemRoutes
