const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PostRouter = require('./routes/Posts')
app.get('/',(req,res)=>{
    res.status(200).json({msg:"Home page"})
})
app.use("/posts",PostRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
