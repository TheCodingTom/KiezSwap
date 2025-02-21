import express from "express"

const testRouter = express.Router() // a route is an entry point of API

testRouter.get("/test", (req, res) => {
    console.log("test route working".bgBlue);
  res.json("this is a test route")
})

export default testRouter