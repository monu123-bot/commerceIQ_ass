const express = require('express')
const bodyParser = require('body-parser')
const { getAllPosts,getPost,addPost,deletePost } = require('../controller/Posts')

const PostRouter = express.Router()

const jsonparser = bodyParser.json()
PostRouter.get("/",getAllPosts)
PostRouter.get("/:id",getPost)
PostRouter.post("/",addPost)
PostRouter.delete("/:id",deletePost)


module.exports = PostRouter