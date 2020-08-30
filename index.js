const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const PORT = process.env.PORT || 4001;
const app = express();
app.use(bodyParser.json());


const commentsByPostsId = {};


app.get('/posts/:id/comments', (req, res) => {

    const { id } = req.params;

    const response = commentsByPostsId[id] || [];


    res.status(200).send(response);


});



app.post('/posts/:id/comments', (req, res) => {

    const _id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const { id } = req.params;

    const comment = { _id, content }
    const comments = commentsByPostsId[id] || [];

    comments.push(comment);

    commentsByPostsId[id] = comments;

    res.status(201).send(comment);

})



app.listen(PORT, () => {

    console.log(`Listenig in port ${PORT}`);
})


