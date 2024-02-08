const fs = require('fs');

const STORE_FILE = 'store.json';
let storeData = {};

if (fs.existsSync(STORE_FILE)) {
    const data = fs.readFileSync(STORE_FILE);
    storeData = JSON.parse(data);
}


const getAllPosts = (req,res)=>{
    res.json(storeData.posts || []);
}

const getPost = (req,res)=>{
    const postId = parseInt(req.params.id);
    console.log(postId)
    const post = storeData.posts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
}

const addPost = (req, res) => {
    const { title, authorId, views, reviews } = req.body;

    
    const author = storeData.authors.find(author => author.id === authorId);
    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }

    const newPost = {
        id: storeData.posts.length,
        title,
        author: `${author.first_name} ${author.last_name}`,
        views,
        reviews
    };

    storeData.posts.push(newPost);
    fs.writeFileSync(STORE_FILE, JSON.stringify(storeData, null, 2));
    res.status(201).json(newPost);
}

const deletePost = (req,res)=>{
    const postId = parseInt(req.params.id);
    const index = storeData.posts.findIndex(post => post.id === postId);
    if (index === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    storeData.posts.splice(index, 1);
    fs.writeFileSync(STORE_FILE, JSON.stringify(storeData, null, 2));
    res.sendStatus(204);
}
module.exports = { getAllPosts,getPost,addPost,deletePost }